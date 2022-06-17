import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";
import {lancerDataReader, SearchableData} from "../data/lancer/lancer-data-reader";
import {getCoreData} from "../data/lancer/core/a-data";
import {Searcher} from "../data/lancer/searcher";
import {Formatters} from "../data/lancer/format/formatters";
import {format} from "../data/lancer/format/format";

@Discord()
export class Lancer {
    // compile all lancer lcps
    coreData = [getCoreData()]
    // parse the fields that we would match to the term
    parsedData = this.coreData.map((it) => lancerDataReader(it))
    // have fuse.js search the fields for a match
    searcher = new Searcher(this.parsedData)
    formatter = new Formatters(this.parsedData)

    @Slash("lancer", {description: "Search for a Lancer search term"})
    public async command(
        @SlashOption("term", {description: "what to search for"}) term: string,
        interaction: CommandInteraction
    ) {
        const result: SearchableData | undefined = this.searcher.search(term)
        if (result == undefined) {
            return interaction.reply(`I can't find anything for the term "${term}", sorry!`)
        }
        // format the returned field for display
        const response = format(this.formatter, result)
        // respond to interaction with formatted field
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
