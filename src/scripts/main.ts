import {ConfigImpl} from "./config";
import {Icon} from "../commands/icon";
import {Godbound} from "../commands/godbound";
import {LancerCommands} from "../commands/lancerCommands";
import {Bot} from "./bot";
import {BotCommand} from "../commands/botCommand";

const config = new ConfigImpl()

const commands = async (): Promise<BotCommand[]> => {
    return [
        ...(new LancerCommands()).create(),
        new Godbound(),
        new Icon()
    ]
}

const bot = new Bot(config)
bot.login()
    .then(async () => {
        await bot.addCommands(await commands())
            .catch((it) => console.error(it))
    })
    .catch((it) => console.error(it))
