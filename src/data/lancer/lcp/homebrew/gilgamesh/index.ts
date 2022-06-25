import {Lcp} from "../../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import systems from "./systems.json"
import weapons from "./weapons.json"

export function getGilgameshLcp(): Lcp {
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
        [],
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