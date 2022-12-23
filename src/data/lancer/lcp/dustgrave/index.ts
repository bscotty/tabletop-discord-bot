import coreBonuses from "./core_bonuses.json"
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import pilot_gear from "./pilot_gear.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"
import {Lcp} from "../../types/lcp";

export function getDustgraveLcp(): Lcp {
    return new Lcp(
        [],
        [],
        [],
        coreBonuses,
        [],
        [],
        frames,
        [],
        info,
        [],
        [],
        pilot_gear,
        [],
        undefined,
        [],
        [],
        [],
        systems,
        undefined,
        [],
        talents,
        weapons
    )
}