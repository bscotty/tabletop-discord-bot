import {IconAttack} from "./attack";
import {IconSpecialMechanic} from "./special";

export type IconSubAbility = {
    id: string
    job: string
    name: string
    description?: string
    action: string
    range?: string
    attack?: IconAttack
    area?: string
    effect: string
    trigger?: string
    charge?: string
    refresh?: string
    tags?: string[]
    special?: IconSpecialMechanic
}