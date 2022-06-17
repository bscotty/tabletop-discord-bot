import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";
import {LancerData, lancerDataReader} from "../data/lancer/lancer-data-reader";
import {getCoreData} from "../data/lancer/core/a-data";
import {Searcher} from "../data/lancer/search/searcher";
import {Formatters} from "../data/lancer/format/formatters";
import {format} from "../data/lancer/format/format";
import {SearchableData} from "../data/lancer/search/searchable";
import {Lcp} from "../data/lancer/types/lcp";

@Discord()
export class Lancer {
    private _lcpData: Lcp[]
    private _parsedData: LancerData[]
    private _searcher: Searcher
    private _formatter: Formatters

    private lcpData(): Lcp[] {
        if (!this._lcpData)
            this._lcpData = [getCoreData()]
        return this._lcpData
    }

    private sanitizedData(): LancerData[] {
        if (!this._parsedData)
            this._parsedData = this.lcpData().map((it) => lancerDataReader(it))
        return this._parsedData
    }

    private searcher(): Searcher {
        if (!this._searcher)
            this._searcher = new Searcher(this.sanitizedData().map((it) => it.getAll()).flat())
        return this._searcher
    }

    private formatter(): Formatters {
        if (!this._formatter)
            this._formatter = new Formatters(this.sanitizedData())
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
        }

        const response = format(this.formatter(), result)
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
