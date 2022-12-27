import {IconAttack} from "./attack";

export type IconInfusion = {
    cost: number | string
    name: string
    effect?: string
    range?: string
    attack?: IconAttack
    area?: string
    resolve?: number
}