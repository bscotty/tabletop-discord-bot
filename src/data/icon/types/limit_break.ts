import {IconAttack} from "./attack";
import {IconTrait} from "./trait";
import {IconTalent} from "./talent";
import {IconSubAbility} from "./sub_ability";

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
    trigger: string
    charge?: string
    effect: string
    tags: string[]
    special?: IconTrait
    talents: IconTalent[]
    abilities: IconSubAbility[]
}

export type TypedIconLimitBreak = IconLimitBreak & {
    type: string
}