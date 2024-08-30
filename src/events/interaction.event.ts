import { Events, CommandInteraction } from 'discord.js'

export default {
  name: Events.InteractionCreate,
  controller: async (interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return

		const command: Command = interaction.client.commands.get(interaction.commandName)

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`)
			return
		}

		try {
			await command.service(interaction)
		} catch (error: unknown) {
			console.error(error instanceof Error ? error : error)
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
			}
		}
  }
}