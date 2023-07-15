import {Lcp} from "../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
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
        [],
        [],
        undefined,
        [],
        [],
        [],
        [],
        undefined,
        [],
        talents,
        weapons
    )
}