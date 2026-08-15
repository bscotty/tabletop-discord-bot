import SlashCommand from "../../slashCommand";
import {getRepository} from "../../../data/lancer/format/repository";
import {LancerVersionsCommand} from "./lancerVersionsCommand";

export default function lancerVersionsCommandCreator(): SlashCommand {
    const repository = getRepository()
    return new LancerVersionsCommand(repository)
}
