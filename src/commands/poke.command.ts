import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('poke')
    .setDescription('Envia un toque a alguien aleatorio'),
  service: async (interaction: CommandInteraction) => {
    const members = await interaction.guild.members.fetch()
    const users: Array<string> = []
    members.forEach((member) => users.push(member.displayName))
    const randomIndex = Math.floor(Math.random() * users.length)
    const target = users[randomIndex]
    await interaction.reply({
      content: `Enviaste un toque a ${target}`,
      ephemeral: true
    })
  }
}
