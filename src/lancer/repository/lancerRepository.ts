import {Manufacturer} from "../types/not-fully-used";
import {SearchableFrame, SearchableMod, SearchableSystem, SearchableTag, SearchableWeapon} from "../search/searchable";
import {LancerData} from "../lancer-data-reader";
import {InfoManifest} from "../types/info";

export type LicenseData = (SearchableFrame | SearchableMod | SearchableSystem | SearchableWeapon)

export interface LancerRepository {
    readonly data: LancerData[]
    readonly weapons: SearchableWeapon[]
    readonly systems: SearchableSystem[]
    readonly frames: SearchableFrame[]
    readonly tags: SearchableTag[]

    readonly manufacturers: Manufacturer[]
    readonly firstPartyInfo: InfoManifest[]
    readonly homebrewInfo: InfoManifest[]

    getFrameForIntegratedId(id: string): SearchableFrame | undefined

    getLicenseData(frame: SearchableFrame): LicenseData[]
}
