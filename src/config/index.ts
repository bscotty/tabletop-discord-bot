import config from "../../config.json"
import Config from "./config"

export default function getConfig(): Config {
    return new ConfigImpl()
}

class ConfigImpl implements Config {
    readonly botApplicationId: string = config.client_id;
    readonly botToken: string = config.bot_token;
    readonly guildIds: string[] = config.guilds;
}
