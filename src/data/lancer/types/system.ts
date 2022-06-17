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
    license?: string // exotics don't have a license
    license_id?: string // only core has license ids
    license_level?: number // exotics don't have a license
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
