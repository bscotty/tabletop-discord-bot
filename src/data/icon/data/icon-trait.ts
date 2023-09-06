export type IconTrait = {
    name: string
    description: string
    chapter_unlock?: number
}

export function formatTrait(trait: IconTrait): string {
    let chapterUnlock: string
    if (trait.chapter_unlock) {
        chapterUnlock = ` (Unlocks in Chapter ${trait.chapter_unlock})`
    } else {
        chapterUnlock = ""
    }
    return `${trait.name}${chapterUnlock}: ${trait.description}`
}
