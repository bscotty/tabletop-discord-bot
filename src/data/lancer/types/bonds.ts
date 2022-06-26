export type Bond = {
    id: string,
    name: string,
    major_ideals: string[]
    minor_ideals: string[]
    questions: BondQuestion[]
    powers: BondPower[]
}

export type TypedBond = Bond & { kind: "Bond" }

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

export type LabeledBondPower = BondPower & { power_name: string }

export type TypedBondPower = LabeledBondPower & { kind: "Bond Power" }

export function sourceBondPowers(bond: Bond): LabeledBondPower[] {
    return bond.powers.map(power => {
        return ({...power, power_name: bond.name})
    })
}
