import {
    AutocompleteInteraction,
    BaseInteraction,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder
} from "discord.js";
import SlashCommand from "../command/slashCommand";
import {ReplyOptionsFactory} from "../reply/replyOptionsFactory";
import Searcher from "../searcher/searcher";
import {SearchableData} from "./search/searchable";

const TERM_OPTION_NAME = "term"
const PUBLIC_OPTION_NAME = "public"
const COMMAND_NAME = "lancer"
const COMMAND_DESCRIPTION = "Search for a term in Lancer RPG"

export class LancerCommand implements SlashCommand {
    constructor(
        private readonly replyOptionsFactory: ReplyOptionsFactory,
        private readonly searcher: Searcher<SearchableData>
    ) {
    }

    name: string = COMMAND_NAME

    builder(): SlashCommandOptionsOnlyBuilder {
        return new SlashCommandBuilder()
            .addStringOption((option) => option
                .setName(TERM_OPTION_NAME)
                .setDescription("What do I search for?")
                .setRequired(true)
                .setAutocomplete(true)
            )
            .addBooleanOption((option) => option
                .setName(PUBLIC_OPTION_NAME)
                .setDescription("Should I display the term to everyone?")
                .setRequired(false)
            )
            .setName(COMMAND_NAME)
            .setDescription(COMMAND_DESCRIPTION)
    }

    async respond(interaction: BaseInteraction) {
        if (interaction.isChatInputCommand()) {
            if (interaction.commandName == COMMAND_NAME) {
                return this.respondToChatInput(interaction)
                    .catch((e) => console.error(`${this.name} error`, e))
            } else {
                console.error(`${this.name} got unknown command ${interaction.command.name}`)
            }
        } else if (interaction.isAutocomplete()) {
            if (interaction.commandName == COMMAND_NAME) {
                return this.handleAutocomplete(interaction)
                    .catch((e) => console.error(`${this.name} error`, e))
            } else {
                console.error(`${this.name} got unknown command ${interaction.command.name}`)
            }
        } else {
            console.error(`Got unexpected interaction type ${interaction}`)
        }
    }

    private async respondToChatInput(interaction: ChatInputCommandInteraction) {
        const replyPublic: boolean = interaction.options.getBoolean(PUBLIC_OPTION_NAME, false) == true
        const term = interaction.options.getString(TERM_OPTION_NAME)
        const options = await this.replyOptionsFactory.create(term, replyPublic)
        console.debug(`replying to ${term}`)
        await interaction.reply(options)
    }

    private async handleAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
        const focusedValue = interaction.options.getFocused().toLowerCase()
        const options = this.populateAutocompleteOptions(focusedValue)
        await interaction.respond(options.map((it) => ({name: `${it.name} (${it.data_type}) - ${it.content_pack}`, value: it.name})))
    }

    private populateAutocompleteOptions(term: string) {
        const data = this.searcher.search(term)
        if (data.length === 0) {
            console.error(`No matches found for ${term}`)
            return []
        } else { return data }
    }
}