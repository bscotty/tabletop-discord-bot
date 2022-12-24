import {IconSearchable, isAbility, isClass, isGlossaryEntry, isJob, isLimitBreak} from "./types/searchable";
import {IconAbility, TypedIconAbility} from "./types/ability";
import {IconClass, TypedIconClass} from "./types/class";
import {IconJob, TypedIconJob} from "./types/job";
import {TypedIconLimitBreak} from "./types/limit_break";
import {IconTrait} from "./types/trait";
import {IconSubAbility} from "./types/sub_ability";
import {IconAttack} from "./types/attack";
import {IconSummon} from "./types/summon";
import {IconCombo} from "./types/combo";
import {IconInfusion} from "./types/infuse";
import {IconTalent} from "./types/talent";
import {IconSpecialMechanic} from "./types/special";
import {IconGlossaryEntry} from "./types/glossary_entry";

export class IconFormatter {
    constructor(
        private readonly abilities: IconAbility[],
        private readonly classes: IconClass[],
        private readonly jobs: IconJob[]
    ) {
    }

    public formatIcon(searchable: IconSearchable): string {
        if (isAbility(searchable)) {
            return this.formatAbility(searchable)
        } else if (isClass(searchable)) {
            return this.formatClass(searchable)
        } else if (isJob(searchable)) {
            return this.formatJob(searchable)
        } else if (isLimitBreak(searchable)) {
            return this.formatLimitBreak(searchable)
        } else if (isGlossaryEntry(searchable)) {
            return this.formatGlossaryEntry(searchable)
        } else {
            throw Error(`This is impossible - item is not valid: ${searchable}`)
        }
    }

    private formatAbility(ability: TypedIconAbility): string {
        const tags = this.formatRangeAndTags(ability.range, ability.tags)

        const description =
            `**${ability.name}** (Chapter ${ability.chapter} *${this.lookupJobName(ability.job)}* Ability)\n` +
            `${ability.action}${tags}\n\n*${ability.description}*\n`

        let attack = ""
        if (ability.attack) {
            attack = "\n" + this.formatAttack(ability.attack)
        }

        let area = ""
        if (ability.area) {
            area = `\n**Area Effect:** ${ability.area}`
        }

        let trigger = ""
        if (ability.trigger) {
            trigger = `\n**Trigger:** ${ability.trigger}`
        }

        let effect = ""
        if (ability.effect) {
            effect = `\n**Effect:** ${ability.effect}`
        }

        let charge = ""
        if (ability.charge) {
            charge = `\n**Charge:** ${ability.charge}`
        }

        let refresh = ""
        if (ability.refresh) {
            refresh = `\n**Refresh:** ${ability.refresh}`
        }

        let special = ""
        if (ability.special) {
            special = "\n" + this.formatSpecial(ability.special)
        }

        let combo = ""
        if (ability.combo) {
            combo = "\n" + this.formatCombo(ability.combo)
        }

        let summon = ""
        if (ability.summon) {
            summon = this.formatSummon(ability.summon)
        }

        let infusion = ""
        if (ability.infusion) {
            infusion = "\n" + this.formatInfusion(ability.infusion)
        }

        const talents = "\n\n**Talents**\n" + ability.talents.map((it) => this.formatTalent(it)).join("\n")

        let abilities = ""
        if (ability.abilities) {
            abilities = "\n" + ability.abilities.map((it) => this.formatSubAbility(it)).join("\n")
        }

        return `${description}${attack}${area}${trigger}${effect}${charge}${refresh}${special}${combo}${summon}${infusion}${talents}${abilities}`
    }

    private formatClass(clazz: TypedIconClass): string {
        const description = `**${clazz.name}**\n*${clazz.title}*\n\n**Strengths:** ${clazz.strengths}` +
            `\n**Weaknesses:** ${clazz.weaknesses}\n**Complexity:** ${clazz.complexity}`

        const stats = `\n\n**Statistics**\nVIT: **${clazz.vit}**\tHP: **${clazz.hp}**` +
            `\tDefense: **${clazz.defense}**\tSpeed: **${clazz.speed}** (Dash: **${clazz.dash}**)` +
            `\nFray Damage: **${clazz.fray_damage}**\tDamage Die: **${clazz.damage_die}**`

        const traits = "\n\n**Traits**\n" + (clazz.traits.map((it) => this.formatTrait(it))).join("\n")

        const special = "\n\n**Special Mechanics**\n" + (clazz.special.map((it) => "• " + this.formatSpecial(it))).join("\n")

        return `${description}${stats}${traits}${special}`
    }

    private formatJob(job: TypedIconJob): string {
        const description = `**${job.name}** - ${this.lookupClassName(job.class)}\n*${job.title}*`
        const traits = "\n\n**Traits**\n" + (job.traits.map((it) => this.formatTrait(it))).join("\n")
        const abilities = "\n\n**Abilities**\n" + (job.abilities.map((it) => this.lookupAbilityName(it))).join(", ")
        return `${description}${traits}${abilities}`
    }

    private formatLimitBreak(limitBreak: TypedIconLimitBreak): string {
        const tags = this.formatRangeAndTags(limitBreak.range, limitBreak.tags)

        const description = `**${limitBreak.name}** - *${this.lookupJobName(limitBreak.job)}* Limit Break` +
            `\n${limitBreak.resolve} Resolve\n${limitBreak.action}${tags}\n\n*${limitBreak.description}*\n`

        let attack = ""
        if (limitBreak.attack) {
            attack = "\n" + this.formatAttack(limitBreak.attack)
        }

        let area = ""
        if (limitBreak.area) {
            area = `\n**Area Effect:** ${limitBreak.area}`
        }

        let trigger = ""
        if (limitBreak.trigger) {
            trigger = `\n**Trigger:** ${limitBreak.trigger}`
        }

        const effect = `\n**Effect:** ${limitBreak.effect}`

        let charge = ""
        if (limitBreak.charge) {
            charge = `\n**Charge:** ${limitBreak.charge}`
        }

        let refresh = ""
        if (limitBreak.refresh) {
            refresh = `\n**Refresh:** ${limitBreak.refresh}`
        }

        let special = ""
        if (limitBreak.special) {
            special = "\n" + this.formatSpecial(limitBreak.special)
        }

        let infusion = ""
        if (limitBreak.infusion) {
            infusion = "\n" + this.formatInfusion(limitBreak.infusion)
        }

        const talents = "\n\n**Talent**\n" + limitBreak.talents.map((it) => this.formatTalent(it)).join("\n")

        let abilities = ""
        if (limitBreak.abilities) {
            abilities = "\n" + limitBreak.abilities.map((it) => this.formatSubAbility(it)).join("\n")
        }

        return `${description}${attack}${area}${trigger}${effect}${charge}${refresh}${special}${infusion}${talents}${abilities}`
    }

    private formatGlossaryEntry(glossaryEntry: IconGlossaryEntry): string {
        let formattedGlossaryEntry = `**${glossaryEntry.name}**`
        if (glossaryEntry.category) {
            formattedGlossaryEntry += ` (${glossaryEntry.category})`
        }
        formattedGlossaryEntry += `\n${glossaryEntry.description}`
        return formattedGlossaryEntry
    }

    private formatTrait(trait: IconTrait): string {
        let chapterPrefix = ""
        if (trait.chapter && trait.chapter == 3) {
            chapterPrefix = `(Chapter 3) `
        }
        let summon = ""
        if (trait.summon) {
            summon = this.formatSummon(trait.summon)
        }
        return `• *${trait.name}* ${chapterPrefix}- ${trait.description}${summon}`
    }

    private formatSubAbility(subAbility: IconSubAbility): string {
        const tags = this.formatRangeAndTags(subAbility.range, subAbility.tags)
        let description = `**${subAbility.name}**\n${subAbility.action}${tags}`

        if (subAbility.description) {
            description += `\n\n*${subAbility.description}*\n`
        }

        let attack = ""
        if (subAbility.attack) {
            attack = "\n" + this.formatAttack(subAbility.attack)
        }

        let area = ""
        if (subAbility.area) {
            area = `\n**Area Effect:** ${subAbility.area}`
        }

        let trigger = ""
        if (subAbility.trigger) {
            trigger = `\n**Trigger:** ${subAbility.trigger}`
        }

        const effect = `\n**Effect:** ${subAbility.effect}`

        let charge = ""
        if (subAbility.charge) {
            charge = `\n**Charge:** ${subAbility.charge}`
        }

        let special = ""
        if (subAbility.special) {
            special = "\n" + this.formatSpecial(subAbility.special)
        }

        return `${description}${attack}${area}${trigger}${effect}${charge}${special}`
    }

    private formatTalent(talent: IconTalent): string {
        let formattedTalent: string
        if (typeof talent.rank === "number" && talent.rank < 3) {
            formattedTalent = `${talent.rank}. ${talent.description}`
        } else {
            let formattedResolve = ""
            if (talent.resolve) {
                formattedResolve = `\n${talent.resolve} Resolve`
            }
            formattedTalent = `MASTERY: ${talent.rank}${formattedResolve}\n${talent.description}`
        }
        if (talent.infusion) {
            formattedTalent += "\n" + this.formatInfusion(talent.infusion)
        }
        if (talent.combo) {
            formattedTalent += "\n" + this.formatCombo(talent.combo)
        }
        if (talent.summon) {
            formattedTalent += "\n" + this.formatSummon(talent.summon)
        }
        return formattedTalent
    }

    private formatAttack(attack: IconAttack): string {
        let formattedAttack = `**Attack:** `
        if (attack.miss) {
            formattedAttack += `*On Hit:* ${attack.hit}. *Miss:* ${attack.miss}.`
        } else {
            formattedAttack += `*Autohit:* ${attack.hit}.`
        }
        if (attack.crit) {
            formattedAttack += ` *On Crit:* ${attack.crit}`
        }
        if (attack.effect) {
            formattedAttack += ` *Effect:* ${attack.effect}`
        }
        return formattedAttack
    }

    private formatSpecial(special: IconSpecialMechanic): string {
        return `**${special.name}:** ${special.description}`
    }

    private formatSummon(summon: IconSummon): string {
        const summonName = `\n> **Summon: ${summon.name}**`
        const summonSize = `\n> Size ${summon.size}`

        let tags: string[] = []
        if (summon.tags) {
            tags = summon.tags
        }
        const summonTags = [summonSize, ...tags].join(", ")

        const summonEffect = `\n> *Summon Effect:* ${summon.effect}`

        let summonAction = ""
        if (summon.action) {
            summonAction = `\n> *Summon Action:* ${summon.action}`
        }
        return `${summonName}${summonTags}${summonEffect}${summonAction}`
    }

    private formatCombo(combo: IconCombo): string {
        let formattedCombo = `\n**Combo: ${combo.name}**`

        formattedCombo += this.formatRangeAndTags(combo.range, combo.tags)

        if (combo.trigger) {
            formattedCombo += `\n**Trigger:** ${combo.trigger}`
        }

        formattedCombo += `\n**Effect:** ${combo.effect}`

        if (combo.attack) {
            formattedCombo += "\n" + this.formatAttack(combo.attack)
        }
        if (combo.area) {
            formattedCombo += `\n**Area Effect:** ${combo.area}`
        }
        return formattedCombo
    }

    private formatInfusion(infusion: IconInfusion): string {
        let formattedInfusion = `**Infuse ${infusion.cost}: ${infusion.name}**`
        if (infusion.resolve) {
            formattedInfusion += `\n${infusion.resolve} resolve`
        }
        if (infusion.range) {
            formattedInfusion += `\n${infusion.range}`
        }
        if (infusion.attack) {
            formattedInfusion += "\n" + this.formatAttack(infusion.attack)
        }
        if (infusion.area) {
            formattedInfusion += `\n**Area Effect:** ${infusion.area}`
        }
        if (infusion.effect) {
            formattedInfusion += `\n**Effect:** ${infusion.effect}`
        }
        return formattedInfusion
    }

    private formatRangeAndTags(range: string, tags: string[]): string {
        let formattedRange = ""
        if (range) {
            formattedRange = range
        }

        let formattedTags = ""
        if (tags) {
            formattedTags = tags.join(", ")
        }

        let prefix = ""
        if (formattedRange.length > 0 || formattedTags.length > 0) {
            prefix = "\n"
        }

        let infix = ""
        if (formattedRange.length > 0 && formattedTags.length > 0) {
            infix = ", "
        }

        return `${prefix}${formattedRange}${infix}${formattedTags}`
    }

    private lookupJobName(id: string): string {
        const job = this.jobs.find(job => job.id == id)
        if (job) {
            return job.name
        } else {
            console.error(`Cannot find job with id ${id}`)
            return `{Unknown_Id: ${id}}`
        }
    }

    private lookupClassName(id: string): string {
        const clazz = this.classes.find(clazz => clazz.id == id)
        if (clazz) {
            return clazz.name
        } else {
            console.error(`Cannot find class with id ${id}`)
            return `{Unknown_Id: ${id}}`
        }
    }

    private lookupAbilityName(id: string): string {
        const ability = this.abilities.find(ability => ability.id == id)
        if (ability) {
            return ability.name
        } else {
            console.error(`Cannot find ability with id ${id}`)
            return `{Unknown_Id: ${id}}`
        }
    }
}