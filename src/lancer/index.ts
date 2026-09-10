import {LancerCommand} from "./lancerCommand";
import {LancerFormatter} from "./format/lancerFormatter";
import SlashCommand from "../command/slashCommand";
import getRepository from "./repository";
import {Formatters} from "./format/formatters";
import {ReplyOptionsFactoryImpl} from "../reply/replyOptionsFactoryImpl";
import Searcher from "../searcher/searcher";
import {RichFrameFormatter} from "./format/formatters/rich-frame-formatter";
import {RichTalentFormatter} from "./format/formatters/rich-talent-formatter";
import TurndownService from "turndown";
import {LancerButton} from "./lancerButton";

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
            new LancerFormatter(
                formatters,
                new RichFrameFormatter(repository, formatters),
                new RichTalentFormatter(new TurndownService())
            )
        )
    )
}

export function lancerButtonCreator(): LancerButton {
    const repository = getRepository()
    const formatters = new Formatters(repository)
    return new LancerButton(
        new ReplyOptionsFactoryImpl(
            new Searcher(
                repository.data.map((it) => it.getAll()).flat(),
                ["id"]
            ),
            new LancerFormatter(
                formatters,
                new RichFrameFormatter(repository, formatters),
                new RichTalentFormatter(new TurndownService())
            )
        )
    )
}