export type WordBank = {
    // Coordinating Conjunction
    CC: string[]
    // Determiner
    DT: string[]
    // Determiner (plural) - not an official Penn Treebank tag, but it's needed for more appropriate sentences
    DTS: string[]
    // Preposition or subordinating conjunction
    IN: string[]
    // Adjective
    JJ: string[]
    // Adjective, comparative
    JJR: string[]
    // Adjective, superlative
    JJS: string[]
    // Noun, singular or mass
    NN: string[]
    // Noun, plural
    NNS: string[]
    // Proper noun, singular
    NNP: string[]
    // Proper noun, plural
    NNPS: string[]
    // Adverb
    RB: string[]
    // Adverb, comparative
    RBR: string[]
    // Adverb, relative
    RBS: string[]
    // to
    TO: string[]
    // Verb, non-3rd person singular present
    VBP: string[]
    // Verb, 3rd person singular present
    VBZ: string[]
    // Punctuation
    PU: string[]
}
