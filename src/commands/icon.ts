import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";
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

    @Slash("icon", {description: "Search for an Icon search term"})
    public command(
        @SlashOption("term", {description: "what to search for"})
            term: string,
        interaction: CommandInteraction
    ) {
        try {
            console.log(`ICON -- Received term ${term}`)

            const searchResult: SearchableIconData = this.searcher().search(term)
            if (searchResult == undefined) {
                interaction.reply(`I can't find anything for the term "${term}", sorry!`)
                    .catch((it) => console.error(it))
            } else {
                safeReply(interaction, formatIcon(searchResult))
                    .catch((it) => console.error(it))
            }
        } catch (e) {
            console.error(e)
        }
    }
}