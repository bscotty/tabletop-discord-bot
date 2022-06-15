import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";

@Discord()
export class Speaker {
    @Slash("speak")
    public speak(
        @SlashOption("what", {description: "what"}) what: string,
        interaction: CommandInteraction
    ) {
        interaction.reply(what)
            .catch((error) => console.error(error))
    }
}
