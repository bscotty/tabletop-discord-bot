import Fuse from "fuse.js";
import {SearchableData} from "./searchable";
import FuseResult = Fuse.FuseResult;

export class Searcher {
    private options = {
        isCaseSensitive: false,
        findAllMatches: false,
        includeMatches: false,
        includeScore: false,
        useExtendedSearch: false,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.6,
        // location: 0,
        // distance: 100,
        ignoreLocation: true,
        keys: [
            "name",
            //"ranknames",
            "alt_names",
            "integrated.name",
            "active_name",
            "passive_name",
        ]
    };

    private fuse: Fuse<SearchableData>

    constructor(searchable: SearchableData[]) {
        this.fuse = new Fuse(searchable, this.options)
    }

    private fuseSearch(term: string): FuseResult<SearchableData>[] {
        return this.fuse.search(term)
    }

    search(term: string): SearchableData | undefined {
        const results = this.fuseSearch(term)
        if (results.length == 0)
            return undefined
        return results[0].item
    }
}