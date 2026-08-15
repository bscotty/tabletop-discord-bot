import SlashCommand from "../../slashCommand";
import {getIcon1point5Data} from "../../../data/icon/json";
import Searcher from "../../../data/searcher";
import {IconCommand} from "./iconCommand";
import {IconFormatter} from "./iconFormatter";
import {ReplyOptionsFactoryImpl} from "../../../reply/replyOptionsFactoryImpl";

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