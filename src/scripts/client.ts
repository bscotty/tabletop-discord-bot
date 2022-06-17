import {Client} from "discordx";
import {Intents} from "discord.js";
import {decorateCommands} from "./command";

export async function initClient(token: string, guilds: string[]) {
    console.log(`initClient: ${token.length > 0 ? "non-empty token" : "empty token"} with guilds ${guilds.join()}`)

    decorateCommands()

    const client = new Client({
        botId: "test",
        partials: ["CHANNEL", "MESSAGE"],
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
        ],
        botGuilds: guilds
    })

    client.once("ready", async () => {
        console.log("I'm alive!")
        await client.initApplicationCommands()
        await client.initApplicationPermissions()

        client.applicationCommands.forEach((command) => {
            console.log(`found command: ${command.name}`)
        })
    })

    client.on("interactionCreate", async (interaction) => {
        client.executeInteraction(interaction)
    })

    await client.login(token)
}
