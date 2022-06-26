import {TypedAction} from "../types/action";
import {LabeledContent} from "../types/shared-types";
import {AlternativelyNamed} from "../name-fixes";
import {TypedCoreBonus} from "../types/core-bonus";
import {TypedCoreSystem} from "../types/core-system";
import {TypedFrame} from "../types/frame";
import {TypedGlossaryItem} from "../types/glossary";
import {TypedMod} from "../types/mod";
import {TypedPilotArmor, TypedPilotGear, TypedPilotWeapon} from "../types/pilot";
import {TypedSkillTrigger} from "../types/skill";
import {TypedStatus} from "../types/status";
import {TypedSystem} from "../types/system";
import {TypedTag} from "../types/tag";
import {TypedTalent} from "../types/talent";
import {TypedWeapon} from "../types/weapon";
import {TypedBond, TypedBondPower} from "../types/bonds";

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