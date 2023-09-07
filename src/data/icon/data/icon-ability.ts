import {IconArea} from "./icon-area";
import {IconBonusEffect} from "./icon-bonus-effect";
import {IconTalent} from "./icon-talent";
import {IconMasteryTalent} from "./icon-mastery-talent";
import {IconAttack} from "./icon-attack";
import {IconNameDescription} from "./icon-name-description";

export type IconAbility = {
    name: string
    job: string
    chapter: number
    action: string
    area?: IconArea[]
    tags?: string[]
    description: string
    effects: (IconBonusEffect | IconAttack)[]
    combo?: IconNameDescription
    talents: IconTalent[]
    mastery: IconMasteryTalent
}
