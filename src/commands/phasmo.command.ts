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
      throw new Error('No es un comando de chat!')
    }

    const code = interaction.options.getString('codigo')

    if (code === null) {
      throw new Error('Comando sin codigo de sala!')
    }

    if (code.length !== 6) {
      throw new Error('El codigo debe tener 6 digitos')
    }

    if (isNaN(parseInt(code))) {
      throw new Error('No haz ingresado un numero')
    }

    const embed = new EmbedBuilder()
      .setColor(0x86a6eb)
      .setTitle(
        `${interaction.user.displayName} te ha invitado a jugar Phasmofobia`
      )
      .setDescription(
        `Copia este codigo \`${code}\` para ingresar a la sala 😊`
      )
      .setThumbnail(
        'https://raw.githubusercontent.com/rdev32/toari-bot/refs/heads/main/assets/phasmo.webp'
      )
      .setTimestamp()
      .setFooter({ text: 'Creado por Toari Bot ❤️' })

    await interaction.reply({ embeds: [embed] })
  }
}
