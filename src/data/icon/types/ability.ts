import {IconTrait} from "./trait";
import {IconAttack} from "./attack";
import {IconTalent} from "./talent";
import {IconSubAbility} from "./sub_ability";
import {IconSummon} from "./summon";
import {IconCombo} from "./combo";
import {IconInfusion} from "./infuse";

export type IconAbility = {
    id: string
    job: string
    name: string
    description: string
    chapter: number
    action: string
    range?: string
    attack?: IconAttack
    area?: string
    effect?: string
    trigger?: string
    charge?: string
    refresh?: string
    combo?: IconCombo
    summon?: IconSummon
    infusion?: IconInfusion
    tags?: string[]
    special?: IconTrait
    talents: IconTalent[]
    abilities?: IconSubAbility[]
}

export type TypedIconAbility = IconAbility & {
    type: string
}