// TODO: can we actually make these constants so we don't need to define these and can just do the checks inline?
import {
    SearchableAction,
    SearchableCoreBonus,
    SearchableData,
    SearchableFrame,
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
} from "../lancer-data-reader";

export function isSearchableAction(data: SearchableData): data is SearchableAction {
    return data.data_type == "action"
}

export function isSearchableCoreBonus(data: SearchableData): data is SearchableCoreBonus {
    return data.data_type == "core-bonus"
}

export function isSearchableICoreSystemData(data: SearchableData): data is SearchableICoreSystemData {
    return data.data_type == "core-system"
}

export function isSearchableFrame(data: SearchableData): data is SearchableFrame {
    return data.data_type == "frame"
}

export function isSearchableMod(data: SearchableData): data is SearchableMod {
    return data.data_type == "mod"
}

export function isSearchablePilotArmor(data: SearchableData): data is SearchablePilotArmor {
    return data.data_type == "pilot-armor"
}

export function isSearchablePilotGear(data: SearchableData): data is SearchablePilotGear {
    return data.data_type == "pilot-gear"
}

export function isSearchablePilotWeapon(data: SearchableData): data is SearchablePilotWeapon {
    return data.data_type == "pilot-weapon"
}

export function isSearchableSkillTrigger(data: SearchableData): data is SearchableSkillTrigger {
    return data.data_type == "skill"
}

export function isSearchableStatusCondition(data: SearchableData): data is SearchableStatusCondition {
    return data.data_type == "status"
}

export function isSearchableSystem(data: SearchableData): data is SearchableSystem {
    return data.data_type == "system"
}

export function isSearchableTag(data: SearchableData): data is SearchableTag {
    return data.data_type == "tag"
}

export function isSearchableTalent(data: SearchableData): data is SearchableTalent {
    return data.data_type == "talent"
}

export function isSearchableWeapon(data: SearchableData): data is SearchableWeapon {
    return data.data_type == "weapon"
}