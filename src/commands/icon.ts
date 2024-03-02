import Searcher from "../data/searcher";
import {getIcon1point5Data} from "../data/icon/json";
import {SearchableIconData} from "../data/icon/searchable/searchable-icon-data";
import {formatIcon} from "../data/icon/formatter";
import {SearchCommand} from "./searchCommand";

export class Icon extends SearchCommand<SearchableIconData> {
    override readonly searcher: Searcher<SearchableIconData>

    constructor() {
        super("icon", "Search for a term in ICON RPG (v1.5)");

        const searchableDataSets = [
            getIcon1point5Data()
        ]
        const iconData = searchableDataSets.map((it) => {
            return [...it.jobs, ...it.classes, ...it.abilities, ...it.glossary, ...it.limitBreaks];
        }).flat()
        this.searcher = new Searcher(iconData, ["name"])
    }

    format(item: SearchableIconData): string {
        return formatIcon(item)
    }
}
