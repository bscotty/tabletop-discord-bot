// TODO: can we actually make these constants? Then we don't need to define these and can just do the checks inline
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
} from "../search/searchable";

export function isSearchableAction(data: SearchableData): data is SearchableAction {
    return data.data_type == "Action"
}

export function isSearchableCoreBonus(data: SearchableData): data is SearchableCoreBonus {
    return data.data_type == "Core Bonus"
}

export function isSearchableICoreSystemData(data: SearchableData): data is SearchableICoreSystemData {
    return data.data_type == "Core System"
}

export function isSearchableFrame(data: SearchableData): data is SearchableFrame {
    return data.data_type == "Frame"
}

export function isSearchableGlossaryItem(data: SearchableData): data is SearchableGlossaryItem {
    return data.data_type == "Glossary"
}

export function isSearchableMod(data: SearchableData): data is SearchableMod {
    return data.data_type == "Mod"
}

export function isSearchablePilotArmor(data: SearchableData): data is SearchablePilotArmor {
    return data.data_type == "Pilot Armor"
}

export function isSearchablePilotGear(data: SearchableData): data is SearchablePilotGear {
    return data.data_type == "Pilot Gear"
}

export function isSearchablePilotWeapon(data: SearchableData): data is SearchablePilotWeapon {
    return data.data_type == "Pilot Weapon"
}

export function isSearchableSkillTrigger(data: SearchableData): data is SearchableSkillTrigger {
    return data.data_type == "Skill"
}

export function isSearchableStatusCondition(data: SearchableData): data is SearchableStatusCondition {
    return data.data_type == "Status"
}

export function isSearchableSystem(data: SearchableData): data is SearchableSystem {
    return data.data_type == "System"
}

export function isSearchableTag(data: SearchableData): data is SearchableTag {
    return data.data_type == "Tag"
}

export function isSearchableTalent(data: SearchableData): data is SearchableTalent {
    return data.data_type == "Talent"
}

export function isSearchableWeapon(data: SearchableData): data is SearchableWeapon {
    return data.data_type == "Weapon"
}