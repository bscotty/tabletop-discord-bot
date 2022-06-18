import {addAlternativeNames, AlternativelyNamed, SupportsAltName} from "./name-fixes";
import {Lcp} from "./types/lcp";
import {getCorePowersFromFrames} from "./types/frame";
import {splitPilotItems} from "./types/pilot";
import {TypedData} from "./types/shared-types";
import {
    SearchableAction,
    SearchableBond,
    SearchableBondPower,
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
import {getPowersFromBonds} from "./types/bonds";

export function lancerDataReader(lcp: Lcp): LancerData {
    const pilotItems = splitPilotItems(lcp.pilot_gear)
    return new LancerData(
        filterTypeAndLabel(lcp.actions, "Action", lcp.info.name),
        filterTypeAndLabel(lcp.bonds, "Bond", lcp.info.name),
        typeAndLabel(getPowersFromBonds(lcp.bonds), "Bond Power", lcp.info.name),
        filterTypeAndLabel(lcp.coreBonuses, "Core Bonus", lcp.info.name),
        typeAndLabel(getCorePowersFromFrames(lcp.frames), "Core System", lcp.info.name),
        filterTypeAndLabel(lcp.frames, "Frame", lcp.info.name),
        typeAndLabel(lcp.glossary, "Glossary", lcp.info.name),
        filterTypeAndLabel(lcp.mods, "Mod", lcp.info.name),
        filterTypeAndLabel(pilotItems.armor, "Pilot Armor", lcp.info.name),
        filterTypeAndLabel(pilotItems.gear, "Pilot Gear", lcp.info.name),
        filterTypeAndLabel(pilotItems.weapon, "Pilot Weapon", lcp.info.name),
        filterTypeAndLabel(lcp.skills, "Skill", lcp.info.name),
        typeAndLabel(lcp.statuses, "Status", lcp.info.name),
        filterTypeAndLabel(lcp.systems, "System", lcp.info.name),
        filterTypeAndLabel(lcp.tags, "Tag", lcp.info.name),
        filterTypeAndLabel(lcp.talents, "Talent", lcp.info.name),
        filterTypeAndLabel(lcp.weapons, "Weapon", lcp.info.name)
    )
}

interface HasId {
    id: string
}

function filterTypeAndLabel<T extends SupportsAltName & HasId>(
    jsonBlob: T[],
    type: string,
    lcpName: string
): (T & TypedData & AlternativelyNamed)[] {
    const filteredJson: T[] = filterMissing(jsonBlob)
    return typeAndLabel<T>(filteredJson, type, lcpName)
}

function filterMissing<T extends HasId>(array: T[]): T[] {
    return array.filter((entry) => !entry.id.startsWith("missing_"))
}

function typeAndLabel<T extends SupportsAltName>(
    jsonBlob: T[],
    type: string,
    lcpName: string
): (T & TypedData & AlternativelyNamed)[] {
    return jsonBlob
        .map((entry: T) => ({...entry, data_type: type, content_pack: lcpName}))
        .map((entry: T & TypedData) => addAlternativeNames(entry))
}

export class LancerData {
    actions: SearchableAction[]
    bonds: SearchableBond[]
    bondPowers: SearchableBondPower[]
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
        bonds: SearchableBond[],
        bondPowers: SearchableBondPower[],
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
        this.bonds = bonds
        this.bondPowers = bondPowers

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
            ...this.bonds,
            ...this.bondPowers,
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
