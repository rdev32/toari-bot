import { Events, Client, ActivityType } from 'discord.js'

export default {
  name: Events.ClientReady,
  once: true,
  controller(client: Client) {
    console.log(`Ready! Logged in as ${client.user.tag}`)
    client.user.setActivity({
      name: 'Escribe /ayuda para mas informacion.',
      type: ActivityType.Custom
    })
  }
}
