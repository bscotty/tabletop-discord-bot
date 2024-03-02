import Searcher from "../data/searcher";
import {
    ActionRowBuilder,
    AttachmentBuilder,
    ButtonBuilder,
    ChatInputCommandInteraction,
    EmbedBuilder,
    InteractionReplyOptions,
    InteractionResponse,
    SlashCommandBuilder
} from "discord.js";
import {safeReply} from "./util/safe-reply";
import {BotCommand} from "./botCommand";
import {DisplayResponse, ResponseButton} from "../data/lancer/format/display-response";

const TERM_OPTION_NAME = "term"
const PUBLIC_OPTION_NAME = "public"

export abstract class SearchCommand<T> implements BotCommand {
    readonly name: string
    readonly builder: SlashCommandBuilder

    protected constructor(name: string, description: string) {
        this.name = name
        this.builder = new SlashCommandBuilder()
            .addStringOption((option) => option
                .setName(TERM_OPTION_NAME)
                .setDescription("What do I search for?")
                .setRequired(true)
            )
            .addBooleanOption((option) => option
                .setName(PUBLIC_OPTION_NAME)
                .setDescription("Should I display the term to everyone?")
                .setRequired(false)
            )
            .setName(name)
            .setDescription(description)
    }

    protected abstract searcher: Searcher<T>

    protected abstract format(item: T): string

    protected shouldRichlyFormat(item: T): boolean {
        return false
    }

    protected richFormat(item: T): DisplayResponse {
        throw Error("Not yet implemented")
    }

    async respondTo(interaction: ChatInputCommandInteraction) {
        if (interaction.commandName == this.name) {
            try {
                const term = interaction.options.getString(TERM_OPTION_NAME)
                const publicResponse: boolean | null = interaction.options.getBoolean(PUBLIC_OPTION_NAME, false)
                await this.doCommand(interaction, term, publicResponse)
            } catch (e) {
                console.error(e)
            }
        } else {
            console.warn(`Got unknown command ${interaction.command.name}`)
        }
    }

    private async doCommand(interaction: ChatInputCommandInteraction, term: string, publicResponse: boolean | null) {
        console.debug(`${this.name} - got term: ${term}`)
        const result = this.searcher.search(term)

        let replySecret: boolean
        if (publicResponse == null) {
            replySecret = false
        } else {
            replySecret = !publicResponse
        }

        if (result == undefined) {
            interaction.reply({
                content: `I can't find anything for the term "${term}", sorry!`,
                ephemeral: replySecret
            }).catch((it) => console.error(it))
        } else {
            if (this.shouldRichlyFormat(result)) {
                const displayResponse = this.richFormat(result)
                const buttons = displayResponse.buttons

                const replyOptions: InteractionReplyOptions = {
                    embeds: [this.embedFrom(displayResponse)],
                    files: this.filesFrom(displayResponse),
                    components: this.componentsFrom(buttons)
                }

                const response = await interaction.reply(replyOptions)
                if (buttons.length > 0) {
                    try {
                        await this.listenForResponse(interaction, displayResponse, response)
                    } catch (e) {
                        console.error(`there was an error listening to display of ${displayResponse.authorName} `, e)
                    }
                }
            } else {
                safeReply(interaction, this.format(result), replySecret)
                    .catch((it) => console.error(it))
            }
        }
    }

    private embedFrom(displayResponse: DisplayResponse): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(displayResponse.color ? `#${displayResponse.color}` : null)
            .setAuthor({name: displayResponse.authorName, iconURL: displayResponse.authorIconUrl})
            .setThumbnail(displayResponse.thumbnailUrl)
            .setDescription(displayResponse.description)
            .setFields(displayResponse.fields.map((it) => ({
                name: it.name,
                value: it.description,
                inline: it.inline
            })))
    }

    private componentsFrom(buttons: ResponseButton[]): ActionRowBuilder<ButtonBuilder>[] | null {
        if (buttons.length == 0) {
            return null
        }

        const builders = buttons.map((it) =>
            new ButtonBuilder()
                .setCustomId(it.id)
                .setLabel(it.name)
                .setStyle(it.style)
                .setDisabled(!it.enabled)
        )
        const row = new ActionRowBuilder<ButtonBuilder>()
        row.setComponents(builders)
        return [row]
    }

    private filesFrom(displayResponse: DisplayResponse): AttachmentBuilder[] {
        return displayResponse.localAssetFilePaths.map((it) => new AttachmentBuilder(it))
    }

    private async listenForResponse(
        originalInteraction: ChatInputCommandInteraction,
        displayResponse: DisplayResponse,
        response: InteractionResponse
    ) {
        try {
            await this.doListenForInteraction(originalInteraction, displayResponse, response)
        } catch (e) {
            await this.cancelResponseListening(originalInteraction, displayResponse)
        }
    }

    private async doListenForInteraction(
        originalInteraction: ChatInputCommandInteraction,
        displayResponse: DisplayResponse,
        response: InteractionResponse
    ) {
        const confirmation = await response.awaitMessageComponent({
            filter: i => i.user.id == originalInteraction.user.id,
            time: 60_000
        })
        const button = displayResponse.buttons.find((it) => it.id == confirmation.customId)

        if (!button) {
            await this.cancelResponseListening(originalInteraction, displayResponse)
            return
        }

        const unchangedFields = displayResponse.fields.filter((existingField) => {
            const found = button.updatedFields.find((buttonField) => existingField.name == buttonField.name)
            return !found;
        })
        const newFields = unchangedFields.concat(...button.updatedFields)

        const newButtons: ResponseButton[] = displayResponse.buttons.map((it) =>
            ({id: it.id, name: it.name, style: it.style, enabled: it.id != button.id, updatedFields: it.updatedFields})
        )

        const newDisplayResponse: DisplayResponse = {
            color: displayResponse.color,
            authorName: displayResponse.authorName,
            authorIconUrl: displayResponse.authorIconUrl,
            thumbnailUrl: displayResponse.thumbnailUrl,
            description: displayResponse.description,
            localAssetFilePaths: displayResponse.localAssetFilePaths,
            fields: newFields,
            buttons: newButtons
        }

        const newResponse = await confirmation.update({
            embeds: [this.embedFrom(newDisplayResponse)],
            files: this.filesFrom(newDisplayResponse),
            components: this.componentsFrom(newDisplayResponse.buttons)
        })
        await this.listenForResponse(originalInteraction, newDisplayResponse, newResponse)
    }

    //private async cancelResponseListening(confirmation: MessageComponentInteraction, displayResponse: DisplayResponse) {
    private async cancelResponseListening(interaction: ChatInputCommandInteraction, displayResponse: DisplayResponse) {
        const cancelledDisplayResponse: DisplayResponse = {
            color: displayResponse.color,
            authorName: displayResponse.authorName,
            authorIconUrl: displayResponse.authorIconUrl,
            thumbnailUrl: displayResponse.thumbnailUrl,
            description: displayResponse.description,
            localAssetFilePaths: displayResponse.localAssetFilePaths,
            fields: displayResponse.fields,
            buttons: displayResponse.buttons.map((it) => ({...it, enabled: false}))
        }

        await interaction.editReply({
            embeds: [this.embedFrom(cancelledDisplayResponse)],
            files: this.filesFrom(cancelledDisplayResponse),
            components: this.componentsFrom(cancelledDisplayResponse.buttons)
        })
    }
}