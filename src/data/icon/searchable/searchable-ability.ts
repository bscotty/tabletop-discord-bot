import {IconAbility} from "../data/icon-ability";
import {IconArea} from "../data/icon-area";
import {IconBonusEffect} from "../data/icon-bonus-effect";
import {formatTalent, IconTalent} from "../data/icon-talent";
import {IconAttack} from "../data/icon-attack";
import {formatMastery, IconMasteryTalent} from "../data/icon-mastery-talent";
import {formatCombo, IconCombo} from "../data/icon-combo";
import {iconSharedFormat} from "../data/icon-shared-format";
import {formatInfusion, IconInfusion} from "../data/icon-infusion";

export class SearchableAbility {
    public readonly name: string
    public readonly job: string
    public readonly chapter: number
    public readonly action: string
    public readonly area?: IconArea[]
    public readonly tags?: string[]
    public readonly description: string
    public readonly effects: (IconBonusEffect | IconAttack)[]
    public readonly combo?: IconCombo
    public readonly infusion?: IconInfusion
    public readonly talents: IconTalent[]
    public readonly mastery: IconMasteryTalent
    public readonly data_type = "ability"

    constructor(ability: IconAbility) {
        this.name = ability.name
        this.job = ability.job
        this.chapter = ability.chapter
        this.action = ability.action
        this.area = ability.area
        this.tags = ability.tags
        this.description = ability.description
        this.effects = ability.effects
        this.combo = ability.combo
        this.infusion = ability.infusion
        this.talents = ability.talents
        this.mastery = ability.mastery
    }

    public toFormattedString(): string {
        function formatComboOrEmpty(optionalCombo?: IconCombo): string {
            let combo = ""
            if (optionalCombo) {
                combo = "\n" + formatCombo(optionalCombo)
            }
            return combo
        }

        function formatInfusionOrEmpty(optionalInfusion?: IconInfusion) {
            let infusion = ""
            if (optionalInfusion) {
                infusion = formatInfusion(optionalInfusion)
            }
            return infusion
        }

        const formattedParts = [
            `**${this.name}** (Chapter ${this.chapter} ${this.job} Ability)`,
            iconSharedFormat(this, true),
            formatComboOrEmpty(this.combo),
            formatInfusionOrEmpty(this.infusion),
            `**Talents**:`,
            ...this.talents.map((it) => formatTalent(it)),
            formatMastery(this.mastery)
        ]

        return formattedParts.filter((it) => it != "").join("\n")
    }
}