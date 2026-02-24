import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { Client, GatewayIntentBits, Collection, CommandInteraction, SlashCommandBuilder } from 'discord.js'

declare global {
  interface DiscordCommand {
    data: SlashCommandBuilder
    service: (interaction: CommandInteraction) => Promise<void>
  }

  interface DiscordEvent {
    name: string
    once?: boolean
    controller: (interaction: CommandInteraction) => Promise<void>
  }
}

declare module 'discord.js' {
  interface Client {
    commands?: Collection<string, DiscordCommand>
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
})

client.commands = new Collection()

async function loadCommands() {
  const commandsPath = join(__dirname, './commands')
  const commandFiles = readdirSync(commandsPath).filter((f) => f.endsWith('.js'))

  try {
    for (const file of commandFiles) {
      const filePath = join(commandsPath, file)
      const module = await import(filePath)
      const command = module.default as DiscordCommand

      if (!command) {
        throw new Error(`No se pudo cargar el comando en ${filePath}`)
      }

      if ('data' in command && 'service' in command) {
        client.commands.set(command.data.name, command)
      } else {
        console.log(`The command at ${file} is missing a required "data" or "service" property.`)
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message)
  }
}

async function loadEvents() {
  const eventsPath = join(__dirname, './events')
  const eventFiles = readdirSync(eventsPath).filter((f) => f.endsWith('.js'))

  try {
    for (const file of eventFiles) {
      const filePath = join(eventsPath, file)
      const module = await import(filePath)
      const event = module.default as DiscordEvent

      if (!event) {
        throw new Error(`No se pudo cargar el evento en ${filePath}`)
      }

      if (event.once) {
        client.once(event.name, (...args: [CommandInteraction]) => event.controller(...args))
      } else {
        client.on(event.name, (...args: [CommandInteraction]) => event.controller(...args))
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message)
  }
}

;(async () => {
  await loadCommands()
  await loadEvents()
})()

export default client
