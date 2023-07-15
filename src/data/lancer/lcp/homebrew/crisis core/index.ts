import {Lcp} from "../../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import systems from "./systems.json"
import tags from "./tags.json"
import weapons from "./weapons.json"

export function getCrisisCoreLcp(): Lcp {
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
        tags,
        [],
        weapons
    )
}