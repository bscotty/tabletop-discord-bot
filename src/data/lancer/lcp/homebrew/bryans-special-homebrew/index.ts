import {Lcp} from "../../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import mods from "./mods.json"
import systems from "./systems.json"
import weapons from "./weapons.json"

export function getBryansSpecialHomebrewLcp(): Lcp {
    return new Lcp(
        [],
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
        [],
        weapons
    )
}