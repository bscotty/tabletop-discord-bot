import {IconSearchable, isAbility, isClass, isJob, isLimitBreak} from "./types/searchable";
import {IconAbility, TypedIconAbility} from "./types/ability";
import {IconClass, TypedIconClass} from "./types/class";
import {IconJob, TypedIconJob} from "./types/job";
import {TypedIconLimitBreak} from "./types/limit_break";
import {IconTrait} from "./types/trait";
import {IconSubAbility} from "./types/sub_ability";
import {IconAttack} from "./types/attack";

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
        } else {
            throw Error(`This is impossible - item is not valid: ${searchable}`)
        }
    }

    private formatAbility(ability: TypedIconAbility): string {
        let range = ""
        if (ability.range) {
            range = ability.range
        }

        const tags = [range, ...ability.tags].join(", ")

        const description =
            `**${ability.name}** (Chapter ${ability.chapter} *${this.lookupJobName(ability.job)}* Ability)\n` +
            `${ability.action}\n${range}${tags}\n\n*${ability.description}*\n`

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

        const effect = `\n**Effect:** ${ability.effect}`

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
            special = `\n**${ability.special.name}:** ${ability.special.description}`
        }

        let combo = ""
        if (ability.combo) {
            combo = `\n**Combo: ${ability.combo.name}** - ${ability.combo.description}`
        }

        const talents = "\n**Talents**\n" + ability.talents.map((it) => {
            if (it.rank < 3) {
                return `${it.rank}. ${it.description}`
            } else {
                return `MASTERY: ${it.description}`
            }
        }).join("\n")

        let abilities = ""
        if (ability.abilities) {
            abilities = "\n" + ability.abilities.map((it) => {
                return this.formatSubAbility(it)
            }).join("\n")
        }

        return `${description}${attack}${area}${trigger}${effect}${charge}${refresh}${special}${combo}${talents}${abilities}`
    }

    private formatClass(clazz: TypedIconClass): string {
        const description = `**${clazz.name}**\n*${clazz.title}*\n**Strengths:** ${clazz.strengths}` +
            `\n**Weaknesses:** ${clazz.weaknesses}\n**Complexity:** ${clazz.complexity}\n\n*${clazz.description}*\n`

        const stats = `*VIT:* ${clazz.vit}\n*HP:* ${clazz.hp}\n*DEF:* ${clazz.defense}\n` +
            `*SPEED:* ${clazz.speed}\n*Fray Damage:* ${clazz.fray_damage}\n*Damage Die:* ${clazz.damage_die}\n`

        const traits = clazz.traits.map((it) => this.formatTrait(it))

        const special = clazz.special.map((it) => this.formatTrait(it))

        return `${description}\n**Statistics**\n${stats}\n**Traits**\n${traits.join("\n")}` +
            `\n**Special Mechanics**\n${special.join("\n")}`
    }

    private formatJob(job: TypedIconJob): string {
        const description = `**${job.name}** - ${this.lookupClassName(job.class)}\n` +
            `*${job.title}*\n\n*${job.description}*\n`
        const traits = job.traits.map((it) => this.formatTrait(it))
        const abilities = job.abilities.map((it) => this.lookupAbilityName(it))
        return `${description}\n**Traits**\n${traits.join("\n")}\n**Abilities**\n${abilities.join(", ")}`
    }

    private formatLimitBreak(limitBreak: TypedIconLimitBreak): string {
        let range = ""
        if (limitBreak.range) {
            range = `${limitBreak.range}`
        }
        const tags = [range, ...limitBreak.tags].join(", ")

        const description = `**${limitBreak.name}** - (Chapter ${limitBreak.chapter} ` +
            `${this.lookupJobName(limitBreak.job)} Limit Break)\n${limitBreak.resolve} Resolve, ${limitBreak.action}` +
            `${tags}\n*${limitBreak.description}*\n`

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

        let special = ""
        if (limitBreak.special) {
            special = `\n**${limitBreak.special.name}:** ${limitBreak.special.description}`
        }

        const talents = "\n**Talent**\n" + limitBreak.talents.map((it) => {
            if (it.rank < 3) {
                return `${it.rank}. ${it.description}`
            } else {
                return `MASTERY: ${it.description}`
            }
        }).join("\n")

        let abilities = ""
        if (limitBreak.abilities) {
            abilities = "\n" + limitBreak.abilities.map((it) => {
                return this.formatSubAbility(it)
            }).join("\n")
        }

        return `${description}${attack}${area}${trigger}${effect}${charge}${special}${talents}${abilities}`
    }

    private formatTrait(trait: IconTrait): string {
        let chapterPrefix = ""
        if (trait.chapter && trait.chapter == 3) {
            chapterPrefix = `(Chapter 3 Trait) `
        }
        return `• *${trait.name}* ${chapterPrefix}- ${trait.description}`
    }

    private formatSubAbility(subAbility: IconSubAbility): string {
        let range = ""
        if (subAbility.range) {
            range = `${subAbility.range}, `
        }
        const tags = subAbility.tags.join(", ")
        const description = `**${subAbility.name}**\n${subAbility.action}\n${range}${tags}\n${subAbility.description}`

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
            special = `\n**${subAbility.special.name}:** ${subAbility.special.description}`
        }

        return `${description}${attack}${area}${trigger}${effect}${charge}${special}`
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

    private lookupJobName(id: string): string {
        const job = this.jobs.find(job => job.id == id)
        if (job) {
            return job.name
        } else {
            console.error(`Cannot find job with id ${id}`)
            return ""
        }
    }

    private lookupClassName(id: string): string {
        const clazz = this.classes.find(clazz => clazz.id == id)
        if (clazz) {
            return clazz.name
        } else {
            console.error(`Cannot find class with id ${id}`)
            return ""
        }
    }

    private lookupAbilityName(id: string): string {
        const ability = this.abilities.find(ability => ability.id == id)
        if (ability) {
            return ability.name
        } else {
            console.error(`Cannot find ability with id ${id}`)
            return ""
        }
    }
}