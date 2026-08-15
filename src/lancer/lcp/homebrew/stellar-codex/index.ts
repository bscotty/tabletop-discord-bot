import {Lcp} from "../../../types/lcp";
import coreBonuses from "./core_bonuses.json"
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import mods from "./mods.json"
import pilotGear from "./pilot_gear.json"
import systems from "./systems.json"
import tags from "./tags.json"
import weapons from "./weapons.json"

export function getStellarCodexLcp(): Lcp {
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
        mods,
        pilotGear,
        [],
        undefined,
        [],
        [],
        [],
        systems,
        undefined,
        tags,
        [],
        weapons
    )
}