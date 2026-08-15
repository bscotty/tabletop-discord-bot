import {Formatter} from "../formatter/formatter";
import {
    SearchableAction,
    SearchableBond,
    SearchableBondPower,
    SearchableCoreBonus,
    SearchableData,
    SearchableFrame,
    SearchableGlossaryItem,
    SearchableICoreSystemData,
    SearchableMod,
    SearchablePilotArmor,
    SearchablePilotGear,
    SearchablePilotWeapon,
    SearchableReserve,
    SearchableSkillTrigger,
    SearchableStatusCondition,
    SearchableSystem,
    SearchableTag,
    SearchableTalent,
    SearchableWeapon
} from "./search/searchable";
import {Formatters} from "./format/formatters";
import {RichFrameFormatter} from "./format/rich-frame-formatter";
import {DisplayResponse} from "./format/display-response";

export class LancerFormatter implements Formatter<SearchableData> {
    constructor(
        private readonly formatters: Formatters,
        private readonly richFrameFormatter: RichFrameFormatter
    ) {
    }

    format(item: SearchableData): string | DisplayResponse {
        if (this.isSearchableAction(item)) {
            return this.formatters.basicActionFormat(item)
        } else if (this.isSearchableBond(item)) {
            return this.formatters.bondFormat(item)
        } else if (this.isSearchableBondPower(item)) {
            return this.formatters.bondPowerFormat(item)
        } else if (this.isSearchableCoreBonus(item)) {
            return this.formatters.cbFormat(item)
        } else if (this.isSearchableICoreSystemData(item)) {
            return this.formatters.coreFormat(item)
        } else if (this.isSearchableFrame(item)) {
            return this.richFrameFormatter.richFormat(item)
        } else if (this.isSearchableGlossaryItem(item)) {
            return this.formatters.glossaryFormat(item)
        } else if (this.isSearchableMod(item)) {
            return this.formatters.modFormat(item)
        } else if (this.isSearchablePilotArmor(item)) {
            return this.formatters.pilotArmorFormat(item)
        } else if (this.isSearchablePilotGear(item)) {
            return this.formatters.pilotGearFormat(item)
        } else if (this.isSearchablePilotWeapon(item)) {
            return this.formatters.pilotWeaponFormat(item)
        } else if (this.isSearchableReserve(item)) {
            return this.formatters.reservesFormat(item)
        } else if (this.isSearchableSkillTrigger(item)) {
            return this.formatters.skillFormat(item)
        } else if (this.isSearchableStatusCondition(item)) {
            return this.formatters.statusFormat(item)
        } else if (this.isSearchableSystem(item)) {
            return this.formatters.systemFormat(item)
        } else if (this.isSearchableTag(item)) {
            return this.formatters.tagFormat(item)
        } else if (this.isSearchableTalent(item)) {
            return this.formatters.talentFormat(item)
        } else if (this.isSearchableWeapon(item)) {
            return this.formatters.weaponFormat(item)
        } else {
            console.error(`Could not assign data as any known type`)
        }
    }

    private isSearchableAction(data: SearchableData): data is SearchableAction {
        return data.data_type == "Action"
    }

    private isSearchableBond(data: SearchableData): data is SearchableBond {
        return data.data_type == "Bond"
    }

    private isSearchableBondPower(data: SearchableData): data is SearchableBondPower {
        return data.data_type == "Bond Power"
    }

    private isSearchableCoreBonus(data: SearchableData): data is SearchableCoreBonus {
        return data.data_type == "Core Bonus"
    }

    private isSearchableICoreSystemData(data: SearchableData): data is SearchableICoreSystemData {
        return data.data_type == "Core System"
    }

    private isSearchableFrame(data: SearchableData): data is SearchableFrame {
        return data.data_type == "Frame"
    }

    private isSearchableGlossaryItem(data: SearchableData): data is SearchableGlossaryItem {
        return data.data_type == "Glossary"
    }

    private isSearchableMod(data: SearchableData): data is SearchableMod {
        return data.data_type == "Mod"
    }

    private isSearchablePilotArmor(data: SearchableData): data is SearchablePilotArmor {
        return data.data_type == "Pilot Armor"
    }

    private isSearchablePilotGear(data: SearchableData): data is SearchablePilotGear {
        return data.data_type == "Pilot Gear"
    }

    private isSearchablePilotWeapon(data: SearchableData): data is SearchablePilotWeapon {
        return data.data_type == "Pilot Weapon"
    }

    private isSearchableReserve(data: SearchableData): data is SearchableReserve {
        return data.data_type == "Reserve"
    }

    private isSearchableSkillTrigger(data: SearchableData): data is SearchableSkillTrigger {
        return data.data_type == "Skill"
    }

    private isSearchableStatusCondition(data: SearchableData): data is SearchableStatusCondition {
        return data.data_type == "Status"
    }

    private isSearchableSystem(data: SearchableData): data is SearchableSystem {
        return data.data_type == "System"
    }

    private isSearchableTag(data: SearchableData): data is SearchableTag {
        return data.data_type == "Tag"
    }

    private isSearchableTalent(data: SearchableData): data is SearchableTalent {
        return data.data_type == "Talent"
    }

    private isSearchableWeapon(data: SearchableData): data is SearchableWeapon {
        return data.data_type == "Weapon"
    }
}