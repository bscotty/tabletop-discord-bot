import {formatSubAbility, IconSubAbility} from "./icon-sub-ability";

export type IconBonusEffect = {
    effect_names: string[]
    result: string
    sub_ability?: IconSubAbility
    and?: boolean
}

export function formatBonusEffect(bonusEffect: IconBonusEffect): string {
    let subAbilitySuffix = ""
    if (bonusEffect.sub_ability) {
        subAbilitySuffix = "\n" + formatSubAbility(bonusEffect.sub_ability)
    }
    let separator = "or"
    if (bonusEffect.and) {
        separator = "and gain"
    }
    return bonusEffect.effect_names.map((it) => `**${it}**`).join(` ${separator} `) + ": " + bonusEffect.result +
        subAbilitySuffix
}