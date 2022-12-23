import {Lcp} from "../../../types/lcp";
import coreBonuses from "./core_bonuses.json"
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import manufacturers from "./manufacturers.json"
import mods from "./mods.json"
import systems from "./systems.json"
import weapons from "./weapons.json"

export function getKrfwCatalogLcp(): Lcp {
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
        mods,
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