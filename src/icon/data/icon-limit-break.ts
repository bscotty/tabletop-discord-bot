import {IconMasteryTalent} from "./icon-mastery-talent";
import {IconBonusEffect} from "./icon-bonus-effect";
import {IconAttack} from "./icon-attack";
import {IconInfusion} from "./icon-infusion";

export type IconLimitBreak = {
    name: string
    job: string
    resolve: number
    action: string
    tags?: string[]
    description: string
    effects: (IconBonusEffect | IconAttack)[]
    infusion?: IconInfusion
    ultimate: IconMasteryTalent
}