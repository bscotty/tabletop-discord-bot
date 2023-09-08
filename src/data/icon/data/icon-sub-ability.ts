import {formatInterrupt, IconInterrupt} from "./icon-interrupt";
import {formatSummon, IconSummon} from "./icon-summon";
import {formatObject, IconObject} from "./icon-object";

export type IconSubAbility = {
    name: string
    type: string
    effects: IconSubAbilityEffect[]
}

export type IconSubAbilityEffect = {
    effect_names: string[]
    result: string
}

export function formatSubAbility(subAbility: IconSubAbility): string {
    const formatParts = [
        `**${subAbility.name}**`,
        subAbility.type,
        ...subAbility.effects.map((it) => formatSubAbilityEffect(it))
    ]
    return formatParts.filter((it) => it != "").join("\n")
}

export function formatSubAbilityEffect(effects: IconSubAbilityEffect): string {
    return effects.effect_names.filter((it) => it != "").map((it) => `**${it}**`).join(" or ") + `: ${effects.result}`
}

export function formatAmbiguousSubAbility(sub: (IconSubAbility | IconInterrupt | IconSummon | IconObject)): string {
    function isSubAbility(ambiguous: (IconSubAbility | IconInterrupt | IconSummon | IconObject)): ambiguous is IconSubAbility {
        return Object.prototype.hasOwnProperty.call(ambiguous, "type")
    }

    function isInterrupt(ambiguous: (IconSubAbility | IconInterrupt | IconSummon | IconObject)): ambiguous is IconInterrupt {
        return Object.prototype.hasOwnProperty.call(ambiguous, "count")
    }

    function isObject(ambiguous: (IconSubAbility | IconInterrupt | IconSummon | IconObject)): ambiguous is IconObject {
        return Object.prototype.hasOwnProperty.call(ambiguous, "height")
    }

    if (isSubAbility(sub)) {
        return formatSubAbility(sub)
    } else if (isInterrupt(sub)) {
        return formatInterrupt(sub)
    } else if (isObject(sub)) {
        return formatObject(sub)
    } else {
        // smart cast to IconSummon
        return formatSummon(sub)
    }
}
