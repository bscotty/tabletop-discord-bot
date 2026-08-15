import Fuse from "fuse.js";

export default class Searcher<T> {
    private fuse: Fuse<T>

    constructor(readonly searchableItems: T[], terms: string[]) {
        this.fuse = new Fuse<T>(this.searchableItems, this.getOptions(terms))
    }

    private getOptions(terms: string[]) {
        return {
            isCaseSensitive: false,
            findAllMatches: false,
            includeMatches: false,
            includeScore: false,
            useExtendedSearch: false,
            minMatchCharLength: 1,
            shouldSort: true,
            threshold: 0.6,
            ignoreLocation: true,
            keys: terms
        }
    }

    public search(term: string): T | undefined {
        const fuseResult = this.fuse.search(term)
        if (fuseResult.length > 0) {
            return fuseResult[0].item
        } else {
            return undefined
        }
    }
}