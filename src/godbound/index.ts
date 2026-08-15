import SlashCommand from "../command/slashCommand";
import {getDictionary} from "./data/words/true-index";
import {GodboundCommand} from "./godboundCommand";
import {GodboundFormatter} from "./godboundFormatter";
import {ReplyOptionsFactoryImpl} from "../reply/replyOptionsFactoryImpl";
import Searcher from "../searcher/searcher";

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