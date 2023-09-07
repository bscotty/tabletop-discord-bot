import {IconAbility} from "../../data/icon-ability";
import bastion from "./bastion.json"
import demon_slayer from "./demon_slayer.json"
import colossus from "./colossus.json"
import knave from "./knave.json"
import fool from "./fool.json"
import freelancer from "./freelancer.json"
import shade from "./shade.json"
import warden from "./warden.json"

export function abilities(): IconAbility[] {
    return [
        ...bastion,
        ...demon_slayer,
        ...colossus,
        ...knave,
        ...fool,
        ...freelancer,
        ...shade,
        ...warden
    ]
}