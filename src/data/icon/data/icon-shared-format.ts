import {formatArea, IconArea} from "./icon-area";
import {formatBonusEffect, IconBonusEffect} from "./icon-bonus-effect";
import {formatAttack, IconAttack} from "./icon-attack";

// Utility to share formatting for Ability, Combo, and Infusion
export type IconSharedFormat = {
    action?: string
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
            effects = formatEffects(formattable.effects)
        }
        return effects
    }

    const firstLine = [action(), attackTag(), area()].filter((it) => it != "").join(", ")
    const formattedParts = [firstLine, ...otherTags(), description(extraNewLineBeforeDescription), ...effects()]
    return formattedParts.filter((it) => it != "").join("\n")
}

function formatEffects(effects: (IconBonusEffect | IconAttack)[]): string[] {
    function isAttack(effect: IconBonusEffect | IconAttack): effect is IconAttack {
        return effect.hasOwnProperty("on_hit")
    }

    return effects.map((it: IconBonusEffect | IconAttack) => {
        if (isAttack(it)) {
            return formatAttack(it)
        } else {
            // smart-cast to IconBonusEffect
            return formatBonusEffect(it)
        }
    })
}