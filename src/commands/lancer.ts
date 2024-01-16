import {Discord, Slash, SlashOption} from "discordx";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";
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
import {safeReply} from "./util/safe-reply";
import {getWinterScarLcp} from "../data/lancer/lcp/winter-scar";
import {getShadowOfTheWolfLcp} from "../data/lancer/lcp/shadow-of-the-wolf";

@Discord()
export class Lancer {
    private _lcpData: Lcp[]
    private _parsedData: LancerData[]
    private _searcher: Searcher<SearchableData>
    private _formatter: Formatters

    private lcpData(): Lcp[] {
        if (!this._lcpData)
            this._lcpData = [
                ...this.firstParty(),
                ...this.homebrew()
            ]
        return this._lcpData
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

    private sanitizedData(): LancerData[] {
        if (!this._parsedData)
            this._parsedData = this.lcpData().map((it) => lancerDataReader(it))
        return this._parsedData
    }

    private searcher(): Searcher<SearchableData> {
        if (!this._searcher) {
            const flattenedData = this.sanitizedData().map((it) => it.getAll()).flat()
            const terms = [
                "name",
                "alt_names",
                "active_name",
                "passive_name"
            ]
            this._searcher = new Searcher(flattenedData, terms)
        }
        return this._searcher
    }

    private formatter(): Formatters {
        if (!this._formatter)
            this._formatter = new Formatters(this.sanitizedData())
        return this._formatter
    }

    @Slash({name: "lancer", description: "Search for a Lancer search term"})
    public async command(
        @SlashOption({
            name: "term",
            description: "what to search for",
            required: true,
            type: ApplicationCommandOptionType.String
        }) term: string,
        interaction: CommandInteraction
    ) {
        const result: (SearchableData | undefined) = this.searcher().search(term)
        if (result == undefined) {
            return interaction.reply(`I can't find anything for the term "${term}", sorry!`)
        }

        const response = format(this.formatter(), result)
        await safeReply(interaction, response)
            .catch((it) => console.log(`error with message: ${it}`))
    }

    @Slash({name: "lancer-versions", description: "Print all currently used Lancer LCP versions"})
    public async lancerVersions(
        interaction: CommandInteraction
    ) {
        const firstPartyInfos = this.firstParty().map((lcp) => this.versionDump(lcp)).join(`\n`)
        const homebrewInfos = this.homebrew().map((lcp) => this.versionDump(lcp)).join(`\n`)

        const output = `__**First Party**__\n` + firstPartyInfos + `\n\n__**Homebrew**__\n` + homebrewInfos

        return interaction.reply(output)
            .catch((it) => console.error(`Error with Lancer LCP Version command ${it}`))
    }

    private versionDump(lcp: Lcp): string {
        return `${lcp.info.name} - ${lcp.info.version}`
    }
}
