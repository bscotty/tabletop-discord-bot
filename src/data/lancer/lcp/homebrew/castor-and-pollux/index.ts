import actions from "./actions.json"
import coreBonuses from "./core_bonuses.json"
import frames from "./frames.json"
import info from "./info.json"
import manufacturers from "./manufacturers.json"
import mods from "./mods.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"
import {Lcp} from "../../../types/lcp";

export function getCastorAndPolluxLcp(): Lcp {
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
        [],
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