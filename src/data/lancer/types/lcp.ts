import {Background, Environment, Manufacturer, Reserve, Sitrep} from "./not-fully-used";
import {CoreBonus} from "./core-bonus";
import {Frame} from "./frame";
import {Action} from "./action";
import {Mod} from "./mod";
import {PilotArmor, PilotGear, PilotWeapon} from "./pilot";
import {SkillTrigger} from "./skill";
import {StatusCondition} from "./status";
import {System} from "./system";
import {Tag} from "./tag";
import {Weapon} from "./weapon";
import {Talent} from "./talent";

export class Lcp {
    actions: Action[]
    background: Background[]
    coreBonuses: CoreBonus[]
    environments: Environment[]
    factions: any
    frames: Frame[]
    glossary: any
    info: any
    manufacturers: Manufacturer[]
    mods: Mod[]
    pilot_gear: PilotArmor[] | PilotGear[] | PilotWeapon[]
    reserves: Reserve[]
    rules: any
    sitreps: Sitrep[]
    skills: SkillTrigger[]
    statuses: StatusCondition[]
    systems: System[]
    tables: any
    tags: Tag[]
    talents: Talent[]
    weapons: Weapon[]

    constructor(
        actions: Action[],
        background: Background[],
        coreBonuses: CoreBonus[],
        environments: Environment[],
        factions: any,
        frames: Frame[],
        glossary: any,
        info: any,
        manufacturers: Manufacturer[],
        mods: Mod[],
        pilot_gear: PilotArmor[] | PilotGear[] | PilotWeapon[],
        reserves: Reserve[],
        rules: any,
        sitreps: Sitrep[],
        skills: SkillTrigger[],
        statuses: StatusCondition[],
        systems: System[],
        tables: any,
        tags: Tag[],
        talents: Talent[],
        weapons: Weapon[]) {

        this.actions = actions
        this.background = background
        this.coreBonuses = coreBonuses
        this.environments = environments
        this.factions = factions
        this.frames = frames
        this.glossary = glossary
        this.info = info
        this.manufacturers = manufacturers
        this.mods = mods
        this.pilot_gear = pilot_gear
        this.reserves = reserves
        this.rules = rules
        this.sitreps = sitreps
        this.skills = skills
        this.statuses = statuses
        this.systems = systems
        this.tables = tables
        this.tags = tags
        this.talents = talents
        this.weapons = weapons
    }
}
