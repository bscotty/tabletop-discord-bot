import {IconArea} from "./icon-area";
import {IconBonusEffect} from "./icon-bonus-effect";
import {IconTalent} from "./icon-talent";
import {IconMasteryTalent} from "./icon-mastery-talent";
import {IconAttack} from "./icon-attack";
import {IconCombo} from "./icon-combo";
import {IconInfusion} from "./icon-infusion";

export type IconAbility = {
    name: string
    job: string
    chapter: number
    action: string
    area?: IconArea[]
    tags?: string[]
    description: string
    effects: (IconBonusEffect | IconAttack)[]
    combo?: IconCombo
    infusion?: IconInfusion
    talents: IconTalent[]
    mastery: IconMasteryTalent
}
