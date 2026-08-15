import SlashCommand from "../../slashCommand";
import Searcher from "../../../data/searcher";
import {GodboundCommand} from "./godboundCommand";
import {GodboundFormatter} from "./godboundFormatter";
import {ReplyOptionsFactoryImpl} from "../../../reply/replyOptionsFactoryImpl";
import {getDictionary} from "../../../data/godbound/words/true-index";

export default function godboundCommandCreator(): SlashCommand {
    const dictionary = getDictionary()

    return new GodboundCommand(
        new ReplyOptionsFactoryImpl(
            new Searcher(
                [
                    ...dictionary.words,
                    ...dictionary.gifts,
                    ...dictionary.invocations
                ],
                ["name"]
            ),
            new GodboundFormatter()
        )
    )
}