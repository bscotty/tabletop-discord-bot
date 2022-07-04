import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";
import {rollDice} from "../scripts/roller/dice-roller";

@Discord()
export class Roll {
    @Slash("roll", {description: "Roll some dice!"})
    public command(
        @SlashOption("roll", {description: "your roll"}) roll: string,
        interaction: CommandInteraction
    ) {
        try {
            const formattedResult = rollDice(roll)
            interaction.reply(formattedResult)
                .catch((it) => console.error(it))
        } catch (e) {
            console.log(e)
            interaction.reply(`I don't know how to roll **${roll}**...`)
                .catch((it) => console.error(it))
        }
    }
}
