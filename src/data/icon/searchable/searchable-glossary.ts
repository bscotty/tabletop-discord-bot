import {IconGlossary} from "../data/icon-glossary";

export class SearchableGlossary {
    public readonly name: string
    public readonly description: string
    public readonly type?: string
    public readonly data_type = "glossary"

    public constructor(glossary: IconGlossary) {
        this.name = glossary.name
        this.description = glossary.description
    }

    public toFormattedString(): string {
        let typeSuffix: string
        if (this.type) {
            typeSuffix = ` (${this.type})`
        } else {
            typeSuffix = ""
        }
        return `**${this.name}**${typeSuffix}\n${this.description}`
    }
}