import {IconAttack} from "./attack";

export type IconCombo = {
    name: string
    effect: string
    range?: string
    trigger?: string
    attack?: IconAttack
    area?: string
    tags?: string[]
}