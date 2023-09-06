import {isClass, isGlossary, isJob, SearchableIconData} from "./searchable/searchable-icon-data";

export function formatIcon(data: SearchableIconData): string {
    if (isGlossary(data)) {
        return data.toFormattedString()
    } else if (isClass(data)) {
        return data.toFormattedString()
    } else if (isJob(data)) {
        return data.toFormattedString()
    } else {
        // smart-cast to SearchableAbility
        return data.toFormattedString()
    }
}