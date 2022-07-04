import {DivineWord} from "./divine-word";
import {DivineGift} from "./divine-gift";
import {DivineInvocation} from "./divine-invocation";

export type GiftedDivineWord = DivineWord & {
    gifts: DivineGift[]
}

export type DivineItem = DivineGift | GiftedDivineWord | DivineInvocation

export function isGift(divineItem: DivineItem): divineItem is DivineGift {
    return divineItem.type == "divineGift"
}

export function isWord(divineItem: DivineItem): divineItem is GiftedDivineWord {
    return divineItem.type == "boundWord"
}

export function isInvocation(divineItem: DivineItem): divineItem is DivineInvocation {
    return divineItem.type == "divineInvocation"
}