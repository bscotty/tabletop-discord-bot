import {
    IActionData,
    IBonusData,
    ICounterData,
    IDeployableData,
    ISynergyData,
    ITagData,
    SystemType
} from "./shared-types";

export type System = {
    id: string
    name: string
    source: string // must be the same as the Manufacturer ID to sort correctly
    license: string // reference to the Frame name of the associated license
    license_id: string // reference to the Frame id of the associated license
    license_level: number // set to zero for this item to be available to a LL0 character
    effect?: string // v-html
    type?: SystemType
    sp?: number
    description?: string// v-html
    tags?: ITagData[]
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
}
