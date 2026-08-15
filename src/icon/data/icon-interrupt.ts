import {formatSubAbilityEffect, IconSubAbilityEffect} from "./icon-sub-ability";

export type IconInterrupt = {
    name: string
    count: number
    effects: IconSubAbilityEffect[]
}

export function formatInterrupt(interrupt: IconInterrupt): string {
    return [
        `**${interrupt.name}** ${interrupt.count}`,
        ...interrupt.effects.map((it) => formatSubAbilityEffect(it))
    ].filter((it) => it != "").join("\n")
}