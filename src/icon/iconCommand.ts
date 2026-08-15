import SlashCommand from "../command/slashCommand";
import {
    BaseInteraction,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder
} from "discord.js";
import {ReplyOptionsFactory} from "../reply/replyOptionsFactory";

const TERM_OPTION_NAME = "term"
const PUBLIC_OPTION_NAME = "public"
const COMMAND_NAME = "icon"
const COMMAND_DESCRIPTION = "Search for a term in ICON RPG (v1.5)"

export class IconCommand implements SlashCommand {
    constructor(
        private readonly replyOptionsFactory: ReplyOptionsFactory
    ) {
    }

    name: string = COMMAND_NAME

    builder(): SlashCommandOptionsOnlyBuilder {
        return new SlashCommandBuilder()
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
        } else {
            console.error(`Got unexpected interaction type ${interaction}`)
        }
    }

    private async respondToChatInput(interaction: ChatInputCommandInteraction) {
        const replyPublic: boolean = interaction.options.getBoolean(PUBLIC_OPTION_NAME, false) == true
        const term = interaction.options.getString(TERM_OPTION_NAME)
        await interaction.reply(this.replyOptionsFactory.create(term, replyPublic))
    }
}