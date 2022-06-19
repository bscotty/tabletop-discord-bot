import actions from "./actions.json"
import background from "./backgrounds.json"
import coreBonuses from "./core_bonuses.json"
import environments from "./environments.json"
import factions from "./factions.json"
import frames from "./frames.json"
import glossary from "./glossary.json"
import info from "./info.json"
import manufacturers from "./manufacturers.json"
import mods from "./mods.json"
import pilot_gear from "./pilot_gear.json"
import reserves from "./reserves.json"
import rules from "./rules.json"
import sitreps from "./sitreps.json"
import skills from "./skills.json"
import statuses from "./statuses.json"
import systems from "./systems.json"
import tables from "./tables.json"
import tags from "./tags.json"
import talents from "./talents.json"
import weapons from "./weapons.json"
import {Lcp} from "../../types/lcp";

export function getCoreLcp(): Lcp {
    return new Lcp(
        actions,
        background,
        [],
        coreBonuses,
        environments,
        factions,
        frames,
        glossary,
        info,
        manufacturers,
        mods,
        pilot_gear,
        reserves,
        rules,
        sitreps,
        skills,
        statuses,
        systems,
        tables,
        tags,
        talents,
        weapons
    )
}
