// Maps built-in activations to pretty-printed output.
// Activation types that don't need to be renamed (e.g. protocol) are ignored
import {ActivationType} from "../../types/shared-types";

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
