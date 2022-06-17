import {SearchableData} from "../lancer-data-reader";
import {
    isSearchableAction,
    isSearchableCoreBonus,
    isSearchableFrame,
    isSearchableICoreSystemData,
    isSearchableMod,
    isSearchablePilotArmor,
    isSearchablePilotGear,
    isSearchablePilotWeapon,
    isSearchableSkillTrigger,
    isSearchableStatusCondition,
    isSearchableSystem,
    isSearchableTag,
    isSearchableTalent,
    isSearchableWeapon
} from "./typechecks";
import {Formatters} from "./formatters";

export function format(formatters: Formatters, data: SearchableData) {
    console.log(`formatting ${data.name}`)

    if (isSearchableAction(data)) {
        return formatters.basicActionFormat(data)
    } else if (isSearchableCoreBonus(data)) {
        return formatters.cbFormat(data)
    } else if (isSearchableICoreSystemData(data)) {
        return formatters.coreFormat(data)
    } else if (isSearchableFrame(data)) {
        return formatters.frameFormat(data)
    } else if (isSearchableMod(data)) {
        return formatters.modFormat(data)
    } else if (isSearchablePilotArmor(data)) {
        return formatters.pilotArmorFormat(data)
    } else if (isSearchablePilotGear(data)) {
        return formatters.pilotGearFormat(data)
    } else if (isSearchablePilotWeapon(data)) {
        return formatters.pilotWeaponFormat(data)
    } else if (isSearchableSkillTrigger(data)) {
        return formatters.skillFormat(data)
    } else if (isSearchableStatusCondition(data)) {
        return formatters.statusFormat(data)
    } else if (isSearchableSystem(data)) {
        return formatters.systemFormat(data)
    } else if (isSearchableTag(data)) {
        return formatters.tagFormat(data)
    } else if (isSearchableTalent(data)) {
        return formatters.talentFormat(data)
    } else if (isSearchableWeapon(data)) {
        return formatters.weaponFormat(data)
    }
}
