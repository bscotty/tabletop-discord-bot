import {CacheType, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {BotCommand} from "./botCommand";

export class Speaker implements BotCommand {
    readonly name = "speak"
    readonly builder: SlashCommandBuilder = new SlashCommandBuilder()
        .addStringOption((option) => option
            .setName("what")
            .setDescription("what")
            .setRequired(true)
        )
        .setName(this.name)
        .setDescription("what")

    async respondTo(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        if (interaction.commandName == this.name) {
            try {
                const what = interaction.options.getString("what")
                interaction.reply(what)
                    .catch((it) => console.log(`error speaking ${it}`))
            } catch (e) {
                console.error(e)
            }
        } else {
            console.warn(`Got unknown command ${interaction.command.name}`)
        }
    }
}
