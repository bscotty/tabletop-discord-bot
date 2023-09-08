import {formatAmbiguousSubAbility, IconSubAbility} from "./icon-sub-ability";
import {IconSummon} from "./icon-summon";
import {IconInterrupt} from "./icon-interrupt";

export type IconBonusEffect = {
    effect_names: string[]
    result: string
    sub_ability?: (IconSubAbility | IconInterrupt | IconSummon)
    and?: boolean
}

export function formatBonusEffect(bonusEffect: IconBonusEffect): string {
    let subAbilitySuffix = ""
    if (bonusEffect.sub_ability) {
        subAbilitySuffix = "\n" + formatAmbiguousSubAbility(bonusEffect.sub_ability)
    }
    let separator = "or"
    if (bonusEffect.and) {
        separator = "and gain"
    }
    return bonusEffect.effect_names.map((it) => `**${it}**`).join(` ${separator} `) + ": " + bonusEffect.result +
        subAbilitySuffix
}