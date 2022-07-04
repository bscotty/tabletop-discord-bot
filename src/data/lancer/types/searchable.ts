import {TypedAction} from "./action";
import {LabeledContent} from "./shared-types";
import {AlternativelyNamed} from "../name-fixes";
import {TypedCoreBonus} from "./core-bonus";
import {TypedCoreSystem} from "./core-system";
import {TypedFrame} from "./frame";
import {TypedGlossaryItem} from "./glossary";
import {TypedMod} from "./mod";
import {TypedPilotArmor, TypedPilotGear, TypedPilotWeapon} from "./pilot";
import {TypedSkillTrigger} from "./skill";
import {TypedStatus} from "./status";
import {TypedSystem} from "./system";
import {TypedTag} from "./tag";
import {TypedTalent} from "./talent";
import {TypedWeapon} from "./weapon";
import {TypedBond, TypedBondPower} from "./bonds";

export type SearchableAction = TypedAction & LabeledContent & AlternativelyNamed
export type SearchableBond = TypedBond & LabeledContent & AlternativelyNamed
export type SearchableBondPower = TypedBondPower & LabeledContent & AlternativelyNamed
export type SearchableCoreBonus = TypedCoreBonus & LabeledContent & AlternativelyNamed
export type SearchableICoreSystemData = TypedCoreSystem & LabeledContent & AlternativelyNamed
export type SearchableFrame = TypedFrame & LabeledContent & AlternativelyNamed
export type SearchableGlossaryItem = TypedGlossaryItem & LabeledContent & AlternativelyNamed
export type SearchableMod = TypedMod & LabeledContent & AlternativelyNamed
export type SearchablePilotArmor = TypedPilotArmor & LabeledContent & AlternativelyNamed
export type SearchablePilotGear = TypedPilotGear & LabeledContent & AlternativelyNamed
export type SearchablePilotWeapon = TypedPilotWeapon & LabeledContent & AlternativelyNamed
export type SearchableSkillTrigger = TypedSkillTrigger & LabeledContent & AlternativelyNamed
export type SearchableStatusCondition = TypedStatus & LabeledContent & AlternativelyNamed
export type SearchableSystem = TypedSystem & LabeledContent & AlternativelyNamed
export type SearchableTag = TypedTag & LabeledContent & AlternativelyNamed
export type SearchableTalent = TypedTalent & LabeledContent & AlternativelyNamed
export type SearchableWeapon = TypedWeapon & LabeledContent & AlternativelyNamed
export type SearchableData =
    SearchableAction
    | SearchableBond
    | SearchableBondPower
    | SearchableCoreBonus
    | SearchableICoreSystemData
    | SearchableFrame
    | SearchableGlossaryItem
    | SearchableMod
    | SearchablePilotArmor
    | SearchablePilotWeapon
    | SearchablePilotGear
    | SearchableSkillTrigger
    | SearchableStatusCondition
    | SearchableSystem
    | SearchableTag
    | SearchableTalent
    | SearchableWeapon