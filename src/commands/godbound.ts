import {Discord, Slash, SlashOption} from "discordx";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";
import Searcher from "../data/searcher";
import {getDictionary} from "../data/godbound/words";
import {formatGodbound} from "../data/godbound/formatter";
import {DivineItem} from "../data/godbound/divine-item";
import {safeReply} from "./util/safe-reply";

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
        @SlashOption({
            name: "public",
            description: "should this response be public?",
            required: false,
            type: ApplicationCommandOptionType.Boolean
        }) publicResponse: boolean | undefined,
        interaction: CommandInteraction
    ) {
        try {
            console.log(`GODBOUND - received term: ${term}`)
            const result = this.searcher().search(term)
            let replySecret: boolean
            if (publicResponse == undefined) {
                replySecret = false
            } else {
                replySecret = !publicResponse
            }
            if (result == undefined) {
                interaction.reply({
                    content: `I can't find anything for the term "${term}", sorry!`,
                    ephemeral: replySecret
                }).catch((it) => console.error(it))
            } else {
                safeReply(interaction, formatGodbound(result), replySecret)
                    .catch((it) => console.error(it))
            }
        } catch (e) {
            console.error(e)
        }
    }
}
