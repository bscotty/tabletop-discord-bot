import {SearchableGlossary} from "./searchable-glossary";
import {SearchableClass} from "./searchable-class";
import {SearchableJob} from "./searchable-job";
import {SearchableAbility} from "./searchable-ability";

export type SearchableIconData =
    SearchableGlossary |
    SearchableClass |
    SearchableJob |
    SearchableAbility

export function isGlossary(data: SearchableIconData): data is SearchableGlossary {
    return data.data_type === "glossary"
}

export function isClass(data: SearchableIconData): data is SearchableClass {
    return data.data_type === "class"
}

export function isJob(data: SearchableIconData): data is SearchableJob {
    return data.data_type === "job"
}

export function isAbility(data: SearchableIconData): data is SearchableAbility {
    return data.data_type === "ability"
}