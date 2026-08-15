import {ActivationType} from "./shared-types";

export type Action = {
    id: string
    name: string
    detail: string // v-html
    activation: ActivationType
    terse?: string // terse text used in the action menu. The fewer characters the better.
    pilot?: boolean
    mech?: boolean
    synergy_locations?: string[]
    confirm?: string[]
    log?: string
    ignore_used?: boolean
    heat_cost?: boolean
}
