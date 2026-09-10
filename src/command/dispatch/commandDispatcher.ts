import {BaseInteraction} from "discord.js";
import SlashCommand from "../slashCommand";
import {LancerButton} from "../../lancer/lancerButton";

export interface CommandDispatcher {
    dispatch(interaction: BaseInteraction): Promise<void>
}

export class CommandDispatcherImpl implements CommandDispatcher {
    constructor(
        private readonly commands: SlashCommand[],
        private readonly lancerButton: LancerButton
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
        } else if (interaction.isButton()) {
            await this.lancerButton.respond(interaction)
        } else {
            console.error(`Got unexpected interaction ${interaction}`)
        }
    }
}
