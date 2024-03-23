import {Lcp} from "../../types/lcp";
import frames from "./frames.json"
import info from "./lcp_manifest.json"
import reserves from "./reserves.json"
import systems from "./systems.json"
import talents from "./talents.json"
import weapons from "./weapons.json"
import environments from "./environments.json"

export function getSolsticeRainData(): Lcp {
    return new Lcp(
        [],
        [],
        [],
        [],
        environments,
        [],
        frames,
        [],
        info,
        [],
        [],
        [],
        reserves,
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