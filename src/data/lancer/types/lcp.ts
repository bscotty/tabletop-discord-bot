import {Background, Environment, Manufacturer, Reserve, Sitrep, Tables} from "./not-fully-used";
import {CoreBonus} from "./core-bonus";
import {Frame} from "./frame";
import {Action} from "./action";
import {Mod} from "./mod";
import {PilotItem} from "./pilot";
import {SkillTrigger} from "./skill";
import {StatusCondition} from "./status";
import {System} from "./system";
import {Tag} from "./tag";
import {Weapon} from "./weapon";
import {Talent} from "./talent";
import {Rules} from "./rules";
import {GlossaryItem} from "./glossary";
import {InfoManifest} from "./info";
import {Bond} from "./bonds";

export default class Lcp {
    constructor(
        public readonly actions: Action[],
        public readonly background: Background[],
        public readonly bonds: Bond[],
        public readonly coreBonuses: CoreBonus[],
        public readonly environments: Environment[],
        public readonly factions: unknown[],
        public readonly frames: Frame[],
        public readonly glossary: GlossaryItem[],
        public readonly info: InfoManifest,
        public readonly manufacturers: Manufacturer[],
        public readonly mods: Mod[],
        public readonly pilot_gear: PilotItem[],
        public readonly reserves: Reserve[],
        public readonly rules: Rules | undefined,
        public readonly sitreps: Sitrep[],
        public readonly skills: SkillTrigger[],
        public readonly statuses: StatusCondition[],
        public readonly systems: System[],
        public readonly tables: Tables | undefined,
        public readonly tags: Tag[],
        public readonly talents: Talent[],
        public readonly weapons: Weapon[]) {
    }
}
