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

export function iconSharedFormat(formattable: IconSharedFormat, extraNewLineBeforeDescription = false): string {
    function action(): string | undefined {
        let action: string | undefined = undefined
        if (formattable.action) {
            action = formattable.action
        }
        return action
    }

    function resolve(): string | undefined {
        let resolve: string | undefined = undefined
        if (formattable.resolve) {
            resolve = `${formattable.resolve} Resolve`
        }
        return resolve
    }

    const attack = "Attack"

    function attackTag(): string | undefined {
        let attackTag: string | undefined = undefined
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

    function area(): string | undefined {
        let area: string | undefined = undefined
        if (formattable.area) {
            area = formattable.area.map((it) => formatArea(it)).join(", ")
        }
        return area
    }

    function description(shouldAddNewLine: boolean): string {
        let description: string | undefined = undefined
        if (formattable.description) {
            if (shouldAddNewLine) {
                description = `\n*${formattable.description}*`
            } else {
                description = formattable.description
            }
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

    const actionLine = [action(), attackTag(), area()].filter((it) => it != undefined).join(", ")

    const formattedParts = [
        resolve(),
        actionLine,
        ...otherTags(),
        description(extraNewLineBeforeDescription),
        ...effects()
    ]
    return formattedParts.filter((it) => it != undefined).join("\n")
}

export function formatEffectOrAttack(effectOrAttack: (IconBonusEffect | IconAttack)): string {
    function isAttack(it: IconBonusEffect | IconAttack): it is IconAttack {
        return Object.prototype.hasOwnProperty.call(it, "on_hit");
    }

    if (isAttack(effectOrAttack)) {
        return formatAttack(effectOrAttack)
    } else {
        // smart-cast to IconBonusEffect
        return formatBonusEffect(effectOrAttack)
    }
}