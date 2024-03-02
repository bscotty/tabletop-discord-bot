import Searcher from "../data/searcher";
import {ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";
import {safeReply} from "./util/safe-reply";
import {BotCommand} from "./botCommand";

const TERM_OPTION_NAME = "term"
const PUBLIC_OPTION_NAME = "public"

export abstract class SearchCommand<T> implements BotCommand {
    readonly name: string
    readonly builder: SlashCommandBuilder

    protected constructor(name: string, description: string) {
        this.name = name
        this.builder = new SlashCommandBuilder()
            .addStringOption((option) => option
                .setName(TERM_OPTION_NAME)
                .setDescription("What do I search for?")
                .setRequired(true)
            )
            .addBooleanOption((option) => option
                .setName(PUBLIC_OPTION_NAME)
                .setDescription("Should I display the term to everyone?")
                .setRequired(false)
            )
            .setName(name)
            .setDescription(description)
    }

    protected abstract searcher: Searcher<T>

    protected abstract format(item: T): string

    async respondTo(interaction: ChatInputCommandInteraction) {
        if (interaction.commandName == this.name) {
            try {
                const term = interaction.options.getString(TERM_OPTION_NAME)
                const publicResponse: boolean | null = interaction.options.getBoolean(PUBLIC_OPTION_NAME, false)
                await this.doCommand(interaction, term, publicResponse)
            } catch (e) {
                console.error(e)
            }
        } else {
            console.warn(`Got unknown command ${interaction.command.name}`)
        }
    }

    private async doCommand(interaction: CommandInteraction, term: string, publicResponse: boolean | null) {
        console.debug(`${this.name} - got term: ${term}`)
        const result = this.searcher.search(term)

        let replySecret: boolean
        if (publicResponse == null) {
            replySecret = false
        } else {
            replySecret = !publicResponse
        }

        if (result == undefined) {
            interaction.reply({
                content: `I can't find anything for the term "${term}", sorry!`,
                ephemeral: replySecret
            }).catch((it) => console.error(it))
        } else {
            safeReply(interaction, this.format(result), replySecret)
                .catch((it) => console.error(it))
        }
    }
}