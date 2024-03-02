import {
    ChatInputCommandInteraction,
    CommandInteraction,
    InteractionReplyOptions,
    SlashCommandBuilder
} from "discord.js";
import Searcher from "../data/searcher";
import {Formatters} from "../data/lancer/format/formatters";
import {format} from "../data/lancer/format/format";
import {SearchableData} from "../data/lancer/search/searchable";
import {SearchCommand} from "./searchCommand";
import {InfoManifest} from "../data/lancer/types/info";
import {BotCommand} from "./botCommand";
import {isSearchableFrame, isSearchableWeapon} from "../data/lancer/format/typechecks";
import {getRepository, Repository} from "../data/lancer/format/repository";
import {RichFrameFormatter} from "../data/lancer/format/rich-frame-formatter";
import {RichWeaponFormatter} from "../data/lancer/format/rich-weapon-formatter";
import {DisplayResponse} from "../data/lancer/format/display-response";

export class LancerCommands {

    create(): BotCommand[] {
        const repository = getRepository()

        return [
            new LancerSearch(repository),
            new LancerVersions(repository)
        ]
    }
}

class LancerSearch extends SearchCommand<SearchableData> {
    override readonly searcher: Searcher<SearchableData>
    private readonly formatter: Formatters
    private readonly frameFormatter: RichFrameFormatter
    private readonly weaponFormatter: RichWeaponFormatter

    constructor(repository: Repository) {
        super("lancer", "Search for a term in Lancer RPG");

        this.formatter = new Formatters(repository)
        this.frameFormatter = new RichFrameFormatter(repository, this.formatter)
        this.weaponFormatter = new RichWeaponFormatter(repository, this.formatter)
        this.searcher = new Searcher(
            repository.data.map((it) => it.getAll()).flat(),
            [
                "name",
                "alt_names",
                "active_name",
                "passive_name"
            ]
        )
    }

    override format(item: SearchableData): string {
        return format(this.formatter, item)
    }

    override shouldRichlyFormat(item: SearchableData): boolean {
        return isSearchableFrame(item) || isSearchableWeapon(item)
    }

    override richFormat(item: SearchableData): DisplayResponse {
        if (isSearchableFrame(item)) {
            return this.frameFormatter.richFormat(item)
        } else if (isSearchableWeapon(item)) {
            return this.weaponFormatter.richFormat(item)
        } else {
            return super.richFormat(item)
        }
    }

}

class LancerVersions implements BotCommand {
    readonly name: string = "lancer-versions"
    readonly builder: SlashCommandBuilder
    readonly repo: Repository

    constructor(repository: Repository) {
        this.repo = repository
        this.builder = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription("Print all currently used Lancer LCP versions")
    }

    async respondTo(interaction: ChatInputCommandInteraction): Promise<void> {
        if (interaction.commandName == this.name) {
            try {
                await this.lancerVersions(interaction)
            } catch (e) {
                console.error(e)
            }
        } else {
            console.warn(`Got unknown command ${interaction.command.name}`)
        }
    }


    async lancerVersions(interaction: CommandInteraction) {
        console.debug(`lancer-versions`)
        const firstPartyInfos = this.repo.firstPartyInfo.map((lcpInfo) => this.versionDump(lcpInfo)).join(`\n`)
        const homebrewInfos = this.repo.homebrewInfo.map((lcpInfo) => this.versionDump(lcpInfo)).join(`\n`)

        const output = `__**First Party**__\n` + firstPartyInfos + `\n\n__**Homebrew**__\n` + homebrewInfos

        await interaction.reply(output)
            .catch((it) => console.error(`Error with Lancer LCP Version command ${it}`))
    }

    private versionDump(info: InfoManifest): string {
        return `${info.name} - ${info.version}`
    }
}
