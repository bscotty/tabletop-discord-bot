import {BaseInteraction, SlashCommandOptionsOnlyBuilder} from "discord.js";

export default interface SlashCommand {
    name: string

    builder(): SlashCommandOptionsOnlyBuilder

    respond(interaction: BaseInteraction): Promise<void>
}
