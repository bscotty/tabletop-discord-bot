import {CommandInteraction} from "discord.js";
import {splitResponse} from "./split-response";

export async function safeReply(interaction: CommandInteraction, response: string) {
    if (response.length > 2000) {
        await splitReply(interaction, response)
    } else {
        await interaction.reply(response)
    }
}

async function splitReply(interaction: CommandInteraction, response: string) {
    const splitString = splitResponse(response)

    const requests = splitString.map(async (split, index) => {
        if (index == 0) {
            await interaction.reply({content: splitString[0]})
                .catch((it) => console.log(`there was a problem with split ${index} of ${splitString.length}: ${it}`))
        } else {
            await interaction.channel.send(split)
                .catch((it) => console.log(`there was a problem with split ${index} of ${splitString.length}: ${it}`))
        }
    })
    await Promise.all(requests)
}