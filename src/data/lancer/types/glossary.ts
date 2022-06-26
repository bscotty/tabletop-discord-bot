export type GlossaryItem = {
    name: string
    description: string
}

export type TypedGlossaryItem = GlossaryItem & { kind: "Glossary" }
