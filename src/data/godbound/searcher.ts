import {DivineDictionary, DivineItem} from "./divine-dictionary";
import Fuse from "fuse.js";

export class Searcher {
    private fuse: Fuse<DivineItem>
    private options = {
        isCaseSensitive: false,
        findAllMatches: false,
        includeMatches: false,
        includeScore: false,
        useExtendedSearch: false,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.6,
        ignoreLocation: true,
        keys: [
            "name"
        ]
    };

    constructor(readonly dictionary: DivineDictionary) {
        const list = [...dictionary.connectedWords, ...dictionary.gifts, ...dictionary.invocations]
        this.fuse = new Fuse(list, this.options)
    }

    public search(term: string): DivineItem | undefined {
        const fuseResult = this.fuse.search(term)
        if (fuseResult.length > 0) {
            return fuseResult[0].item
        } else {
            return undefined
        }
    }
}