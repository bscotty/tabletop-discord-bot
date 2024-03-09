import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export interface BotCommand {
    readonly name: string
    readonly builder: SlashCommandBuilder

    respondTo(interaction: ChatInputCommandInteraction): Promise<void>
}
