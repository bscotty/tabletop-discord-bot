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
    skills?: string[]
}

export type Environment = {
    id: string
    name: string
    description: string // v-html"
}

export type Manufacturer = {
    id: string
    name: string
    logo?: string // all homebrewed manufacturers don't have a manufacturer logo
    logo_url?: string
    light: string // hex color code
    dark: string // hex color code
    quote?: string // ironleaf foundry's manufacturer doesn't have a quote // v-html
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
