import {
    ActivationType,
    IActionData,
    IBonusData,
    ICounterData,
    IDeployableData,
    ISynergyData,
    ITagData,
} from "./shared-types";

export type ICoreSystemData = {
    name: string
    active_name: string
    active_effect?: string // v-html
    activation: ActivationType
    description?: string // v-html
    deactivation?: ActivationType
    use?: string // "Round" | "Next Round" | "Scene" | "Encounter" | "Mission"
    active_actions?: IActionData[]
    active_bonuses?: IBonusData[]
    active_synergies?: ISynergyData[]
    passive_name?: string
    passive_effect?: string // v-html,
    passive_actions?: IActionData[]
    passive_bonuses?: IActionData[]
    passive_synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
    tags?: ITagData[]
}

export type SourcedCoreSystem = {
    source: string
}
