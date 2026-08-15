import SlashCommand from "../command/slashCommand";
import {getRepository} from "../lancer/format/repository";
import {LancerVersionsCommand} from "./lancerVersionsCommand";

export default function lancerVersionsCommandCreator(): SlashCommand {
    const repository = getRepository()
    return new LancerVersionsCommand(repository)
}
