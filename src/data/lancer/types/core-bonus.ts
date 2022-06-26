import {IActionData, IBonusData, ICounterData, IDeployableData, ISynergyData} from "./shared-types";

export type CoreBonus = {
    id: string
    name: string
    source: string // must be the same as the Manufacturer ID to sort correctly
    effect: string // v-html
    description: string // v-html
    mounted_effect?: string
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
}

export type TypedCoreBonus = CoreBonus & { kind: "Core Bonus" }
