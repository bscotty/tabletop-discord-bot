import staticAltNames from "./static-alt-names.json"
import {IActionData, IDeployableData} from "./types/shared-types";
import {IRankData} from "./types/talent";
import {Bond} from "./types/bonds";
import {SearchableBond} from "./search/searchable";

class AltName {
    id: string
    names: string[]
    description?: string
}

export type SupportsAltName = {
    id?: string
    name: string
    data_type?: string
    content_pack?: string
    source?: string
    actions?: IActionData[]
    deployables?: IDeployableData[]
    ranks?: IRankData[],
}

export type AlternativelyNamed = {
    alt_names: string[]
}

export function addAlternativeNames<T extends SupportsAltName>(
    data: T
): T & AlternativelyNamed {
    const alternativelyNamedItem = addAltNames(data)
    const staticAlts = getStaticAlts(alternativelyNamedItem)
    const gmsAlts = getGmsAlt(alternativelyNamedItem)
    const invasionAlts = getInvasionOptionAlts(alternativelyNamedItem)
    const deployableAlts = addDeployables(alternativelyNamedItem)
    const rankAlts = addRanks(alternativelyNamedItem)
    const interpolatedAlts = addXInsteadOfVal(alternativelyNamedItem)
    const bondAlts: string[] = addBondAlt(alternativelyNamedItem);
    alternativelyNamedItem.alt_names = staticAlts.concat(gmsAlts, invasionAlts, deployableAlts, rankAlts, interpolatedAlts, bondAlts)
    return alternativelyNamedItem
}

function addAltNames<T extends { name: string }>(item: T): T & AlternativelyNamed {
    return {...item, alt_names: []}
}

type HasAlternativeNames = SupportsAltName & AlternativelyNamed

function getStaticAlts(item: HasAlternativeNames): string[] {
    //Many of the static names come from the "Lancer Character Corner Common Abbreviations Guide"
    //https://docs.google.com/document/d/1UQRVRKkldAnoKQvDrXWGAAptA8yyv46mUh9FK-g8P1I/edit
    const statics: AltName[] = staticAltNames
    let altNames: string[] = []

    const altName = statics.find((altName: AltName) => altName.id == item.id)
    if (altName) {
        altNames = altNames.concat(altName.names)
    }
    return altNames
}

function getGmsAlt(item: HasAlternativeNames): string[] {
    if (item.source === "GMS") {
        const gmsAlt = `GMS ${item.name}`
        return [gmsAlt]
    } else {
        return []
    }
}

function getInvasionOptionAlts(item: HasAlternativeNames): string[] {
    if (item?.actions?.length > 0) {
        return item.actions.map((action: IActionData) => action.name)
    } else {
        return []
    }
}

function addDeployables(item: HasAlternativeNames): string[] {
    if (item?.deployables?.length > 0) {
        return item.deployables.map((deployable: IDeployableData) => deployable.name)
    } else {
        return []
    }
}

function addRanks(item: HasAlternativeNames): string[] {
    if (item?.ranks?.length > 0) {
        return item.ranks.map((rank: IRankData) => rank.name)
    } else {
        return []
    }
}

function addXInsteadOfVal(item: HasAlternativeNames): string[] {
    if (item.data_type === "tag" && item.name.includes("{VAL}")) {
        return [item.name.replace("{VAL}", "X")]
    } else {
        return []
    }
}

function addBondAlt(item: HasAlternativeNames): string[] {
    function isBond(potentialBond: HasAlternativeNames): potentialBond is SearchableBond {
        return item.data_type && item.data_type == "Bond"
    }

    if (isBond(item)) {
        const removeThePrefix = item.name.substring(4)
        return [removeThePrefix]
    } else {
        return [""]
    }
}
