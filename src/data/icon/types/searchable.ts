import {TypedIconAbility} from "./ability";
import {TypedIconJob} from "./job";
import {TypedIconClass} from "./class";
import {TypedIconLimitBreak} from "./limit_break";

export type IconSearchable = TypedIconAbility | TypedIconClass | TypedIconJob | TypedIconLimitBreak

export function isAbility(searchable: IconSearchable): searchable is TypedIconAbility {
    return searchable.type == "icon_ability"
}

export function isClass(searchable: IconSearchable): searchable is TypedIconClass {
    return searchable.type == "icon_class"
}

export function isJob(searchable: IconSearchable): searchable is TypedIconJob {
    return searchable.type == "icon_job"
}

export function isLimitBreak(searchable: IconSearchable): searchable is TypedIconLimitBreak {
    return searchable.type == "icon_limit_break"
}