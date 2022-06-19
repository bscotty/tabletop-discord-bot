import {Lcp} from "../../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import manufacturers from "./manufacturers.json"
import pilotGear from "./pilot_gear.json"
import systems from "./systems.json"
import tags from "./tags.json"

export function getStolenCrownLcp(): Lcp {
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
        manufacturers,
        [],
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
        []
    )
}