import {SearchableFrame, SearchableMod, SearchableSystem, SearchableWeapon} from "../../search/searchable";
import {isSearchableFrame} from "../typechecks";

export function licenseFormat(object: SearchableFrame | SearchableMod | SearchableSystem | SearchableWeapon) {
    if (object.license_level === 0) {
        return `${object.source}`
    } else if (object.source && object.source.toUpperCase() === "EXOTIC") {
        return "Exotic"
    } else if (!isSearchableFrame(object) && object.tags && object.tags.find(tag => tag.id === 'tg_exotic')) {
        return "Exotic"
    } else if (isSearchableFrame(object)) {
        return `${object.source} ${object.license_level}`
    } else {
        let license = ""
        if (object?.license) {
            license = " " + object?.license
        }
        let license_level = ""
        if (object?.license_level) {
            license_level = " " + object?.license_level
        }
        return `${object.source}${license}${license_level}`
    }
}
