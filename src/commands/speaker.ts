import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";
import {SpeechGenerator} from "../data/speaker/speech-generator";
import word_bank from "../data/speaker/word_bank.json"

@Discord()
export class Speaker {
    private speech_generator: SpeechGenerator

    private getSpeechGenerator(): SpeechGenerator {
        if (!this.speech_generator)
            this.speech_generator = new SpeechGenerator(word_bank, true)
        return this.speech_generator
    }

    @Slash("speak")
    public async speak(
        @SlashOption("what", {description: "what", required: false}) what: string | undefined,
        interaction: CommandInteraction
    ) {
        if (what == undefined) {
            const generated = this.getSpeechGenerator().generate()
            interaction.reply(generated)
                .catch((it) => console.log(`error speaking ${it}`))
        } else {
            interaction.reply(what)
                .catch((it) => console.log(`error speaking ${it}`))
        }
    }
}
