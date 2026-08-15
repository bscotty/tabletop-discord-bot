import {IconClass} from "../data/icon-class";
import {formatTrait, IconTrait} from "../data/icon-trait";
import {formatSpecialMechanic, IconSpecialMechanic} from "../data/icon-special-mechanic";

export class SearchableClass {
    public readonly name: string
    public readonly title: string

    public readonly strengths: string
    public readonly weaknesses: string
    public readonly complexity: string
    public readonly description: string
    public readonly vit: number
    public readonly defense: number
    public readonly speed: number
    public readonly fray_damage: number
    public readonly damage_die: string
    public readonly basic_attack_range: number
    public readonly traits: IconTrait[]
    public readonly special_mechanic: IconSpecialMechanic
    public readonly data_type = "class"

    public constructor(clazz: IconClass) {
        this.name = clazz.name
        this.title = clazz.title
        this.strengths = clazz.strengths
        this.weaknesses = clazz.weaknesses
        this.complexity = clazz.complexity
        this.description = clazz.description
        this.vit = clazz.vit
        this.defense = clazz.defense
        this.speed = clazz.speed
        this.fray_damage = clazz.fray_damage
        this.damage_die = clazz.damage_die
        this.basic_attack_range = clazz.basic_attack_range
        this.traits = clazz.traits
        this.special_mechanic = clazz.special_mechanic
    }

    public toFormattedString(): string {
        return `**${this.name}** - ${this.title}\n\n` +
            `Strengths: ${this.strengths}\nWeaknesses: ${this.weaknesses}\nComplexity: ${this.complexity}\n\n` +
            `Class Statistics\nVIT: ${this.vit}, HP: ${this.vit * 4}, DEF: ${this.defense}, Speed: ${this.speed} (Dash ${this.speed / 2})` +
            `Fray damage: ${this.fray_damage}, Damage die: ${this.damage_die}, Basic Attack: Range ${this.basic_attack_range}\n` +
            `Class Traits\n` + this.traits.map((it) => `* ${formatTrait(it)}`).join("\n") + "\n" +
            formatSpecialMechanic(this.special_mechanic)
    }
}