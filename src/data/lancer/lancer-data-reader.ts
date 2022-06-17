import {addAlternativeNames, AlternativelyNamed, SupportsAltName} from "./name-fixes";
import {Lcp} from "./types/lcp";
import {getCorePowersFromFrames} from "./types/frame";
import {splitPilotItems} from "./types/pilot";
import {TypedData} from "./types/shared-types";
import {
    SearchableAction,
    SearchableCoreBonus,
    SearchableData,
    SearchableFrame,
    SearchableGlossaryItem,
    SearchableICoreSystemData,
    SearchableMod,
    SearchablePilotArmor,
    SearchablePilotGear,
    SearchablePilotWeapon,
    SearchableSkillTrigger,
    SearchableStatusCondition,
    SearchableSystem,
    SearchableTag,
    SearchableTalent,
    SearchableWeapon
} from "./search/searchable";

export function lancerDataReader(lcp: Lcp): LancerData {
    const pilotItems = splitPilotItems(lcp.pilot_gear)
    return new LancerData(
        filterTypeAndLabel(lcp.actions, "action"),
        filterTypeAndLabel(lcp.coreBonuses, "core-bonus"),
        typeAndLabel(getCorePowersFromFrames(lcp.frames), "core-system"),
        filterTypeAndLabel(lcp.frames, "frame"),
        typeAndLabel(lcp.glossary, "glossary"),
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
    glossary: SearchableGlossaryItem[]
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
        glossary: SearchableGlossaryItem[],
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

        this.glossary = glossary
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
            ...this.glossary,
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
