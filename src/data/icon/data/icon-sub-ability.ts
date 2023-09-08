import {formatInterrupt, IconInterrupt} from "./icon-interrupt";
import {formatSummon, IconSummon} from "./icon-summon";

export type IconSubAbility = {
    sub_ability_name: string
    type: string
    sub_effects: IconSubAbilityEffect[]
}

export type IconSubAbilityEffect = {
    effect_names: string[]
    result: string
}

export function formatSubAbility(subAbility: IconSubAbility): string {
    return `**${subAbility.sub_ability_name}**\n${subAbility.type}\n` +
        subAbility.sub_effects.map((it) => formatSubAbilityEffect(it)).join("\n")
}

export function formatSubAbilityEffect(effects: IconSubAbilityEffect): string {
    return effects.effect_names.map((it) => `**${it}**`).join(" or ") + `: ${effects.result}`
}

export function formatAmbiguousSubAbility(sub: (IconSubAbility | IconInterrupt | IconSummon)): string {
    function isSubAbility(ambiguous: (IconSubAbility | IconInterrupt | IconSummon)): ambiguous is IconSubAbility {
        return ambiguous.hasOwnProperty("sub_ability_name")
    }

    function isInterrupt(ambiguous: (IconSubAbility | IconInterrupt | IconSummon)): ambiguous is IconInterrupt {
        return ambiguous.hasOwnProperty("count")
    }

    if (isSubAbility(sub)) {
        return formatSubAbility(sub)
    } else if (isInterrupt(sub)) {
        return formatInterrupt(sub)
    } else {
        // smart cast to IconSummon
        return formatSummon(sub)
    }
}
