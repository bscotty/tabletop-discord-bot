import {IconTrait} from "./trait";
import {IconAttack} from "./attack";
import {IconTalent} from "./talent";
import {IconSubAbility} from "./sub_ability";

export type IconAbility = {
    id: string
    job: string
    name: string
    description: string
    chapter: number
    action: string
    range?: string
    attack?: IconAttack
    effect: string
    trigger?: string
    charge?: string
    refresh?: string
    tags: string[]
    special?: IconTrait
    talents: IconTalent[]
    abilities?: IconSubAbility[]
}

export type TypedIconAbility = IconAbility & {
    type: string
}