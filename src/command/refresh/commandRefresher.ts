import {REST, Routes} from "discord.js";
import SlashCommand from "../slashCommand";
import Config from "../../config/config";

export interface CommandRefresher {
    refresh(commands: SlashCommand[]): Promise<void>
}

export class CommandRefresherImpl implements CommandRefresher {
    constructor(
        private readonly config: Config,
        private readonly rest: REST
    ) {
    }

    async refresh(commands: SlashCommand[]) {
        for (const guild of this.config.guildIds) {
            const route = Routes.applicationGuildCommands(this.config.botApplicationId, guild)
            const body = {body: commands.map((it) => it.builder().toJSON())}
            await this.rest.put(route, body);
            const commandNames = commands.map((it) => it.name).join(", ");
            console.log(`put commands [${commandNames}] to guild ${guild}`);
        }
    }
}
