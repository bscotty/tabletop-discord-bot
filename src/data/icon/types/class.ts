import {IconTrait} from "./trait";

export type IconClass = {
    id: string
    name: string
    title: string
    strengths: string
    weaknesses: string
    complexity: string
    description: string
    traits: IconTrait[]
    vit: number
    hp: number
    defense: number
    speed: number
    dash: number
    fray_damage: number
    damage_die: string
    special: IconTrait[]
}

export type TypedIconClass = IconClass & {
    type: string
}