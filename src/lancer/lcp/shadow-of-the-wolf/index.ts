import {Lcp} from "../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import background from "./backgrounds.json"
import pilot_gear from "./pilot_gear.json"
import systems from "./systems.json"
import bonds from "./bonds.json"

export function getShadowOfTheWolfLcp(): Lcp {
    return new Lcp(
        [],
        background,
        bonds,
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
        [],
        []
    )
}