import {
    ActivationType,
    IActionData,
    IBonusData,
    ICounterData,
    IDeployableData,
    ISynergyData,
    WeaponSize,
    WeaponType
} from "./shared-types";

export type Background = {
    id: string
    name: string
    description: string // v-html
}

export type Environment = {
    id: string
    name: string
    description: string // v-html"
}

export type InfoManifest = {
    name: string
    author: string
    description: string // v-html
    item_prefix?: string
    version: string
    image_url?: string // .jpg or .png preferred
    website?: string // url
}

export type Manufacturer = {
    id: string // see note below
    name: string
    logo: string // see note below
    logo_url?: string
    light: string // hex color code
    dark: string // hex color code
    quote: string // v-html
}

export type Reserve = {
    id: string
    name: string
    type: string //"Mech" | "Tactical" | "Resource" | "Bonus"
    label: string
    description?: string // v-html
    consumable?: boolean // defaults to false
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
}

export interface Sitrep {
    id: string
    name: string
    description: string // v-html
    pcVictory?: string // v-html
    enemyVictory?: string // v-html
    noVictory?: string // v-html
    deployment?: string // v-html
    objective?: string // v-html
    extraction?: string // v-html
}

export type Tables = {
    pilot_names: string[]
    pilot_callsigns: string[]
    mech_names: string[]
    quirks: string[]
}

export type Integrated = string

export type SpecialEquipment = {
    special_equipment: string[]
}

export type Reaction = {
    name: string
    activation: ActivationType // "Reaction"
    frequency: string // see below
    init?: string // v-html
    trigger: string // v-html
    detail: string // v-html
}

export type IAmmoData = {
    name: string
    description: string // v-html
    cost?: number
    allowed_types?: WeaponType[] // weapon types the ammo CAN be applied to
    allowed_sizes?: WeaponSize[] // weapon sizes the ammo CAN be applied to
    restricted_types?: WeaponType[] // weapon types the ammo CAN NOT be applied to
    restricted_sizes?: WeaponSize[] // weapon sizes the ammo CAN NOT be applied to
}
