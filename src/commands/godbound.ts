import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";
import {Searcher} from "../data/godbound/searcher";
import {getDictionary} from "../data/godbound/words";
import {formatGodbound} from "../data/godbound/formatter";

@Discord()
export class Godbound {
    private _searcher: Searcher

    private searcher(): Searcher {
        if (this._searcher == undefined) {
            this._searcher = new Searcher(getDictionary())
        }
        return this._searcher
    }

    @Slash("godbound", {description: "Search for a Godbound search term"})
    public command(
        @SlashOption("term", {description: "what to search for"})
            term: string,
        interaction: CommandInteraction
    ) {
        try {
            console.log(`GODBOUND - received term: ${term}`)
            const result = this.searcher().search(term)
            if (result == undefined) {
                interaction.reply(`Sorry, I can't find anything for **${term}**`)
                    .catch((it) => console.error(it))
            } else {
                interaction.reply(formatGodbound(result))
                    .catch((it) => console.error(it))
            }
        } catch (e) {
            console.error(e)
        }
    }
}
