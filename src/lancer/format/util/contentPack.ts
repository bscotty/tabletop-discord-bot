import {SearchableData} from "../../search/searchable";

export function formatContentPackTitle(data: SearchableData): string {
    if (data.content_pack == "LANCER Core")
        return ""
    else
        return ` (${data.content_pack})`
}

export function formatContentPack(data: SearchableData) {
    return formatContentPackString(data.content_pack)
}

export function formatContentPackString(contentPack: string): string {
    if (contentPack == "LANCER Core")
        return ""
    else
        return ` (From *${contentPack}*)`
}
