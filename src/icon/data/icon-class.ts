import {IconTrait} from "./icon-trait";
import {IconSpecialMechanic} from "./icon-special-mechanic";

export type IconClass = {
    name: string
    title: string
    strengths: string
    weaknesses: string
    complexity: string
    description: string
    vit: number
    defense: number
    speed: number
    fray_damage: number
    damage_die: string
    basic_attack_range: number
    traits: IconTrait[]
    special_mechanic: IconSpecialMechanic
}
