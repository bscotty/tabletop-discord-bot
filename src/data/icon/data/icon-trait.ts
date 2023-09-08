import {formatSummon, IconSummon} from "./icon-summon";
import {formatInterrupt, IconInterrupt} from "./icon-interrupt";

export type IconTrait = {
    name: string
    description: string
    chapter_unlock?: number,
    extra?: (IconSummon | IconInterrupt)
}

export function formatTrait(trait: IconTrait): string {
    let chapterUnlock = ""
    if (trait.chapter_unlock) {
        chapterUnlock = ` (Unlocks in Chapter ${trait.chapter_unlock})`
    }
    let summon = ""
    if (trait.extra) {
        summon = "\n" + formatExtra(trait.extra)
    }
    return `**${trait.name}**${chapterUnlock}: ${trait.description}${summon}`
}

function formatExtra(extra: IconSummon | IconInterrupt): string {
    function isInterrupt(summonOrInterrupt: IconSummon | IconInterrupt): summonOrInterrupt is IconInterrupt {
        return summonOrInterrupt.hasOwnProperty("count")
    }

    if (isInterrupt(extra)) {
        return formatInterrupt(extra)
    } else {
        // smart cast to IconSummon
        return formatSummon(extra)
    }
}
