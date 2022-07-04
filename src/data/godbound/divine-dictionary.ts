import {DivineGift} from "./divine-gift";
import {DivineWord} from "./divine-word";
import {DivineInvocation} from "./divine-invocation";
import {GiftedDivineWord} from "./divine-item";

export class DivineDictionary {
    readonly words: GiftedDivineWord[]

    constructor(
        readonly gifts: DivineGift[],
        words: DivineWord[],
        readonly invocations: DivineInvocation[]
    ) {
        this.words = words.map((it) => {
            const foundGifts = this.gifts.filter(gift => gift.data.word == it.name)
            return {...it, gifts: foundGifts}
        })
    }
}
