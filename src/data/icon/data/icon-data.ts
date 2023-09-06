import {IconGlossary} from "./icon-glossary";
import {IconClass} from "./icon-class";
import {IconJob} from "./icon-job";
import {IconAbility} from "./icon-ability";
import {SearchableGlossary} from "../searchable/searchable-glossary";
import {SearchableClass} from "../searchable/searchable-class";
import {SearchableJob} from "../searchable/searchable-job";
import {SearchableAbility} from "../searchable/searchable-ability";

export class IconData {
    public glossary: SearchableGlossary[]
    public classes: SearchableClass[]
    public jobs: SearchableJob[]
    public abilities: SearchableAbility[]

    constructor(
        glossary: IconGlossary[],
        classes: IconClass[],
        jobs: IconJob[],
        abilities: IconAbility[]
    ) {
        this.glossary = glossary.map((it) => new SearchableGlossary(it))
        this.classes = classes.map((it) => new SearchableClass(it))
        this.jobs = jobs.map((it) => new SearchableJob(it))
        this.abilities = abilities.map((it) => new SearchableAbility(it))
    }
}