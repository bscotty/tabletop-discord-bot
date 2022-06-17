import {Action} from "../types/action";
import {TypedData} from "../types/shared-types";
import {AlternativelyNamed} from "../name-fixes";
import {CoreBonus} from "../types/core-bonus";
import {ICoreSystemData, SourcedCoreSystem} from "../types/core-system";
import {Frame} from "../types/frame";
import {GlossaryItem} from "../types/glossary";
import {Mod} from "../types/mod";
import {PilotArmor, PilotGear, PilotWeapon} from "../types/pilot";
import {SkillTrigger} from "../types/skill";
import {StatusCondition} from "../types/status";
import {System} from "../types/system";
import {Tag} from "../types/tag";
import {Talent} from "../types/talent";
import {Weapon} from "../types/weapon";

export type SearchableAction = Action & TypedData & AlternativelyNamed
export type SearchableCoreBonus = CoreBonus & TypedData & AlternativelyNamed
export type SearchableICoreSystemData = ICoreSystemData & SourcedCoreSystem & TypedData & AlternativelyNamed
export type SearchableFrame = Frame & TypedData & AlternativelyNamed
export type SearchableGlossaryItem = GlossaryItem & TypedData & AlternativelyNamed
export type SearchableMod = Mod & TypedData & AlternativelyNamed
export type SearchablePilotArmor = PilotArmor & TypedData & AlternativelyNamed
export type SearchablePilotGear = PilotGear & TypedData & AlternativelyNamed
export type SearchablePilotWeapon = PilotWeapon & TypedData & AlternativelyNamed
export type SearchableSkillTrigger = SkillTrigger & TypedData & AlternativelyNamed
export type SearchableStatusCondition = StatusCondition & TypedData & AlternativelyNamed
export type SearchableSystem = System & TypedData & AlternativelyNamed
export type SearchableTag = Tag & TypedData & AlternativelyNamed
export type SearchableTalent = Talent & TypedData & AlternativelyNamed
export type SearchableWeapon = Weapon & TypedData & AlternativelyNamed
export type SearchableData =
    SearchableAction
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