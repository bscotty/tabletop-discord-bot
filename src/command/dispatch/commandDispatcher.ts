import {BaseInteraction} from "discord.js";
import SlashCommand from "../slashCommand";

export interface CommandDispatcher {
    dispatch(interaction: BaseInteraction): Promise<void>
}

export class CommandDispatcherImpl implements CommandDispatcher {
    constructor(
        private readonly commands: SlashCommand[]
    ) {
    }

    async dispatch(interaction: BaseInteraction) {
        if (interaction.isCommand()) {
            const command = this.commands.find((it) => it.name == interaction.commandName)
            if (command != undefined) {
                try {
                    await command.respond(interaction)
                } catch (e) {
                    console.error(`Error responding to interaction`, e)
                }
            } else {
                console.error(`Got unexpected command name ${interaction.commandName}`)
            }
        } else {
            console.error(`Got unexpected interaction ${interaction}`)
        }
    }
}
