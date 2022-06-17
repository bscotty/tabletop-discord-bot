import config from "../../config.json";

export class Config {
    public botToken(): string {
        return config.bot_token
    }

    public guilds(): string[] {
        return config.guilds
    }
}
