import {IconJob} from "../data/icon-job";
import {formatTrait, IconTrait} from "../data/icon-trait";
import {formatSummons, IconSummons} from "../data/icon-summon";

export class SearchableJob {
    public readonly name: string
    public readonly title: string
    public readonly class: string
    public readonly description: string
    public readonly traits: IconTrait[]
    public readonly limit_break: string
    public readonly abilities: string[]
    public readonly summons?: IconSummons
    public readonly data_type = "job"

    public constructor(job: IconJob) {
        this.name = job.name
        this.title = job.title
        this.class = job.class
        this.description = job.description
        this.traits = job.traits
        this.limit_break = job.limit_break
        this.abilities = job.abilities
        this.summons = job.summons
    }

    public toFormattedString(): string {
        let summons = ""
        if (this.summons) {
            summons = formatSummons(this.summons)
        }

        const formatParts = [
            `**${this.name}** (${this.class}) - ${this.title}\n`,
            "Job Traits",
            ...this.traits.map((it) => "* " + formatTrait(it)),
            `**Limit Break**: ${this.limit_break}`,
            `**Abilities**: ${this.abilities.join(", ")}`,
            summons
        ]

        return formatParts.filter((it) => it != "").join("\n")
    }
}