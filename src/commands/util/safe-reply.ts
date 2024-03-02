import {CommandInteraction} from "discord.js";
import {splitResponse} from "./split-response";

export async function safeReply(interaction: CommandInteraction, response: string, replySecret: boolean) {
    if (response.length > 2000) {
        console.log(`This response is too long! I'll split it up!`)
        await splitReply(interaction, response)
    } else {
        await interaction.reply({content: response, ephemeral: replySecret, embeds: []})
    }
}

async function splitReply(interaction: CommandInteraction, response: string) {
    const splitString = splitResponse(response)
    await sendNextSplit(interaction, splitString, 0)
}

async function sendNextSplit(interaction: CommandInteraction, splitResponse: string[], index: number) {
    if (splitResponse.length <  index) {
        return
    }
    const currentResponse = splitResponse[index]
    if (index == 0) {
        await interaction.reply({content : currentResponse})
            .catch((it) => console.log(`there was a problem with split ${index} of ${splitResponse.length}: ${it}`))
    } else {
        await interaction.channel.send(currentResponse)
            .catch((it) => console.log(`there was a problem with split ${index} of ${splitResponse.length}: ${it}`))
            .then(() => sendNextSplit(interaction, splitResponse, index + 1))
    }
}