import {IconAbility} from "../data/icon-ability";
import {formatArea, IconArea} from "../data/icon-area";
import {formatBonusEffect, IconBonusEffect} from "../data/icon-bonus-effect";
import {formatTalent, IconTalent} from "../data/icon-talent";
import {IconAttack} from "../data/icon-attack";
import {formatMastery, IconMasteryTalent} from "../data/icon-mastery-talent";
import {formatNameDescription, IconNameDescription} from "../data/icon-name-description";

export class SearchableAbility {
    public readonly name: string
    public readonly job: string
    public readonly chapter: number
    public readonly action: string
    public readonly area?: IconArea[]
    public readonly attack?: IconAttack
    public readonly tags?: string[]
    public readonly description: string
    public readonly effects: IconBonusEffect[]
    public readonly combo?: IconNameDescription
    public readonly talents: IconTalent[]
    public readonly mastery: IconMasteryTalent
    public readonly data_type = "ability"

    constructor(ability: IconAbility) {
        this.name = ability.name
        this.job = ability.job
        this.chapter = ability.chapter
        this.action = ability.action
        this.area = ability.area
        this.attack = ability.attack
        this.tags = ability.tags
        this.description = ability.description
        this.effects = ability.effects
        this.combo = ability.combo
        this.talents = ability.talents
        this.mastery = ability.mastery
    }

    public toFormattedString(): string {
        let attackTagFlag = ""
        if (this.tags.find((it) => it == "Attack")) {
            attackTagFlag = ", Attack"
        }
        let areaFlag = ""
        if (this.area) {
            areaFlag = ", " + this.area.map((it) => formatArea(it)).join(", ")
        }
        let tagsFlag = ""
        if (this.tags) {
            tagsFlag = "\n" + this.tags.filter((it) => it != "Attack").join("\n")
        }
        let attackBlockFlag = ""
        if (this.attack) {
            let attackEffectFlag = ""
            if (this.attack.effect) {
                attackEffectFlag = ` *Effect*: ${this.attack.effect}.`
            }
            attackBlockFlag = `\n**Attack:** *On Hit*${this.attack.on_hit}. *Miss*: ${this.attack.on_miss}.${attackEffectFlag}`
        }
        let comboFlag = ""
        if (this.combo) {
            comboFlag = "\n**Combo**: " + formatNameDescription(this.combo, true)
        }
        return `**${this.name}** (Chapter ${this.chapter} ${this.job} Ability)\n` +
            `${this.action}${attackTagFlag}${areaFlag}${tagsFlag}\n\n` +
            `${this.description}${attackBlockFlag}\n` + this.effects.map((it) => formatBonusEffect(it)).join("\n") + "\n" +
            comboFlag +
            `**Talents**:\n` + this.talents.map((it) => formatTalent(it)).join("\n") + "\n" + formatMastery(this.mastery)
    }
}