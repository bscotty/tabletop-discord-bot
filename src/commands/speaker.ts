import {Slash, SlashOption} from "discordx";
import {ApplicationCommandOptionType, CommandInteraction} from "discord.js";

export class Speaker {
    @Slash({name: "speak", description: "what to speak"})
    public async speak(
        @SlashOption({
            name: "what",
            description: "what",
            required: true,
            type: ApplicationCommandOptionType.String
        }) what: string,
        interaction: CommandInteraction
    ) {
        interaction.reply(what)
            .catch((it) => console.log(`error speaking ${it}`))
    }

    @Slash({name: "speak_optional", description: "what to speak"})
    public speakOptional(
        @SlashOption({
            name: "what",
            description: "what",
            required: false,
            type: ApplicationCommandOptionType.String
        }) what: string | undefined,
        interaction: CommandInteraction
    ) {
        const reply: string = what == undefined ? "You shouldn't let me do what I want." : what
        interaction.reply(reply)
            .catch((it) => console.log(`error speaking optional ${it}`))
    }
}
