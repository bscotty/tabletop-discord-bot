import {IconAbility, TypedIconAbility} from "./ability";
import {IconClass, TypedIconClass} from "./class";
import {IconJob, TypedIconJob} from "./job";
import {IconLimitBreak, TypedIconLimitBreak} from "./limit_break";

export class IconPackage {
    readonly abilities: TypedIconAbility[]
    readonly classes: TypedIconClass[]
    readonly jobs: TypedIconJob[]
    readonly limitBreaks: TypedIconLimitBreak[]

    constructor(
        abilities: IconAbility[],
        classes: IconClass[],
        jobs: IconJob[],
        limitBreaks: IconLimitBreak[]
    ) {
        this.abilities = abilities.map((it) => {
            return {...it, type: "icon_ability"}
        })
        this.classes = classes.map((it) => {
            return {...it, type: "icon_class"}
        })
        this.jobs = jobs.map((it) => {
            return {...it, type: "icon_job"}
        })
        this.limitBreaks = limitBreaks.map((it) => {
            return {...it, type: "icon_limit_break"}
        })
    }
}