import {DivineGift} from "./divine-gift";
import {DivineInvocation} from "./divine-invocation";
import {DivineItem, GiftedDivineWord, isGift, isInvocation, isWord} from "./divine-item";

export function formatGodbound(item: DivineItem): string {
    if (isGift(item)) {
        return formatGift(item)
    } else if (isWord(item)) {
        return formatWord(item)
    } else if (isInvocation(item)) {
        return formatInvocation(item)
    } else {
        throw Error(`This is impossible - item is not a valid divine item: ${item}`)
    }
}

function formatGift(gift: DivineGift): string {
    let greaterText: string
    if (gift.data.greater) {
        greaterText = " - *Greater Gift*"
    } else {
        greaterText = ""
    }
    return `**${gift.name}** (${gift.data.word}${greaterText})\n${gift.data.description}`
}

function formatWord(word: GiftedDivineWord): string {
    let pdfRefernece: string
    if (word.data.pdfCode.toLowerCase() == "homebrew") {
        pdfRefernece = "*Homebrew*"
    } else {
        pdfRefernece = `*${word.data.pdfCode}*, pg ${word.data.pdfPage}`
    }

    let gifts: string
    if (word.gifts.length > 0) {
        gifts = `\n\n__${word.name} Gifts:__\n` + word.gifts.map((it) => it.name).join("\n")
    } else {
        gifts = ""
    }

    return `**${word.name}** (${pdfRefernece})\n${word.data.description}${gifts}`
}

function formatInvocation(invocation: DivineInvocation): string {
    return `**${invocation.name}** - ${invocation.data.word}\n${invocation.data.description}`
}
