import {formatSubAbilityEffect, IconSubAbilityEffect} from "./icon-sub-ability";

export type IconObject = {
    name: string
    height: number
    effects?: IconSubAbilityEffect[]
}

export function formatObject(object: IconObject): string {
    function remainingRows(): string[] {
        let effects: string[]
        if (object.effects) {
            effects = object.effects.map((it) => formatSubAbilityEffect(it))
        }
        return effects
    }

    return [`**${object.name}**`, `Height ${object.height}`, ...remainingRows()].filter((it) => it != "").join("\n")
}