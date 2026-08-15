import {Client, GatewayIntentBits, REST} from "discord.js";
import {CommandDispatcher, CommandDispatcherImpl} from "./command/dispatch/commandDispatcher";
import {CommandRefresher, CommandRefresherImpl} from "./command/refresh/commandRefresher";
import SlashCommand from "./command/slashCommand";
import lancerCommandCreator from "./lancer";
import lancerVersionsCommandCreator from "./lancer-versions";
import iconCommandCreator from "./icon";
import godboundCommandCreator from "./godbound";
import getConfig from "./config";
import Config from "./config/config";

const config: Config = getConfig()
const rest = new REST({version: "10"}).setToken(config.botToken)
const options = {intents: [GatewayIntentBits.Guilds,]}
const client = new Client(options)

const commands: SlashCommand[] = [
    lancerCommandCreator(),
    lancerVersionsCommandCreator(),
    iconCommandCreator(),
    godboundCommandCreator()
]
const commandDispatcher: CommandDispatcher = new CommandDispatcherImpl(commands)
const commandRefresher: CommandRefresher = new CommandRefresherImpl(config, rest)

client.once("ready", () => {
    console.debug("ready")
}).login(config.botToken)
    .then(() => {
        client.on("interactionCreate", async (interaction) => {
            await commandDispatcher.dispatch(interaction)
        })
    })
    .then(() => commandRefresher.refresh(commands))
