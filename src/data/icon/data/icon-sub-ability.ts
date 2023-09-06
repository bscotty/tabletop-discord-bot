export type IconSubAbility = {
    sub_ability_name: string
    type: string
    sub_effects: SubAbilityEffects[]
}

export type SubAbilityEffects = {
    effect_names: string[]
    result: string
}

export function formatSubAbility(subAbility: IconSubAbility): string {
    return `**${subAbility.sub_ability_name}**\n${subAbility.type}\n` +
        subAbility.sub_effects.map((it) => formatSubAbilityEffects(it)).join("\n")
}

function formatSubAbilityEffects(effects: SubAbilityEffects): string {
    return effects.effect_names.map((it) => `**${it}**`).join(" or ") + `: ${effects.result}`
}
