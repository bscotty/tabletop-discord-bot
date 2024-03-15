import {
    isSearchableAction,
    isSearchableBond,
    isSearchableBondPower,
    isSearchableCoreBonus,
    isSearchableFrame,
    isSearchableGlossaryItem,
    isSearchableICoreSystemData,
    isSearchableMod,
    isSearchablePilotArmor,
    isSearchablePilotGear,
    isSearchablePilotWeapon,
    isSearchableReserve,
    isSearchableSkillTrigger,
    isSearchableStatusCondition,
    isSearchableSystem,
    isSearchableTag,
    isSearchableTalent,
    isSearchableWeapon
} from "./typechecks";
import {Formatters} from "./formatters";
import {SearchableData} from "../search/searchable";

export function format(formatters: Formatters, data: SearchableData) {
    if (isSearchableAction(data)) {
        return formatters.basicActionFormat(data)
    } else if (isSearchableBond(data)) {
        return formatters.bondFormat(data)
    } else if (isSearchableBondPower(data)) {
        return formatters.bondPowerFormat(data)
    } else if (isSearchableCoreBonus(data)) {
        return formatters.cbFormat(data)
    } else if (isSearchableICoreSystemData(data)) {
        return formatters.coreFormat(data)
    } else if (isSearchableFrame(data)) {
        return formatters.frameFormat(data)
    } else if (isSearchableGlossaryItem(data)) {
        return formatters.glossaryFormat(data)
    } else if (isSearchableMod(data)) {
        return formatters.modFormat(data)
    } else if (isSearchablePilotArmor(data)) {
        return formatters.pilotArmorFormat(data)
    } else if (isSearchablePilotGear(data)) {
        return formatters.pilotGearFormat(data)
    } else if (isSearchablePilotWeapon(data)) {
        return formatters.pilotWeaponFormat(data)
    } else if (isSearchableReserve(data)) {
        return formatters.reservesFormat(data)
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
    } else {
        console.error(`Could not assign data as any known type`)
    }
}
