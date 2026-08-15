import {IconArea} from "./icon-area";
import {IconAttack} from "./icon-attack";
import {IconBonusEffect} from "./icon-bonus-effect";
import {iconSharedFormat} from "./icon-shared-format";

export type IconInfusion = {
    cost: number | string
    other_triggers?: string[]
    name: string
    description?: string
    action?: string
    resolve?: number
    tags?: string[]
    area?: IconArea[]
    effects?: (IconAttack | IconBonusEffect)[]
}

export function formatInfusion(infusion: IconInfusion): string {
    const cost = `Infuse ${infusion.cost}`
    let allTriggers: string
    if (infusion.other_triggers) {
        allTriggers = [cost, ...infusion.other_triggers].join(" or ")
    } else {
        allTriggers = cost
    }
    return `**${allTriggers}: ${infusion.name}**\n` + iconSharedFormat(infusion)
}