import {IconJob} from "../data/icon-job";
import {formatTrait, IconTrait} from "../data/icon-trait";

export class SearchableJob {
    public readonly name: string
    public readonly title: string
    public readonly class: string
    public readonly description: string
    public readonly traits: IconTrait[]
    public readonly limit_break: string
    public readonly abilities: string[]
    public readonly data_type = "job"

    public constructor(job: IconJob) {
        this.name = job.name
        this.title = job.title
        this.class = job.class
        this.description = job.description
        this.traits = job.traits
        this.limit_break = job.limit_break
        this.abilities = job.abilities
    }

    public toFormattedString(): string {
        return `**${this.name}** (${this.class}) - ${this.title}\n\n` +
            `Job Traits\n` + this.traits.map((it) => `* ${formatTrait(it)}`).join("\n") + "\n" +
            `Limit Break: ${this.limit_break}\n` +
            `Abilities: ${this.abilities.join(", ")}`
    }
}