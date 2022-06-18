import {Lcp} from "../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import pilotGear from "./pilot_gear.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"

export function getWallflowerLcp(): Lcp {
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
        pilotGear,
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