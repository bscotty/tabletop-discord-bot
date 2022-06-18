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
    source: string
    license: string
    license_id?: string
    license_level: number
    sp?: number
    description?: string // v-html
    effect?: string // v-html
    tags?: ITagData[]
    allowed_types?: WeaponType[]
    allowed_sizes?: WeaponSize[]
    restricted_types?: WeaponType[]
    restricted_sizes?: WeaponSize[]
    added_tags?: ITagData[]
    added_damage?: IDamageData[]
    added_range?: IRangeData[]
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
}
