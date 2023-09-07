import {IconAbility} from "../../data/icon-ability";
import bastion from "./bastion.json"
import demon_slayer from "./demon_slayer.json"
import colossus from "./colossus.json"
import knave from "./knave.json"
import fool from "./fool.json"
import freelancer from "./freelancer.json"
import shade from "./shade.json"
import warden from "./warden.json"
import chanter from "./chanter.json"
import harvester from "./harvester.json"
import sealer from "./sealer.json"
import seer from "./seer.json"

export function abilities(): IconAbility[] {
    return [
        ...bastion,
        ...demon_slayer,
        ...colossus,
        ...knave,
        ...fool,
        ...freelancer,
        ...shade,
        ...warden,
        ...chanter,
        ...harvester,
        ...sealer,
        ...seer
    ]
}