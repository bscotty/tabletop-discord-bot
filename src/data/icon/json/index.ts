import {IconData} from "../data/icon-data";
import glossary from "./icon_glossary.json"
import classes from "./icon_classes.json"
import jobs from "./icon_jobs.json"
import {iconAbilities} from "./abilities";
import limit_breaks from "./limit_break.json"

export function getIcon1point5Data(): IconData {
    return new IconData(
        glossary,
        classes,
        jobs,
        iconAbilities(),
        limit_breaks
    )
}