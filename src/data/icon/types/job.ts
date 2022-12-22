import {IconTrait} from "./trait";

export type IconJob = {
    id: string
    class: string
    name: string
    title: string
    description: string
    traits: IconTrait[]
    abilities: string[]
    limit_breaks: string[]
}

export type TypedIconJob = IconJob & {
    type: string
}