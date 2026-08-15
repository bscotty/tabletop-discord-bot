import {Lcp} from "../../types/lcp";
import actions from "./actions.json"
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import mods from "./mods.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"

export function getLongRimLcp(): Lcp {
    return new Lcp(
        actions,
        [],
        [],
        [],
        [],
        [],
        frames,
        [],
        info,
        [],
        mods,
        [],
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