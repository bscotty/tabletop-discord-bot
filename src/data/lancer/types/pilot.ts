import {
    IActionData,
    IBonusData,
    IDamageData,
    IDeployableData,
    IRangeData,
    ISynergyData,
    ITagData,
} from "./shared-types";

export type PilotWeapon = {
    id: string
    name: string // v-html
    type: string //"Weapon"
    description?: string
    tags?: ITagData[]
    range?: IRangeData[]
    damage?: IDamageData[]
    actions?: IActionData[] // these are only available to UNMOUNTED pilots
    bonuses?: IBonusData[] // these bonuses are applied to the pilot, not parent system
    synergies?: ISynergyData[]
    deployables?: IDeployableData[] // these are only available to UNMOUNTED pilots
}

export type TypedPilotWeapon = PilotWeapon & { kind: "Pilot Weapon" }

export type PilotArmor = {
    id: string
    name: string // v-html
    type: string // "Armor"
    description?: string
    tags?: ITagData[]
    actions?: IActionData[] // these are only available to UNMOUNTED pilots
    bonuses?: IBonusData[] // these bonuses are applied to the pilot, not parent system
    synergies?: ISynergyData[]
    deployables?: IDeployableData[] // these are only available to UNMOUNTED pilots
}

export type TypedPilotArmor = PilotArmor & { kind: "Pilot Armor" }

export type PilotGear = {
    id: string
    name: string // v-html
    type: string // "Gear"
    description?: string
    tags?: ITagData[]
    actions?: IActionData[] // these are only available to UNMOUNTED pilots
    bonuses?: IBonusData[] // these bonuses are applied to the pilot, not parent system
    synergies?: ISynergyData[]
    deployables?: IDeployableData[] // these are only available to UNMOUNTED pilots
}

export type TypedPilotGear = PilotGear & { kind: "Pilot Gear" }

export function splitPilotItems(
    pilot_items_data: (PilotArmor | PilotGear | PilotWeapon)[]
): { armor: PilotArmor[], gear: PilotGear[], weapon: PilotWeapon[] } {
    const pilot_armor_data: PilotArmor[] = pilot_items_data
        .filter(isPilotArmor)

    const pilot_gear_data: PilotGear[] = pilot_items_data
        .filter(isPilotGear)

    const pilot_weapon_data: PilotWeapon[] = pilot_items_data
        .filter(isPilotWeapon)

    return {armor: pilot_armor_data, gear: pilot_gear_data, weapon: pilot_weapon_data}
}

function isPilotArmor(
    item: PilotArmor | PilotGear | PilotWeapon
): item is PilotArmor {
    return item.type.toLowerCase() == "armor"
}

function isPilotGear(
    item: PilotArmor | PilotGear | PilotWeapon
): item is PilotGear {
    return item.type.toLowerCase() == "gear"
}

function isPilotWeapon(
    item: PilotArmor | PilotGear | PilotWeapon
): item is PilotWeapon {
    return item.type.toLowerCase() == "weapon"
}
