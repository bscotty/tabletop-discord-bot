import SlashCommand from "../../slashCommand";
import {
    BaseInteraction,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder
} from "discord.js";
import {Repository} from "../../../data/lancer/format/repository";
import {InfoManifest} from "../../../data/lancer/types/info";

const PUBLIC_OPTION_NAME = "public"
const COMMAND_NAME = "lancer-versions"
const COMMAND_DESCRIPTION = "Print all currently used Lancer LCP versions"

export class LancerVersionsCommand implements SlashCommand {
    constructor(
        private readonly repo: Repository
    ) {
    }

    name: string = COMMAND_NAME

    builder(): SlashCommandOptionsOnlyBuilder {
        return new SlashCommandBuilder()
            .addBooleanOption((option) => option
                .setName(PUBLIC_OPTION_NAME)
                .setDescription("Should I display the results to everyone?")
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
        const firstPartyInfos = this.repo.firstPartyInfo.map((lcpInfo) => this.versionDump(lcpInfo)).join(`\n`)
        const homebrewInfos = this.repo.homebrewInfo.map((lcpInfo) => this.versionDump(lcpInfo)).join(`\n`)
        const output = `__**First Party**__\n` + firstPartyInfos + `\n\n__**Homebrew**__\n` + homebrewInfos
        await interaction.reply({
            content: output,
            ephemeral: !replyPublic
        })
    }

    private versionDump(info: InfoManifest): string {
        return `${info.name} - ${info.version}`
    }
}