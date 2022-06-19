import {WordBank} from "./word-bank";
import {Random} from "./random";
import "./array-random"

export class SpeechGenerator {
    private readonly verbose: boolean
    private readonly word_bank: WordBank
    private random: Random = new Random()

    public constructor(word_bank: WordBank, verbose?: boolean) {
        this.word_bank = word_bank
        this.verbose = verbose ? verbose : false
    }

    public generate(): string {
        let sentence: string
        switch (this.random.getInclusive(4)) {
            default:
            case 0:
                this.logRule("S --> S CC S")
                sentence = `${this.generate()} ${this.word_bank.CC.random()} ${this.generate()}`
                break
            case 1:
            case 2:
                this.logRule("S --> NP VP")
                sentence = `${this.generateSingularNP()} ${this.generateSingularVP()}`
                break
            case 3:
            case 4:
                this.logRule("S --> NP VP (plural)")
                sentence = `${this.generatePluralNP()} ${this.generatePluralVP()}`
                break
        }
        return `${this.capitalized(sentence)}${this.word_bank.PU.random()}`
    }

    private capitalized(input: string): String {
        return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase()
    }

    /**
     * Generates an NP, or Noun Phrase
     * @private
     */
    private generateNP(): string {
        switch (this.random.getInclusive(1)) {
            default:
            case 0:
                return this.generateSingularNP()
            case 1:
                return this.generatePluralNP()
        }
    }

    /**
     * Generates an NP with a singular plurality
     * @private
     */
    private generateSingularNP(): string {
        this.verboseLog("Singular NP selected")
        switch (this.random.getInclusive(9)) {
            default:
            case 0:
            case 1:
                this.logRule("NP --> DT NN")
                return `${this.word_bank.DT.random()} ${this.word_bank.NN.random()}`
            case 2:
            case 3:
                this.logRule("NP --> NNP")
                return this.word_bank.NNP.random()
            case 4:
                this.logRule("NP --> DT ADJP NN")
                return `${this.word_bank.DT.random()} ${this.generateADJP()} ${this.word_bank.NN.random()}`
            case 5:
                this.logRule("NP --> DT JJR NN")
                return `${this.word_bank.DT.random()} ${this.word_bank.JJR.random()} ${this.word_bank.NN.random()}`
            case 6:
                this.logRule("NP --> DT JJS NN")
                return `${this.word_bank.DT.random()} ${this.word_bank.JJS.random()} ${this.word_bank.NN.random()}`
            case 7:
                this.logRule("NP --> ADJP NNP")
                return `${this.generateADJP()} ${this.word_bank.NNP.random()}`
            case 8:
                this.logRule("NP --> DT JJR NNP")
                return `${this.word_bank.DT.random()} ${this.word_bank.JJR.random()} ${this.word_bank.NNP.random()}`
            case 9:
                this.logRule("NP --> DT JJS NNP")
                return `${this.word_bank.DT.random()} ${this.word_bank.JJS.random()} ${this.word_bank.NNP.random()}`
        }
    }

    /**
     * Generates an NP with a multiple plurality
     * @private
     */
    private generatePluralNP(): string {
        this.verboseLog("Plural NP selected")
        switch (this.random.getInclusive(13)) {
            default:
            case 0:
            case 1:
                this.logRule("NP --> DTS NNS")
                return `${this.word_bank.DTS.random()} ${this.word_bank.NNS.random()}`
            case 2:
            case 3:
                this.logRule("NP --> DTS NNPS")
                return `${this.word_bank.DTS.random()} ${this.word_bank.NNPS.random()}`
            case 4:
                this.logRule("NP --> NNPS")
                return `${this.word_bank.NNPS.random()}`
            case 5:
                this.logRule("NP --> DTS ADJP NNS")
                return `${this.word_bank.DTS.random()} ${this.generateADJP()} ${this.word_bank.NNS.random()}`
            case 6:
                this.logRule("NP --> DTS JJR NNS")
                return `${this.word_bank.DTS.random()} ${this.word_bank.JJR.random()} ${this.word_bank.NNS.random()}`
            case 7:
                this.logRule("NP --> DTS JJS NNS")
                return `${this.word_bank.DTS.random()} ${this.word_bank.JJS.random()} ${this.word_bank.NNS.random()}`
            case 8:
                this.logRule("NP --> DTS ADJP NNPS")
                return `${this.word_bank.DTS.random()} ${this.generateADJP()} ${this.word_bank.NNPS.random()}`
            case 9:
                this.logRule("NP --> ADJP NNPS")
                return `${this.generateADJP()} ${this.word_bank.NNPS.random()}`
            case 10:
                this.logRule("NP --> DTS JJR NNPS")
                return `${this.word_bank.DTS.random()} ${this.word_bank.JJR.random()} ${this.word_bank.NNPS.random()}`
            case 11:
                this.logRule("NP --> JJR NNPS")
                return `${this.word_bank.JJR.random()} ${this.word_bank.NNS.random()}`
            case 12:
                this.logRule("NP --> DTS JJS NNPS")
                return `${this.word_bank.DTS.random()} ${this.word_bank.JJS.random()} ${this.word_bank.NNPS.random()}`
            // -- Plural Only --
            case 13:
                this.logRule("NP --> NP CC NP")
                return `${this.generateNP()} ${this.word_bank.CC.random()} ${this.generateNP()}`
        }
    }

    /**
     * Generates an ADJP, or Adjectival Phrase
     * @private
     */
    private generateADJP(): string {
        switch (this.random.getInclusive(7)) {
            default:
            case 0:
            case 1:
            case 2:
                this.logRule("ADJP --> JJ")
                return this.word_bank.JJ.random()
            case 3:
            case 4:
            case 5:
                this.logRule("ADJP --> RB JJ")
                return `${this.word_bank.RB.random()} ${this.word_bank.JJ.random()}`
            case 7:
                this.logRule("ADJP --> ADJP CC ADJP")
                return `${this.generateADJP()} ${this.word_bank.CC.random()} ${this.generateADJP()}`
        }
    }

    /**
     * Generates a VP or Verb Phrase (a.k.a. predicate) with a singular plurality
     * @private
     */
    private generateSingularVP(): string {
        this.verboseLog("Singular VP selected")
        switch (this.random.getInclusive(8)) {
            default:
            case 0:
            case 1:
                this.logRule("VP --> VBZ")
                return this.word_bank.VBZ.random()
            case 2:
                this.logRule("VP --> VBZ NP")
                return `${this.word_bank.VBZ.random()} ${this.generateNP()}`
            case 3:
                this.logRule("VP --> VBZ PP")
                return `${this.word_bank.VBZ.random()} ${this.generatePP()}`
            case 4:
                this.logRule("VP --> VBZ RB")
                return `${this.word_bank.VBZ.random()} ${this.word_bank.RB.random()}`
            case 5:
                this.logRule("VP --> VBZ NP RB")
                return `${this.word_bank.VBZ.random()} ${this.generateNP()} ${this.word_bank.RB.random()}`
            case 6:
                this.logRule("VP --> VBZ PP RB")
                return `${this.word_bank.VBZ.random()} ${this.generatePP()} ${this.word_bank.RB.random()}`
            case 7:
                this.logRule("VP --> VBZ RBR PP")
                return `${this.word_bank.VBZ.random()} ${this.word_bank.RBR.random()} ${this.generatePP()}`
            case 8:
                this.logRule("VP --> VBZ RBS PP")
                return `${this.word_bank.VBZ.random()} ${this.word_bank.RBS.random()} ${this.generatePP()}`
        }
    }


    /**
     * Generates a VP or Verb Phrase (a.k.a. predicate) with a multiple plurality
     * @private
     */
    private generatePluralVP(): string {
        this.verboseLog("Plural VP selected")
        switch (this.random.getInclusive(8)) {
            default:
            case 0:
            case 1:
                this.logRule("VP --> VBP")
                return this.word_bank.VBP.random()
            case 2:
                this.logRule("VP --> VBP NP")
                return `${this.word_bank.VBP.random()} ${this.generateNP()}`
            case 3:
                this.logRule("VP --> VBP PP")
                return `${this.word_bank.VBP.random()} ${this.generatePP()}`
            case 4:
                this.logRule("VP --> VBP RB")
                return `${this.word_bank.VBP.random()} ${this.word_bank.RB.random()}`
            case 5:
                this.logRule("VP --> VBP NP RB")
                return `${this.word_bank.VBP.random()} ${this.generateNP()} ${this.word_bank.RB.random()}`
            case 6:
                this.logRule("VP --> VBP RB PP")
                return `${this.word_bank.VBP.random()} ${this.word_bank.RB.random()} ${this.generatePP()}`
            case 7:
                this.logRule("VP --> VBP RBR PP")
                return `${this.word_bank.VBP.random()} ${this.word_bank.RBR.random()} ${this.generatePP()}`
            case 8:
                this.logRule("VP --> VBP RBS PP")
                return `${this.word_bank.VBP.random()} ${this.word_bank.RBS.random()} ${this.generatePP()}`
        }
    }

    /**
     * Generates a PP, or Prepositional Phrase
     * @private
     */
    private generatePP(): string {
        switch (this.random.getInclusive(1)) {
            default:
            case 0:
                this.logRule("PP --> IN NP")
                return `${this.word_bank.IN.random()} ${this.generateNP()}`
            case 1:
                this.logRule("PP --> TO NP")
                return `${this.word_bank.TO.random()} ${this.generateNP()}`
        }
    }

    private logRule(log: string) {
        this.verboseLog(`using rule: ${log}`)
    }

    private verboseLog(log: string) {
        if (this.verbose)
            console.log(log)
    }
}