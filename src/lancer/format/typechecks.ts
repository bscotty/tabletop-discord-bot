// TODO: can we actually make these constants? Then we don't need to define these and can just do the checks inline
import {SearchableData, SearchableFrame, SearchableSystem, SearchableWeapon} from "../search/searchable";

export function isSearchableFrame(data: SearchableData): data is SearchableFrame {
    return data.data_type == "Frame"
}

export function isSearchableSystem(data: SearchableData): data is SearchableSystem {
    return data.data_type == "System"
}

export function isSearchableWeapon(data: SearchableData): data is SearchableWeapon {
    return data.data_type == "Weapon"
}