import {addAlternativeNames, AlternativelyNamed, SupportsAltName} from "./name-fixes";
import {Lcp} from "./types/lcp";
import {StatusCondition} from "./types/status";
import {Frame, getCorePowersFromFrames} from "./types/frame";
import {ICoreSystemData, SourcedCoreSystem} from "./types/core-system";
import {PilotArmor, PilotGear, PilotWeapon, splitPilotItems} from "./types/pilot";
import {Action} from "./types/action";
import {CoreBonus} from "./types/core-bonus";
import {Mod} from "./types/mod";
import {SkillTrigger} from "./types/skill";
import {System} from "./types/system";
import {Talent} from "./types/talent";
import {Tag} from "./types/tag";
import {Weapon} from "./types/weapon";
import {TypedData} from "./types/shared-types";

export function lancerDataReader(lcp: Lcp): LancerData {
    console.log("lancerDataReader")
    const pilotItems = splitPilotItems(lcp.pilot_gear)
    return new LancerData(
        filterTypeAndLabel(lcp.actions, "action"),
        filterTypeAndLabel(lcp.coreBonuses, "core-bonus"),
        typeAndLabel(getCorePowersFromFrames(lcp.frames), "core-system"),
        filterTypeAndLabel(lcp.frames, "frame"),
        filterTypeAndLabel(lcp.mods, "mod"),
        filterTypeAndLabel(pilotItems.armor, "pilot-armor"),
        filterTypeAndLabel(pilotItems.gear, "pilot-gear"),
        filterTypeAndLabel(pilotItems.weapon, "pilot-weapon"),
        filterTypeAndLabel(lcp.skills, "skill"),
        typeAndLabel(lcp.statuses, "status"),
        filterTypeAndLabel(lcp.systems, "system"),
        filterTypeAndLabel(lcp.tags, "tag"),
        filterTypeAndLabel(lcp.talents, "talent"),
        filterTypeAndLabel(lcp.weapons, "weapon")
    )
}

interface HasId {
    id: string
}

function filterTypeAndLabel<T extends SupportsAltName & HasId>(
    jsonBlob: T[],
    type: string
): (T & TypedData & AlternativelyNamed)[] {
    const filteredJson: T[] = filterMissing(jsonBlob)
    return typeAndLabel<T>(filteredJson, type)
}

function filterMissing<T extends HasId>(array: T[]): T[] {
    return array.filter((entry) => !entry.id.startsWith("missing_"))
}

function typeAndLabel<T extends SupportsAltName>(
    jsonBlob: T[],
    type: string
): (T & TypedData & AlternativelyNamed)[] {
    return jsonBlob
        .map((entry: T) => ({data_type: type, content_pack: "Lancer Core", ...entry}))
        .map((entry: T & TypedData) => addAlternativeNames(entry))
}

export class LancerData {
    actions: SearchableAction[]
    coreBonuses: SearchableCoreBonus[]
    coreSystems: SearchableICoreSystemData[]
    frames: SearchableFrame[]
    mods: SearchableMod[]
    pilot_armor: SearchablePilotArmor[]
    pilot_weapons: SearchablePilotWeapon[]
    pilot_gear: SearchablePilotGear[]
    skills: SearchableSkillTrigger[]
    statuses: SearchableStatusCondition[]
    systems: SearchableSystem[]
    tags: SearchableTag[]
    talents: SearchableTalent[]
    weapons: SearchableWeapon[]

    constructor(
        actions: SearchableAction[],
        coreBonuses: SearchableCoreBonus[],
        coreSystems: SearchableICoreSystemData[],
        frames: SearchableFrame[],
        mods: SearchableMod[],
        pilot_armor: SearchablePilotArmor[],
        pilot_gear: SearchablePilotGear[],
        pilot_weapons: SearchablePilotWeapon[],
        skills: SearchableSkillTrigger[],
        statuses: SearchableStatusCondition[],
        systems: SearchableSystem[],
        tags: SearchableTag[],
        talents: SearchableTalent[],
        weapons: SearchableWeapon[]
    ) {
        this.actions = actions
        this.coreBonuses = coreBonuses

        this.coreSystems = coreSystems
        this.frames = frames

        // TODO: Glossary?
        this.mods = mods

        this.pilot_armor = pilot_armor
        this.pilot_gear = pilot_gear
        this.pilot_weapons = pilot_weapons

        this.skills = skills
        this.statuses = statuses
        this.systems = systems
        this.tags = tags
        this.talents = talents
        this.weapons = weapons
    }

    getAll(): SearchableData[] {
        return [
            ...this.actions,
            ...this.coreBonuses,
            ...this.coreSystems,
            ...this.frames,
            ...this.mods,
            ...this.pilot_armor,
            ...this.pilot_weapons,
            ...this.pilot_gear,
            ...this.skills,
            ...this.statuses,
            ...this.systems,
            ...this.tags,
            ...this.talents,
            ...this.weapons
        ]
    }
}

export type SearchableAction = Action & TypedData & AlternativelyNamed
export type SearchableCoreBonus = CoreBonus & TypedData & AlternativelyNamed
export type SearchableICoreSystemData = ICoreSystemData & SourcedCoreSystem & TypedData & AlternativelyNamed
export type SearchableFrame = Frame & TypedData & AlternativelyNamed
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