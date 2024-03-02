import {Discord, Slash, SlashOption} from "discordx";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";
import Searcher from "../data/searcher";
import {getIcon1point5Data} from "../data/icon/json";
import {SearchableIconData} from "../data/icon/searchable/searchable-icon-data";
import {safeReply} from "./util/safe-reply";
import {formatIcon} from "../data/icon/formatter";

@Discord()
export class Icon {
    private _iconData: SearchableIconData[]
    private _searcher: Searcher<SearchableIconData>

    private iconData(): SearchableIconData[] {
        if (!this._iconData) {
            const searchableDataSets = [
                getIcon1point5Data()
            ]
            this._iconData = searchableDataSets.map((it) => {
                return [...it.jobs, ...it.classes, ...it.abilities, ...it.glossary, ...it.limitBreaks];
            }).flat()
        }
        return this._iconData
    }

    private searcher(): Searcher<SearchableIconData> {
        if (!this._searcher) {
            this._searcher = new Searcher(
                this.iconData(),
                ["name"]
            )
        }
        return this._searcher
    }

    @Slash({name: "icon", description: "Search for an Icon search term"})
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
            console.log(`ICON -- Received term ${term}`)
            let replySecret: boolean
            if (publicResponse == undefined) {
                replySecret = false
            } else {
                replySecret = !publicResponse
            }

            const searchResult: SearchableIconData = this.searcher().search(term)
            if (searchResult == undefined) {
                interaction.reply({
                    content: `I can't find anything for the term "${term}", sorry!`,
                    ephemeral: replySecret
                }).catch((it) => console.error(it))
            } else {
                safeReply(interaction, formatIcon(searchResult), replySecret)
                    .catch((it) => console.error(it))
            }
        } catch (e) {
            console.error(e)
        }
    }
}