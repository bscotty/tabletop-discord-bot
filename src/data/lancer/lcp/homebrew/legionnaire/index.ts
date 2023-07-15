import {Lcp} from "../../../types/lcp";
import backgrounds from "./backgrounds.json"
import info from "./lcp_manifest.json"
import pilot_gear from "./pilot_gear.json"
import systems from "./systems.json"
import weapons from "./weapons.json"

export function getLegionnaireLcp(): Lcp {
    return new Lcp(
        [],
        backgrounds,
        [],
        [],
        [],
        [],
        [],
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
        [],
        weapons
    )
}