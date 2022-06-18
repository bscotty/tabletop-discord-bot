import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";

@Discord()
export class Speaker {
    @Slash("speak")
    public async speak(
        @SlashOption("what", {description: "what"}) what: string,
        interaction: CommandInteraction
    ) {
        interaction.reply(what)
            .then(() => interaction.reply(what + "2"))
        new Promise(resolve => setTimeout(resolve, 1))
    }

    @Slash("speak_optional")
    public speakOptional(
        @SlashOption("what", {description: "what", required: false}) what: string | undefined,
        interaction: CommandInteraction
    ) {
        const reply: string = what == undefined ? "You shouldn't let me do what I want." : what
        interaction.reply(reply)
    }
}
