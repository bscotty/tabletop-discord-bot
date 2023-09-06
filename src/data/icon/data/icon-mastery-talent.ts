import {formatSubAbility, IconSubAbility} from "./icon-sub-ability";
import {formatBonusEffect, IconBonusEffect} from "./icon-bonus-effect";

export type IconMasteryTalent = {

    name: string
    description?: string
    effects?: IconBonusEffect[]
    sub_ability?: IconSubAbility
}

export function formatMastery(mastery: IconMasteryTalent): string {
    let description = ""
    if (mastery.description) {
        description = `\n${mastery.description}`
    }
    let effects = ""
    if (mastery.effects) {
        effects = "\n" + mastery.effects.map((it) => formatBonusEffect(it)).join("\n")
    }
    let subAbility = ""
    if (mastery.sub_ability) {
        subAbility = "\n" + formatSubAbility(mastery.sub_ability)
    }
    return `**Mastery: ${mastery.name}**${description}${effects}${subAbility}`
}