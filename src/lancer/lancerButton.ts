import {ReplyOptionsFactory} from "../reply/replyOptionsFactory";
import {BaseInteraction, InteractionReplyOptions} from "discord.js";

export class LancerButton {
    constructor(
        private readonly replyOptionsFactory: ReplyOptionsFactory
    ) {
    }

    async respond(interaction: BaseInteraction) {
        if (interaction.isButton()) {
            const split = interaction.customId.split("-")
            const term = split[0]
            const state = split[1]
            const replyPublic = !interaction.ephemeral
            const options: Omit<InteractionReplyOptions, 'flags'> = await this.replyOptionsFactory.create(term, replyPublic, state)
            await interaction.update(options)
                .catch((e) => console.error(`lancer button error`, e))
            console.log(`Responded to lancer button ${interaction.customId}`)
        } else {
            console.error(`Got unexpected interaction type ${interaction}`)
        }
    }
}
