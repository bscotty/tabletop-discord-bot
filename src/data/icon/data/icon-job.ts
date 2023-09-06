import {IconTrait} from "./icon-trait";

export type IconJob = {
    name: string
    title: string
    class: string
    description: string
    traits: IconTrait[]
    limit_break: string
    abilities: string[]
}
