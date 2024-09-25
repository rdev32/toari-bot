import { EmbedBuilder } from '@discordjs/builders'
import {
  CommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits
} from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('ayuda')
    .setDescription('Te mostrare todo lo que puedo hacer')
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  service: async (interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Comandos Disponibles`)
      .setDescription(`Esta es la lista de comandos que puedo realizar`)
      .addFields(
        { name: '`/phasmo`', value: 'Crea un cuadro para mostrar una partida de Phasmofobia' },
        { name: '`/poke`', value: 'Le mandas un toque a alguien' },
        { name: '`/user`', value: 'Muestra informacion de un usuario' },
        { name: '`/server`', value: 'Muestra informacion del servidor' }
      )
      .setFooter({ text: 'Ayuda de Toari Bot ❤️' })
    await interaction.reply({ embeds: [embed] })
  }
}
