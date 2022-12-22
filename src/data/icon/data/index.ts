import {IconPackage} from "../types/package";
import abilities from "./abilities.json"
import classes from "./class.json"
import jobs from "./jobs.json"
import limitBreak from "./limit_break.json"

export function iconCorePackage(): IconPackage {
    return new IconPackage(
        abilities,
        classes,
        jobs,
        limitBreak
    )
}