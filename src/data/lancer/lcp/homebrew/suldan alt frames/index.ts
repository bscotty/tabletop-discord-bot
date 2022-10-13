import frames from "./frames.json"
import info from "./lcp_manifest.json"
import weapons from "./weapons.json"
import {Lcp} from "../../../types/lcp";

export function getSuldanAltFramesLCP(): Lcp {
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
        [],
        weapons
    )
}
