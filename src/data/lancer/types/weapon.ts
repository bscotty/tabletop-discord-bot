import {
    IActionData,
    IBonusData,
    ICounterData,
    IDamageData,
    IDeployableData,
    IRangeData,
    ISynergyData,
    ITagData,
    MountType,
    WeaponType
} from "./shared-types";

export type Weapon = {
    id: string
    name: string
    source?: string // integrated weapons don't have source
    license?: string // integrated weapons don't have license
    license_id?: string // reference to the Frame id of the associated license
    license_level?: number // integrated weapons don't have license level
    mount: MountType
    type: WeaponType
    cost?: number
    barrage?: boolean
    skirmish?: boolean
    no_attack?: boolean
    no_mods?: boolean
    no_core_bonus?: boolean
    damage?: IDamageData[]
    range?: IRangeData[]
    tags?: ITagData[]
    sp?: number
    description?: string // integrated weapons do not have a description // v-html
    effect?: string // v-html
    on_attack?: string // v-html
    on_hit?: string // v-html
    on_crit?: string // v-html
    actions?: IActionData[]
    bonuses?: IBonusData[]
    no_bonus?: boolean
    synergies?: ISynergyData[]
    no_synergy?: boolean
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
    profiles?: IWeaponProfile[] //see note below
}

export type TypedWeapon = Weapon & { kind: "Weapon" }

export type IWeaponProfile = {
    name: string
    effect?: string
    skirmish?: boolean
    barrage?: boolean
    cost?: number
    on_attack?: string
    on_hit?: string
    on_crit?: string
    damage?: IDamageData[]
    range?: IRangeData[]
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    tags?: ITagData[]
    integrated?: string[]
    special_equipment?: string[]
}
