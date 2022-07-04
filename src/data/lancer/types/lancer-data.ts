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
} from "./searchable";

export default class LancerData {
    constructor(
        public readonly actions: SearchableAction[],
        public readonly bonds: SearchableBond[],
        public readonly bondPowers: SearchableBondPower[],
        public readonly coreBonuses: SearchableCoreBonus[],
        public readonly coreSystems: SearchableICoreSystemData[],
        public readonly frames: SearchableFrame[],
        public readonly glossary: SearchableGlossaryItem[],
        public readonly mods: SearchableMod[],
        public readonly pilot_armor: SearchablePilotArmor[],
        public readonly pilot_gear: SearchablePilotGear[],
        public readonly pilot_weapons: SearchablePilotWeapon[],
        public readonly skills: SearchableSkillTrigger[],
        public readonly statuses: SearchableStatusCondition[],
        public readonly systems: SearchableSystem[],
        public readonly tags: SearchableTag[],
        public readonly talents: SearchableTalent[],
        public readonly weapons: SearchableWeapon[]) {
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
