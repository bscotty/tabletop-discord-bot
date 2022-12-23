import {Discord, Slash, SlashOption} from "discordx";
import Searcher from "../data/searcher";
import {IconSearchable} from "../data/icon/types/searchable";
import {iconCorePackage} from "../data/icon/data";
import {CommandInteraction} from "discord.js";
import {IconFormatter} from "../data/icon/formatter";
import {IconPackage} from "../data/icon/types/package";
import {TypedIconAbility} from "../data/icon/types/ability";
import {TypedIconClass} from "../data/icon/types/class";
import {TypedIconJob} from "../data/icon/types/job";

@Discord()
export class Icon {
    private _packages: IconPackage[]

    private packages(): IconPackage[] {
        if (this._packages == undefined) {
            this._packages = [iconCorePackage()]
        }
        return this._packages
    }

    private _searcher: Searcher<IconSearchable>

    private searcher(): Searcher<IconSearchable> {
        if (this._searcher == undefined) {
            const packages = this.packages()
            const items: IconSearchable[] = packages.flatMap((it) => {
                return [...it.jobs, ...it.classes, ...it.abilities, ...it.limitBreaks, ...it.glossary]
            })
            this._searcher = new Searcher(items, ["name"])
        }
        return this._searcher
    }

    private _formatter: IconFormatter

    private formatter(): IconFormatter {
        if (this._formatter == undefined) {
            const packages = this.packages()
            const abilities: TypedIconAbility[] = packages.flatMap((it) => {
                return [...it.abilities]
            })
            const classes: TypedIconClass[] = packages.flatMap((it) => {
                return [...it.classes]
            })
            const jobs: TypedIconJob[] = packages.flatMap((it) => {
                return [...it.jobs]
            })
            this._formatter = new IconFormatter(
                abilities,
                classes,
                jobs
            )
        }
        return this._formatter
    }

    @Slash("icon", {description: "Search for an Icon search term"})
    public command(
        @SlashOption("term", {description: "what to search for"})
            term: string,
        interaction: CommandInteraction
    ) {
        try {
            console.log(`ICON - received term: ${term}`)
            const result = this.searcher().search(term)
            if (result == undefined) {
                interaction.reply(`Sorry, I can't find anything for **${term}**`)
                    .catch((it) => console.error(it))
            } else {
                interaction.reply(this.formatter().formatIcon(result))
                    .catch((it) => console.error(it))
            }
        } catch (e) {
            console.error(e)
        }
    }
}