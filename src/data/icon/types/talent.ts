import {IconInfusion} from "./infuse";
import {IconCombo} from "./combo";
import {IconSummon} from "./summon";

export type IconTalent = {
    rank: number | string
    description: string
    infusion?: IconInfusion
    combo?: IconCombo
    summon?: IconSummon
    resolve?: number
}