import {IconAttack} from "./attack";
import {IconTalent} from "./talent";
import {IconSubAbility} from "./sub_ability";
import {IconSpecialMechanic} from "./special";

export type IconLimitBreak = {
    id: string
    job: string
    name: string
    description: string
    chapter: number
    action: string
    resolve: number
    range?: string
    attack?: IconAttack
    area?: string
    trigger?: string
    charge?: string
    effect: string
    tags?: string[]
    special?: IconSpecialMechanic
    talents: IconTalent[]
    abilities?: IconSubAbility[]
}

export type TypedIconLimitBreak = IconLimitBreak & {
    type: string
}