export type IActionData = {
    name?: string
    activation?: ActivationType // metalmark flash grenade doesn't have an activation
    detail: string // v-html
    cost?: number
    pilot?: boolean
    synergy_locations?: string[]
    tech_attack?: boolean
    log?: string[]
    // reactions
    frequency?: string
    trigger?: string
}

export type IBonusData = {
    id: string
    val: string | string[] | number | boolean
    damage_types?: DamageType[]
    range_types?: RangeType[]
    weapon_types?: WeaponType[]
    weapon_sizes?: WeaponSize[]
    overwrite?: boolean
    replace?: boolean
}

export type ICounterData = {
    id: string
    name: string
    default_value?: number
    min?: number
    max?: number
}

export type IDeployableData = {
    name: string
    type: string // this is for UI furnishing only
    detail: string
    size?: number // not required for Mines
    activation?: ActivationType
    deactivation?: ActivationType
    recall?: ActivationType
    redeploy?: ActivationType
    instances?: number
    cost?: number
    armor?: number
    hp?: number | string // orochi drones are "5 + {grit}", kobold slag is string
    evasion?: number | string // kobold slag is string
    edef?: number | string // moi solomon's drone is string
    heatcap?: number
    repcap?: number
    sensor_range?: number
    tech_attack?: number
    save?: number
    speed?: number
    pilot?: boolean
    mech?: boolean
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    counters?: ICounterData[]
    tags?: ITagData[]
}

export type ISynergyData = {
    locations: string[] // see below,
    detail: string // v-html
    weapon_types?: WeaponType[]
    system_types?: SystemType[]
    weapon_sizes?: WeaponSize[]
}

export type ITagData = {
    id: string
    val?: string | number
}

export type SystemType = string // "AI" | "Deployable" | "Drone" | "Flight System" | "Shield" | "System" | "Tech"

export type MountType = string //"Main"| "Heavy"| "Aux/Aux"| "Aux"| "Main/Aux"| "Flex"| "Integrated"

export type ActivationType = string // "Free" | "Protocol" | "Quick" | "Full" | "Invade" | "Full Tech" | "Quick Tech" | "Reaction" | "Other"

export type WeaponType = string // "Rifle" | "Cannon" | "Launcher" | "CQB" | "Nexus" | "Melee"

export type WeaponSize = string // "Aux"| "Main"| "Heavy"| "Superheavy"

export type IDamageData = {
    type?: string
    val: string | number
    override?: boolean
}

export type IRangeData = {
    type: string
    val: string | number
    override?: boolean
}

export type DamageType = string // "kinectic" | "explosive" | "energy" | "burn" | "heat"

export type RangeType = string // "Threat" | "Range"

export type LabeledContent = {
    content_pack: string
}
