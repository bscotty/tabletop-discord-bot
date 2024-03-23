import Searcher from "../data/searcher";
import {getDictionary} from "../data/godbound/words/true-index";
import {formatGodbound} from "../data/godbound/formatter";
import {DivineItem} from "../data/godbound/divine-item";
import {SearchCommand} from "./searchCommand";

export class Godbound extends SearchCommand<DivineItem> {
    override readonly searcher: Searcher<DivineItem>

    constructor() {
        super("godbound", "Search for a term in Godbound RPG");
        try {
            const dictionary = getDictionary()
            const items = [...dictionary.words, ...dictionary.gifts, ...dictionary.invocations]
            this.searcher = new Searcher(items, ["name"])
        } catch (e) {
            console.error(`Something went wrong`, e)
            this.searcher = new Searcher([], ["name"])
        }

    }

    override format(item: DivineItem): string {
        return formatGodbound(item);
    }
}
