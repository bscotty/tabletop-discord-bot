import {
    SearchableAction,
    SearchableBond,
    SearchableBondPower,
    SearchableCoreBonus, SearchableData,
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
} from "../search/searchable";

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