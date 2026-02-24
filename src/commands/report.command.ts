import { db, reportsSchema } from '../db/schema'
import { CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Crea un ticket privado para conversar con los moderadores')
    .addStringOption((option) =>
      option.setName('reason').setDescription('Coloca la razon del reporte aqui').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  service: async (interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) {
      throw new Error('No es un comando de chat')
    }

    const reason = interaction.options.getString('reason')

    if (reason === null) {
      throw new Error('No puedes ingresar un comando sin razon de reporte')
    }

    await db
      .insert(reportsSchema)
      .values({
        userId: interaction.user.id,
        serverId: interaction.guildId,
        reason,
        createdAt: new Date().toISOString()
      })
      .run()

    await interaction.reply({
      content: 'Tu ticket ha sido creado, un moderador se pondra en contacto contigo lo mas pronto posible.',
      ephemeral: true
    })
  }
}
