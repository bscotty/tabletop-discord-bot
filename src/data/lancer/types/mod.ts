import {
    IActionData,
    IBonusData,
    ICounterData,
    IDamageData,
    IDeployableData,
    IRangeData,
    ISynergyData,
    ITagData,
    WeaponSize,
    WeaponType
} from "./shared-types";

export type Mod = {
    id: string
    name: string
    source: string // Manufacturer ID
    license: string // Frame Name
    license_id: string // reference to the Frame id of the associated license
    license_level: number // set to 0 to be available to all Pilots
    sp?: number
    description?: string // v-html
    effect?: string // v-html
    tags?: ITagData[] // tags related to the mod itself
    allowed_types?: WeaponType[] // weapon types the mod CAN be applied to
    allowed_sizes?: WeaponSize[] // weapon sizes the mod CAN be applied to
    restricted_types?: WeaponType[] // weapon types the mod CAN NOT be applied to
    restricted_sizes?: WeaponSize[] // weapon sizes the mod CAN NOT be applied to
    added_tags?: ITagData[] // tags propogated to the weapon the mod is installed on
    added_damage?: IDamageData[] // damage added to the weapon the mod is installed on, see note
    added_range?: IRangeData[] // damage added to the weapon the mod is installed on, see note
    actions?: IActionData[]
    bonuses?: IBonusData[] // these bonuses are applied to the pilot, not parent weapon
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
}
