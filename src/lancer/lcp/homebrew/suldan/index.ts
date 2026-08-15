import {Lcp} from "../../../types/lcp";
import actions from "./actions.json"
import coreBonuses from "./core_bonuses.json"
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import manufacturers from "./manufacturers.json"
import mods from "./mods.json"
import pilotGear from "./pilot_gear.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"

export function getSuldanLcp(): Lcp {
    return new Lcp(
        actions,
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
        pilotGear,
        [],
        undefined,
        [],
        [],
        [],
        systems,
        undefined,
        [],
        talents,
        weapons
    )
}