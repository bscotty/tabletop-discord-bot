import {SearchableAction} from "../../search/searchable";
import {IActionData} from "../../types/shared-types";

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
