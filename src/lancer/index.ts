import {LancerCommand} from "./lancerCommand";
import {LancerFormatter} from "./lancerFormatter";
import SlashCommand from "../command/slashCommand";
import {getRepository} from "./format/repository";
import {Formatters} from "./format/formatters";
import {ReplyOptionsFactoryImpl} from "../reply/replyOptionsFactoryImpl";
import Searcher from "../searcher/searcher";
import {RichFrameFormatter} from "./format/rich-frame-formatter";

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