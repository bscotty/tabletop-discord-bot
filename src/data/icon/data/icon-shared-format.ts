import {formatArea, IconArea} from "./icon-area";
import {formatBonusEffect, IconBonusEffect} from "./icon-bonus-effect";
import {formatAttack, IconAttack} from "./icon-attack";

// Utility to share formatting for Ability, Combo, and Infusion
export type IconSharedFormat = {
    action?: string
    resolve?: number
    area?: IconArea[]
    tags?: string[]
    description?: string
    effects?: (IconBonusEffect | IconAttack)[]
}

export function iconSharedFormat(formattable: IconSharedFormat, extraNewLineBeforeDescription: boolean = false): string {
    function action(): string {
        let action = ""
        if (formattable.action) {
            action = formattable.action
        }
        return action
    }

    function resolve(): string {
        let resolve = ""
        if (formattable.resolve) {
            resolve = `${formattable.resolve} Resolve`
        }
        return resolve
    }

    const attack = "Attack"

    function attackTag(): string {
        let attackTag = ""
        if (formattable.tags) {
            if (formattable.tags.find((it) => it == attack)) {
                attackTag = attack
            }

        }
        return attackTag
    }

    function otherTags(): string[] {
        let otherTags: string[] = []
        if (formattable.tags) {
            otherTags = formattable.tags.filter((it) => it != attack)
        }
        return otherTags
    }

    function area(): string {
        let area = ""
        if (formattable.area) {
            area = formattable.area.map((it) => formatArea(it)).join(", ")
        }
        return area
    }

    function description(shouldAddNewLine: boolean): string {
        let description = ""
        if (formattable.description) {
            if (shouldAddNewLine) {
                description = "\n"
            }
            description += formattable.description
        }
        return description
    }

    function effects(): string[] {
        let effects: string[] = []
        if (formattable.effects) {
            effects = formattable.effects.map((it) => formatEffectOrAttack(it))
        }
        return effects
    }

    const actionLine = [action(), attackTag(), area()].filter((it) => it != "").join(", ")

    const formattedParts = [
        resolve(),
        actionLine,
        ...otherTags(),
        description(extraNewLineBeforeDescription),
        ...effects()
    ]
    return formattedParts.filter((it) => it != "").join("\n")
}

export function formatEffectOrAttack(effectOrAttack: (IconBonusEffect | IconAttack)): string {
    function isAttack(it: IconBonusEffect | IconAttack): it is IconAttack {
        return it.hasOwnProperty("on_hit")
    }

    if (isAttack(effectOrAttack)) {
        return formatAttack(effectOrAttack)
    } else {
        // smart-cast to IconBonusEffect
        return formatBonusEffect(effectOrAttack)
    }
}