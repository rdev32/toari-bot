import { EmbedBuilder } from '@discordjs/builders'
import {
  CommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits
} from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('phasmo')
    .setDescription('Crea una invitacion para una partida de Phasmofobia')
    .addStringOption((option) =>
      option
        .setName('codigo')
        .setDescription('Coloca el codigo de la sala aqui')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
  service: async (interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) {
      throw new Error('Not a chat input command!')
    }

    const code = interaction.options.getString('codigo')

    if (code === null) {
      throw new Error('No contents provided')
    }

    if (code.length > 6) {
      await interaction.reply({
        ephemeral: true,
        content: 'El codigo que haz proporcionado debe ser de 6 caracteres, vuelve a intentarlo.'
      })
      throw new Error('Invalid code length')
    }

    const embed = new EmbedBuilder()
      .setColor(0x86a6eb)
      .setTitle(`${interaction.user.displayName} te ha invitado a una partida`)
      .setDescription(
        `Copia este codigo \`${code}\` para ingresar a la sala 😊`
      )
      .setThumbnail(
        'https://cdn.discordapp.com/icons/435431947963990026/a_1a1155ca31aaab1ea861104bd16bc250.webp?size=160'
      )
      .setTimestamp()
      .setFooter({ text: 'Creado por Toari Bot ❤️' })

    setTimeout(async () => {
      embed.setColor(0xd2d5d9)
      embed.setTitle(
        `La partida de ${interaction.user.displayName} ha finalizado`
      )
      embed.setDescription('')
      await interaction.editReply({ embeds: [embed] })
    }, 7200000)

    await interaction.reply({ embeds: [embed] })
  }
}
