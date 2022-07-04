import {DivineGift} from "./divine-gift";
import {DivineWord} from "./divine-word";
import {DivineInvocation} from "./divine-invocation";

export class DivineDictionary {
    readonly connectedWords: GiftedDivineWord[]

    constructor(
        readonly gifts: DivineGift[],
        words: DivineWord[],
        readonly invocations: DivineInvocation[]
    ) {
        this.connectedWords = words.map((it) => {
            const foundGifts = this.gifts.filter(gift => gift.data.word == it.name)
            return {...it, gifts: foundGifts}
        })
    }
}

export type GiftedDivineWord = DivineWord & {
    gifts: DivineGift[]
}

export type DivineItem = DivineGift | GiftedDivineWord | DivineInvocation
