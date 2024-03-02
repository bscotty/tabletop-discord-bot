import {ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";
import {LancerData, lancerDataReader} from "../data/lancer/lancer-data-reader";
import {getCoreLcp} from "../data/lancer/lcp/core";
import Searcher from "../data/searcher";
import {Formatters} from "../data/lancer/format/formatters";
import {format} from "../data/lancer/format/format";
import {SearchableData} from "../data/lancer/search/searchable";
import {Lcp} from "../data/lancer/types/lcp";
import {getKtbLcp} from "../data/lancer/lcp/ktb";
import {getLongRimLcp} from "../data/lancer/lcp/long-rim";
import {getWallflowerLcp} from "../data/lancer/lcp/wallflower";
import {getSolsticeRainData} from "../data/lancer/lcp/solstice-rain";
import {getIronleafFoundryLcp} from "../data/lancer/lcp/homebrew/ironleaf-foundry";
import {getLiminalSpaceLcp} from "../data/lancer/lcp/homebrew/liminal-space";
import {getMfecaneLcp} from "../data/lancer/lcp/homebrew/mfecane";
import {getSciroccoLcp} from "../data/lancer/lcp/homebrew/scirocco";
import {getSuldanLcp} from "../data/lancer/lcp/homebrew/suldan";
import {getStolenCrownLcp} from "../data/lancer/lcp/homebrew/stolen-crown";
import {getDustgraveLcp} from "../data/lancer/lcp/dustgrave";
import {getSsmrLcp} from "../data/lancer/lcp/ssmr";
import {getEHandSLCP} from "../data/lancer/lcp/homebrew/event horizon & suns";
import {getKrfwCatalogLcp} from "../data/lancer/lcp/homebrew/krfw catalog";
import {getLegionnaireLcp} from "../data/lancer/lcp/homebrew/legionnaire";
import {getCrisisCoreLcp} from "../data/lancer/lcp/homebrew/crisis core";
import {getIridiaLcp} from "../data/lancer/lcp/homebrew/iridia";
import {getWinterScarLcp} from "../data/lancer/lcp/winter-scar";
import {getShadowOfTheWolfLcp} from "../data/lancer/lcp/shadow-of-the-wolf";
import {SearchCommand} from "./searchCommand";
import {InfoManifest} from "../data/lancer/types/info";
import {BotCommand} from "./botCommand";

export class LancerCommands {

    create(): BotCommand[] {
        const firstParty = this.firstParty()
        const homebrew = this.homebrew()
        const lcpData = [...firstParty, ...homebrew]
        const parsedData = lcpData.map((it) => lancerDataReader(it))

        const firstPartyInfos = firstParty.map((it) => it.info)
        const homebrewInfos = homebrew.map((it) => it.info)

        return [
            new LancerSearch(parsedData),
            new LancerVersions(firstPartyInfos, homebrewInfos)
        ]
    }

    private firstParty(): Lcp[] {
        return [
            getCoreLcp(),
            getKtbLcp(),
            getLongRimLcp(),
            getWallflowerLcp(),
            getSolsticeRainData(),
            getSsmrLcp(),
            getDustgraveLcp(),
            getWinterScarLcp(),
            getShadowOfTheWolfLcp()
        ]
    }

    private homebrew(): Lcp[] {
        return [
            getCrisisCoreLcp(),
            getEHandSLCP(),
            getIridiaLcp(),
            getIronleafFoundryLcp(),
            getKrfwCatalogLcp(),
            getLegionnaireLcp(),
            getLiminalSpaceLcp(),
            getMfecaneLcp(),
            getSciroccoLcp(),
            getStolenCrownLcp(),
            getSuldanLcp()
        ]
    }
}

class LancerSearch extends SearchCommand<SearchableData> {
    override readonly searcher: Searcher<SearchableData>
    private readonly formatter: Formatters

    constructor(parsedData: LancerData[]) {
        super("lancer", "Search for a term in Lancer RPG");

        this.formatter = new Formatters(parsedData)
        this.searcher = new Searcher(
            parsedData.map((it) => it.getAll()).flat(),
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

}

class LancerVersions implements BotCommand {
    readonly name: string = "lancer-versions"
    readonly builder: SlashCommandBuilder
    readonly firstPartyInfos: InfoManifest[]
    readonly homebrewInfos: InfoManifest[]

    constructor(firstPartyInfos: InfoManifest[], homebrewInfos: InfoManifest[]) {
        this.firstPartyInfos = firstPartyInfos
        this.homebrewInfos = homebrewInfos
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
        const firstPartyInfos = this.firstPartyInfos.map((lcpInfo) => this.versionDump(lcpInfo)).join(`\n`)
        const homebrewInfos = this.homebrewInfos.map((lcpInfo) => this.versionDump(lcpInfo)).join(`\n`)

        const output = `__**First Party**__\n` + firstPartyInfos + `\n\n__**Homebrew**__\n` + homebrewInfos

        await interaction.reply(output)
            .catch((it) => console.error(`Error with Lancer LCP Version command ${it}`))
    }

    private versionDump(info: InfoManifest): string {
        return `${info.name} - ${info.version}`
    }
}
