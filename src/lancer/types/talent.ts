import {IActionData, IBonusData, ICounterData, IDeployableData, ISynergyData} from "./shared-types";

export type Talent = {
    id: string
    name: string
    description: string // v-html
    ranks: IRankData[]
    icon?: string
    icon_url?: string
    terse?: string // terse text used in short descriptions. The fewer characters the better
}

export type IRankData = {
    name: string
    description: string // v-html
    exclusive?: boolean // see below
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
}
