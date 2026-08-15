import {InteractionReplyOptions} from "discord.js";

export interface ReplyOptionsFactory {
    create(term: string, replyPublic: boolean): InteractionReplyOptions
}
