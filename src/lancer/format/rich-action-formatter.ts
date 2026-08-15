import {IActionData} from "../types/shared-types";
import {ResponseField} from "./display-response";
import {activationFormat, pilotMechActionType} from "./format-utility";
import TurndownService from "turndown";

// TODO: Continue to refine
export function actionTraits(action: IActionData, turndownService: TurndownService): ResponseField[] {
    if (action.trigger) {
        return reactionFormat(action, turndownService)
    } else {
        const type = `${pilotMechActionType(action)}${activationFormat(action.activation)}`
        const frequency = action.frequency ? ` *${action.frequency}*` : ""
        const name = `${action.name} (${type})${frequency}`
        return [
            {name: name, description: turndownService.turndown(action.detail), inline: false}
        ]
    }
}

function reactionFormat(action: IActionData, turndownService: TurndownService): ResponseField[] {
    const type = `${pilotMechActionType(action)}${activationFormat(action.activation)}`
    const frequency = action.frequency ? ` *${action.frequency}*` : ""
    const description = `${type}${frequency}`

    return [
        {name: action.name, description: description, inline: false},
        {name: "Trigger", description: action.trigger, inline: false},
        {name: "Effect", description: turndownService.turndown(action.detail), inline: false}
    ]
}