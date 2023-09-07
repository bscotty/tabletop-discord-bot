import {formatSubAbility, IconSubAbility} from "./icon-sub-ability";
import {formatBonusEffect, IconBonusEffect} from "./icon-bonus-effect";
import {formatCombo, IconCombo} from "./icon-combo";
import {formatInfusion, IconInfusion} from "./icon-infusion";

export type IconMasteryTalent = {
    name: string
    description?: string
    effects?: IconBonusEffect[]
    sub_ability?: IconSubAbility
    combo?: IconCombo
    infusion?: IconInfusion
}

export function formatMastery(mastery: IconMasteryTalent): string {
    let description = ""
    if (mastery.description) {
        description = mastery.description
    }
    let effects: string[] = []
    if (mastery.effects) {
        effects = mastery.effects.map((it) => formatBonusEffect(it))
    }
    let subAbility = ""
    if (mastery.sub_ability) {
        subAbility = formatSubAbility(mastery.sub_ability)
    }
    let combo = ""
    if (mastery.combo) {
        combo = formatCombo(mastery.combo)
    }
    let infusion = ""
    if (mastery.infusion) {
        infusion = formatInfusion(mastery.infusion)
    }

    const formattedParts = [`**Mastery: ${mastery.name}**`, description, effects, subAbility, combo, infusion]

    return formattedParts.filter((it) => it != "").join("\n")
}