import {Discord, Slash, SlashOption} from "discordx";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";
import Searcher from "../data/searcher";
import {getDictionary} from "../data/godbound/words";
import {formatGodbound} from "../data/godbound/formatter";
import {DivineItem} from "../data/godbound/divine-item";

@Discord()
export class Godbound {
    private _searcher: Searcher<DivineItem>

    private searcher(): Searcher<DivineItem> {
        if (this._searcher == undefined) {
            const dictionary = getDictionary()
            const items = [...dictionary.words, ...dictionary.gifts, ...dictionary.invocations]
            this._searcher = new Searcher(items, ["name"])
        }
        return this._searcher
    }

    @Slash({name: "godbound", description: "Search for a Godbound search term"})
    public command(
        @SlashOption({
            name: "term",
            description: "what to search for",
            required: true,
            type: ApplicationCommandOptionType.String
        }) term: string,
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
