import {formatSubAbilityEffect, IconSubAbilityEffect} from "./icon-sub-ability";

export type IconSummons = {
    description: string
    summons: IconSummon[]
}

// TODO: Use in ability json
export type IconSummon = {
    name: string,
    size?: number
    tags?: string[]
    effects: IconSubAbilityEffect[]
}

export function formatSummons(summons: IconSummons): string {
    return [
        `**Summons**`,
        summons.description,
        ...summons.summons.map((it) => formatSummon(it))
    ].join("\n")
}

export function formatSummon(summon: IconSummon): string {
    let size = ""
    if (summon.size) {
        size = `Size ${summon.size}`
    }

    function secondRow(): string {
        let secondRow: string
        if (summon.tags) {
            secondRow = [`Size ${summon.size}`, ...summon.tags].join(", ")
        } else {
            secondRow = size
        }
        return secondRow
    }

    function remainingRows(): string[] {
        let effects: string[]
        if (summon.effects) {
            effects = summon.effects.map((it) => formatSubAbilityEffect(it))
        }
        return effects
    }

    return [`**${summon.name}**`, secondRow(), ...remainingRows()].filter((it) => it != "").join("\n")
}