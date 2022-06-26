export type StatusCondition = {
    name: string
    icon_url?: string
    type: string //"Status" | "Condition"
    effects: string // v-html
    terse?: string // prefer fewest characters
    exclusive?: string // "Mech" | "Pilot"
}

export type TypedStatus = StatusCondition & { kind: "Status" }
