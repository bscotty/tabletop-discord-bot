export type IconGlossaryEntry = {
    name: string
    description: string
    category?: string
}

export type TypedIconGlossaryEntry = IconGlossaryEntry & {
    type: string
}
