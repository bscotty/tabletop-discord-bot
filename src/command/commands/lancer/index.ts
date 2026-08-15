import {LancerCommand} from "./lancerCommand";
import {LancerFormatter} from "./lancerFormatter";
import SlashCommand from "../../slashCommand";
import {getRepository} from "../../../data/lancer/format/repository";
import {Formatters} from "../../../data/lancer/format/formatters";
import {ReplyOptionsFactoryImpl} from "../../../reply/replyOptionsFactoryImpl";
import Searcher from "../../../data/searcher";
import {RichFrameFormatter} from "../../../data/lancer/format/rich-frame-formatter";

export default function lancerCommandCreator(): SlashCommand {
    const repository = getRepository()
    const formatters = new Formatters(repository)
    return new LancerCommand(
        new ReplyOptionsFactoryImpl(
            new Searcher(
                repository.data.map((it) => it.getAll()).flat(),
                [
                    "name",
                    "alt_names",
                    "active_name",
                    "passive_name"
                ]
            ),
            new LancerFormatter(formatters, new RichFrameFormatter(repository, formatters))
        )
    )
}