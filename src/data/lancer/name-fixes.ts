import staticAltNames from "./static-alt-names.json"
import {IActionData, IDeployableData} from "./types/shared-types";
import {IRankData} from "./types/talent";

class AltName {
    id: string
    names: string[]
    description?: string
}

export type SupportsAltName = {
    id?: string
    name: string
    kind: string
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
    const staticAlts = getStaticAlts(data)
    const gmsAlts = getGmsAlt(data)
    const invasionAlts = getInvasionOptionAlts(data)
    const deployableAlts = addDeployables(data)
    const rankAlts = addRanks(data)
    const interpolatedAlts = addXInsteadOfVal(data)
    const bondAlts: string[] = addBondAlt(data);
    return {
        ...data,
        alt_names: staticAlts.concat(gmsAlts, invasionAlts, deployableAlts, rankAlts, interpolatedAlts, bondAlts)
    }
}

function getStaticAlts(item: SupportsAltName): string[] {
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

function getGmsAlt(item: SupportsAltName): string[] {
    if (item.source === "GMS") {
        const gmsAlt = `GMS ${item.name}`
        return [gmsAlt]
    } else {
        return []
    }
}

function getInvasionOptionAlts(item: SupportsAltName): string[] {
    if (item?.actions?.length > 0) {
        return item.actions.map((action: IActionData) => action.name)
    } else {
        return []
    }
}

function addDeployables(item: SupportsAltName): string[] {
    if (item?.deployables?.length > 0) {
        return item.deployables.map((deployable: IDeployableData) => deployable.name)
    } else {
        return []
    }
}

function addRanks(item: SupportsAltName): string[] {
    if (item?.ranks?.length > 0) {
        return item.ranks.map((rank: IRankData) => rank.name)
    } else {
        return []
    }
}

function addXInsteadOfVal(item: SupportsAltName): string[] {
    if (item.kind === "Tag" && item.name.includes("{VAL}")) {
        return [item.name.replace("{VAL}", "X")]
    } else {
        return []
    }
}

function addBondAlt(item: SupportsAltName): string[] {
    if (item.kind == "Bond") {
        const removeThePrefix = item.name.substring(4)
        return [removeThePrefix]
    } else {
        return [""]
    }
}
