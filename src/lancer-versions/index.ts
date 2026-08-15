import SlashCommand from "../command/slashCommand";
import getRepository from "../lancer/repository";
import {LancerVersionsCommand} from "./lancerVersionsCommand";

export default function lancerVersionsCommandCreator(): SlashCommand {
    const repository = getRepository()
    return new LancerVersionsCommand(repository)
}
