import coreBonuses from "./core_bonuses.json"
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import pilot_gear from "./pilot_gear.json"
import reserves from "./reserves.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"
import environments from "./environments.json"
import {Lcp} from "../../types/lcp";

export function getDustgraveLcp(): Lcp {
    return new Lcp(
        [],
        [],
        [],
        coreBonuses,
        environments,
        [],
        frames,
        [],
        info,
        [],
        [],
        pilot_gear,
        reserves,
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
