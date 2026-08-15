import {Lcp} from "../../../types/lcp";
import info from "./lcp_manifest.json"
import pilotGear from "./pilot_gear.json"
import bonds from "./bonds.json"
import reserves from "./reserves.json"

export function getDoveUnitDeltaLcp(): Lcp {
    return new Lcp(
        [],
        [],
        bonds,
        [],
        [],
        [],
        [],
        [],
        info,
        [],
        [],
        pilotGear,
        reserves,
        undefined,
        [],
        [],
        [],
        [],
        undefined,
        [],
        [],
        []
    )
}