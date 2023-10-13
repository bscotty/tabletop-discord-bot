import {Lcp} from "../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import pilot_gear from "./pilot_gear.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"

export function getSsmrPart1Lcp(): Lcp {
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