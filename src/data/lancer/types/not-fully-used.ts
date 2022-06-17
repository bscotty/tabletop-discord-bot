import {
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
    image_url?: string
    website?: string // url
}

export type Manufacturer = {
    id: string
    name: string
    logo: string
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
    consumable?: boolean
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
    callsigns: string[]
    mech_names: string[]
    team_names: string[]
    quirks: string[]
}

export type IAmmoData = {
    name: string
    description: string // v-html
    cost?: number
    allowed_types?: WeaponType[]
    allowed_sizes?: WeaponSize[]
    restricted_types?: WeaponType[]
    restricted_sizes?: WeaponSize[]
}
