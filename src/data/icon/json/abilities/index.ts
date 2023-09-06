import {IconAbility} from "../../data/icon-ability";
import bastion from "./bastion.json"
import demon_slayer from "./demon_slayer.json"
import colossus from "./colossus.json"
import knave from "./knave.json"

export function abilities(): IconAbility[] {
    return [
        ...bastion,
        ...demon_slayer,
        ...colossus,
        ...knave
    ]
}