import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";
import LancerData from "../data/lancer/types/lancer-data";
import lancerDataReader from "../data/lancer/lancer-data-reader";
import Searcher from "../data/searcher";
import LancerFormatter from "../data/lancer/format/lancerFormatter";
import {SearchableData} from "../data/lancer/types/searchable";
import Lcp from "../data/lancer/types/lcp";
import getCoreLcp from "../data/lancer/lcp/core";
import getKtbLcp from "../data/lancer/lcp/ktb";
import getLongRimLcp from "../data/lancer/lcp/long-rim";
import getWallflowerLcp from "../data/lancer/lcp/wallflower";
import getSolsticeRainData from "../data/lancer/lcp/solstice-rain";
import getIronleafFoundryLcp from "../data/lancer/lcp/homebrew/ironleaf-foundry";
import getLiminalSpaceLcp from "../data/lancer/lcp/homebrew/liminal-space";
import getMfecaneLcp from "../data/lancer/lcp/homebrew/mfecane";
import getSciroccoLcp from "../data/lancer/lcp/homebrew/scirocco";
import getSuldanLcp from "../data/lancer/lcp/homebrew/suldan";
import getStolenCrownLcp from "../data/lancer/lcp/homebrew/stolen-crown";
import getGilgameshLcp from "../data/lancer/lcp/homebrew/gilgamesh";

@Discord()
export class Lancer {
    private _lcpData: Lcp[]
    private _parsedData: LancerData[]
    private _searcher: Searcher<SearchableData>
    private _formatter: LancerFormatter

    private lcpData(): Lcp[] {
        if (!this._lcpData)
            this._lcpData = [
                getCoreLcp(),
                getKtbLcp(),
                getLongRimLcp(),
                getWallflowerLcp(),
                getSolsticeRainData(),
                ...this.homebrew()
            ]
        return this._lcpData
    }

    private homebrew(): Lcp[] {
        return [
            getGilgameshLcp(),
            getIronleafFoundryLcp(),
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

    private formatter(): LancerFormatter {
        if (!this._formatter)
            this._formatter = new LancerFormatter(this.sanitizedData())
        return this._formatter
    }

    @Slash("lancer", {description: "Search for a Lancer search term"})
    public async command(
        @SlashOption("term", {description: "what to search for"}) term: string,
        interaction: CommandInteraction
    ) {
        const result: (SearchableData | undefined) = this.searcher().search(term)
        if (result == undefined) {
            return interaction.reply(`I can't find anything for the term "${term}", sorry!`)
                .catch((it) => console.error(it))
        }

        const response = this.formatter().format(result)
        if (response.length > 2000) {
            this.split(interaction, response)
                .catch((it) => console.log(`error with split message: ${it}`))
        } else {
            interaction.reply(response)
                .catch((it) => console.log(`error with message: ${it}`))
        }
    }

    private async split(interaction: CommandInteraction, response: string) {
        const responses: string[] = response.split("\n")
        const splitResponse: string[] = [""]

        responses.forEach(response => {
            const index = splitResponse.findIndex((entry) => (entry.length + response.length) < 2000)
            if (index < 0) {
                splitResponse.push(response)
            } else {
                splitResponse[index] = splitResponse[index] + "\n" + response
            }
        })

        await interaction.reply({content: splitResponse[0]})
            .catch((it) => console.log(`there was a problem with the first split: ${it}`))
            .then(() => {
                splitResponse.forEach(async (split, index) => {
                    if (index > 0)
                        await interaction.channel.send(split)
                            .catch((it) => console.log(`there was a problem with split ${index}: ${it}`))
                })
            })
    }
}
