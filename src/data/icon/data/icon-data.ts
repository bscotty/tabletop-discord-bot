import {IconGlossary} from "./icon-glossary";
import {IconClass} from "./icon-class";
import {IconJob} from "./icon-job";
import {IconAbility} from "./icon-ability";
import {SearchableGlossary} from "../searchable/searchable-glossary";
import {SearchableClass} from "../searchable/searchable-class";
import {SearchableJob} from "../searchable/searchable-job";
import {SearchableAbility} from "../searchable/searchable-ability";
import {SearchableLimitBreak} from "../searchable/searchable-limit-break";
import {IconLimitBreak} from "./icon-limit-break";

export class IconData {
    public readonly glossary: SearchableGlossary[]
    public readonly classes: SearchableClass[]
    public readonly jobs: SearchableJob[]
    public readonly abilities: SearchableAbility[]
    public readonly limitBreaks: SearchableLimitBreak[]

    constructor(
        glossary: IconGlossary[],
        classes: IconClass[],
        jobs: IconJob[],
        abilities: IconAbility[],
        limitBreaks: IconLimitBreak[]
    ) {
        this.glossary = glossary.map((it) => new SearchableGlossary(it))
        this.classes = classes.map((it) => new SearchableClass(it))
        this.jobs = jobs.map((it) => new SearchableJob(it))
        this.abilities = abilities.map((it) => new SearchableAbility(it))
        this.limitBreaks = limitBreaks.map((it) => new SearchableLimitBreak(it))
    }
}