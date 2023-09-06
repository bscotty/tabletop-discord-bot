import {formatNameDescription, IconNameDescription} from "./icon-name-description";

export type IconSpecialMechanic = {
    name: string
    description: string
    special_action?: IconNameDescription
    cross_class: IconNameDescription
}

export function formatSpecialMechanic(specialMechanic: IconSpecialMechanic): string {
    let specialAction = ""
    if (specialMechanic.special_action) {
        specialAction = "\n" + formatNameDescription(specialMechanic.special_action)
    }
    return `Special Mechanic: *${specialMechanic.name}*\n${specialMechanic.description}` +
        `${specialAction}\n` + formatNameDescription(specialMechanic.cross_class)
}
