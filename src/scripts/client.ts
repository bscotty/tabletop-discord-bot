import {Client} from "discordx";
import {IntentsBitField, Partials} from "discord.js";
import {decorateCommands} from "./command";

export async function initClient(token: string, guilds: string[]) {
    console.log(`initClient: ${token.length > 0 ? "non-empty token" : "empty token"} with guilds ${guilds.join()}`)

    decorateCommands()

    const client = new Client({
        botId: "test",
        partials: [Partials.Channel, Partials.Message],
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
        ],
        botGuilds: guilds
    })

    client.once("ready", async () => {
        console.log("I'm alive!")
        await client.initApplicationCommands()

        client.applicationCommands.forEach((command) => {
            console.log(`found command: ${command.name}`)
        })
    })

    client.on("interactionCreate", async (interaction) => {
        interaction.guild.fetch().then((guild) => {
            if (guilds.includes(`${guild.id}`)) {
                client.executeInteraction(interaction)
            } else {
                console.warn(`Ignoring command from guild ${guild.id} - ${guild.name}`)
            }
        })
    })

    await client.login(token)
}
