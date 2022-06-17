import {Lcp} from "../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import statuses from "./statuses.json"
import systems from "./systems.json"
import tags from "./tags.json"
import talents from "./talents.json"
import weapons from "./weapons.json"

export function getKtbLcp(): Lcp {
    return new Lcp(
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
        statuses,
        systems,
        undefined,
        tags,
        talents,
        weapons
    )
}