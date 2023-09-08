import {IconBonusEffect} from "../data/icon-bonus-effect";
import {IconAttack} from "../data/icon-attack";
import {formatInfusion, IconInfusion} from "../data/icon-infusion";
import {formatMastery, IconMasteryTalent} from "../data/icon-mastery-talent";
import {IconLimitBreak} from "../data/icon-limit-break";
import {iconSharedFormat} from "../data/icon-shared-format";

export class SearchableLimitBreak {
    public readonly name: string
    public readonly job: string
    public readonly resolve: number
    public readonly action: string
    public readonly tags?: string[]
    public readonly description: string
    public readonly effects: (IconBonusEffect | IconAttack)[]
    public readonly infusion?: IconInfusion
    public readonly ultimate: IconMasteryTalent
    public readonly data_type = "limit_break"

    public constructor(limitBreak: IconLimitBreak) {
        this.name = limitBreak.name
        this.job = limitBreak.job
        this.resolve = limitBreak.resolve
        this.action = limitBreak.action
        this.tags = limitBreak.tags
        this.description = limitBreak.description
        this.effects = limitBreak.effects
        this.infusion = limitBreak.infusion
        this.ultimate = limitBreak.ultimate
    }

    public toFormattedString(): string {
        let infusion = ""
        if (this.infusion) {
            infusion = formatInfusion(this.infusion)
        }
        const formatParts = [
            `**${this.name}** - (${this.job} Limit Break)`,
            ...iconSharedFormat(this),
            infusion,
            formatMastery(this.ultimate)
        ]

        return formatParts.filter((it) => it != "").join("\n")
    }
}