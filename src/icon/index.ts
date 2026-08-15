import SlashCommand from "../command/slashCommand";
import {getIcon1point5Data} from "./json";
import Searcher from "../searcher/searcher";
import {IconCommand} from "./iconCommand";
import {IconFormatter} from "./iconFormatter";
import {ReplyOptionsFactoryImpl} from "../reply/replyOptionsFactoryImpl";

export default function iconCommandCreator(): SlashCommand {
    return new IconCommand(
        new ReplyOptionsFactoryImpl(
            new Searcher(
                getIcon1point5Data().getAll(),
                ["name"]
            ),
            new IconFormatter()
        )
    )
}