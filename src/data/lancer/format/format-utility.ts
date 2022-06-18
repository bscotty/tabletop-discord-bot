import {
    SearchableAction,
    SearchableData,
    SearchableFrame,
    SearchableMod,
    SearchableSystem,
    SearchableWeapon
} from "../search/searchable";
import {isSearchableFrame} from "./typechecks";
import {ActivationType, IActionData} from "../types/shared-types";

export function replaceVal(valString: string, replaceWith: string): string {
    return valString.replace(/\{VAL}/, replaceWith)
}

export function licenseFormat(object: SearchableFrame | SearchableMod | SearchableSystem | SearchableWeapon) {
    if (object.license_level === 0) {
        return `${object.source}`
    } else if (object.source.toUpperCase() === "EXOTIC") {
        return "Exotic"
    } else if (!isSearchableFrame(object) && object.tags && object.tags.find(tag => tag.id === 'tg_exotic')) {
        return "Exotic"
    } else if (isSearchableFrame(object)) {
        return `${object.source} ${object.license_level}`
    } else {
        return `${object.source} ${object?.license} ${object.license_level}`
    }
}

// TODO Use this, especially with homebrew coming
export function formatContentPack(data: SearchableData) {
    if (data.content_pack == "LANCER Core")
        return ""
    else
        return ` (From *${data.content_pack}*)`
}

export function toTitleCase(str: string): string {
    const allWordsNoWhitespace = /\w\S*/g
    return str.replace(allWordsNoWhitespace, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
    })
}

export function pilotMechActionType(action: (SearchableAction | IActionData)): string {
    //Determines if an action is mech-only, pilot-only, or available to both.
    if (action.activation && action.activation.toUpperCase() === "DOWNTIME") {
        return ""
    } else if (action.pilot) {
        return "Pilot-Only "
    } else {
        return ""
    }
}

// Maps built-in activations to pretty-printed output.
// Activation types that don't need to be renamed (e.g. protocol) are ignored
const actionTypesPrettyPrint: [string, string][] = [
    ['Free', 'Free Action'],
    ['Quick', 'Quick Action'],
    ['Full', 'Full Action'],
    ['Invade', 'Quick Tech (Invade)'],
    ['Downtime', 'Downtime Action']
]

export function activationFormat(activation: ActivationType): string {
    const prettyPrint: string[] | undefined =
        actionTypesPrettyPrint.find((entry: [string, string]) => entry[0] == activation)

    if (prettyPrint === undefined)
        return activation
    else
        return prettyPrint[0]
}