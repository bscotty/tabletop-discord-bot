import {Lcp} from "../../../types/lcp";
import coreBonuses from "./core_bonuses.json"
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import manufacturers from "./manufacturers.json"
import systems from "./systems.json"
import weapons from "./weapons.json"

export function getIronleafFoundryLcp(): Lcp {
    return new Lcp(
        [],
        [],
        [],
        coreBonuses,
        [],
        [],
        frames,
        [],
        info,
        manufacturers,
        [],
        [],
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