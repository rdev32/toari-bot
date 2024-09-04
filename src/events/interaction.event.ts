import { Events, CommandInteraction } from 'discord.js'

export default {
  name: Events.InteractionCreate,
  controller: async (interaction: CommandInteraction) => {
    try {
      if (!interaction.isChatInputCommand()) return

      const command = interaction.client.commands.get(interaction.commandName)

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        )
        return
      }

      await command.service(interaction)
    } catch (error: unknown) {
      const msg =
        error instanceof Error
          ? error.message
          : `Error imprevisto ejecutando el comando`

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: msg, ephemeral: true })
      }

      await interaction.reply({
        content: msg,
        ephemeral: true
      })
    }
  }
}
