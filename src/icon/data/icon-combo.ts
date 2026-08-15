import {IconAttack} from "./icon-attack";
import {IconBonusEffect} from "./icon-bonus-effect";
import {IconArea} from "./icon-area";
import {iconSharedFormat} from "./icon-shared-format";

export type IconCombo = {
    name: string
    description?: string
    action?: string
    area?: IconArea[]
    tags?: string[]
    effects?: (IconAttack | IconBonusEffect)[]
}

export function formatCombo(combo: IconCombo): string {
    return `**Combo: ${combo.name}**\n` + iconSharedFormat(combo)
}