export type Bond = {
    id: string,
    name: string,
    major_ideals: string[]
    minor_ideals: string[]
    questions: BondQuestion[]
    powers: BondPower[]
}

export type BondQuestion = {
    question: string
    options: string[]
}

export type BondPower = {
    name: string
    description: string
    frequency?: string
    prerequisite?: string
    veteran?: boolean
    master?: boolean
}

export type LabeledPower = BondPower & { power_name: string }

export function getPowersFromBonds(bonds: Bond[]): LabeledPower[] {
    return bonds.map((bond: Bond) => {
        return bond.powers.map(power => {
            return ({...power, power_name: bond.name})
        })
    }).flat()
}
