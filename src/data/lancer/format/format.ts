import {Formatters} from "./formatters";
import {SearchableData} from "../search/searchable";

export function format(formatters: Formatters, data: SearchableData) {
    console.log(`formatting ${data.name}`)

    switch (data.kind) {
        case "Action":
            return formatters.basicActionFormat(data)
        case "Bond":
            return formatters.bondFormat(data)
        case "Bond Power":
            return formatters.bondPowerFormat(data)
        case "Core Bonus":
            return formatters.cbFormat(data)
        case "Core System":
            return formatters.coreFormat(data)
        case "Frame":
            return formatters.frameFormat(data)
        case "Glossary":
            return formatters.glossaryFormat(data)
        case "Mod":
            return formatters.modFormat(data)
        case "Pilot Armor":
            return formatters.pilotArmorFormat(data)
        case "Pilot Gear":
            return formatters.pilotGearFormat(data)
        case "Pilot Weapon":
            return formatters.pilotWeaponFormat(data)
        case "Skill":
            return formatters.skillFormat(data)
        case "Status":
            return formatters.statusFormat(data)
        case "System":
            return formatters.systemFormat(data)
        case "Tag":
            return formatters.tagFormat(data)
        case "Talent":
            return formatters.talentFormat(data)
        case "Weapon":
            return formatters.weaponFormat(data)
    }
}
