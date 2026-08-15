import {AttachmentBuilder, EmbedBuilder, InteractionReplyOptions} from "discord.js";
import {ReplyOptionsFactory} from "./replyOptionsFactory";
import Searcher from "../searcher/searcher";
import {DisplayResponse} from "../lancer/format/display-response";
import Formatter from "../formatter";

export class ReplyOptionsFactoryImpl<T> implements ReplyOptionsFactory {
    constructor(
        private readonly searcher: Searcher<T>,
        private readonly formatter: Formatter<T>
    ) {
    }

    create(term: string, replyPublic: boolean): InteractionReplyOptions {
        const data = this.searcher.search(term)
        if (data === undefined) {
            return this.formatUndefinedData(term, replyPublic)
        } else {
            const formattedData = this.formatter.format(data)
            if (typeof formattedData === "string") {
                return this.formatMarkdownString(formattedData, replyPublic)
            } else {
                return this.formatDisplayResponse(formattedData, replyPublic)
            }
        }
    }

    private formatUndefinedData(term: string, replyPublic: boolean): InteractionReplyOptions {
        return {
            content: `I can't find anything for "${term}", sorry!`,
            ephemeral: !replyPublic
        }
    }

    private formatMarkdownString(markdown: string, replyPublic: boolean): InteractionReplyOptions {
        return {
            embeds: [
                new EmbedBuilder()
                    .setDescription(markdown)
            ],
            ephemeral: !replyPublic
        }
    }

    private formatDisplayResponse(displayResponse: DisplayResponse, replyPublic: boolean): InteractionReplyOptions {
        return {
            embeds: [
                new EmbedBuilder()
                    .setColor(displayResponse.color ? `#${displayResponse.color}` : null)
                    .setAuthor({name: displayResponse.authorName, iconURL: displayResponse.authorIconUrl})
                    .setThumbnail(displayResponse.thumbnailUrl)
                    .setDescription(displayResponse.description)
                    .setFields(displayResponse.fields.map((it) => ({
                        name: it.name,
                        value: it.description,
                        inline: it.inline
                    })))
            ],
            files: displayResponse.localAssetFilePaths.map((it) => new AttachmentBuilder(it)),
            ephemeral: !replyPublic
        }
    }
}
