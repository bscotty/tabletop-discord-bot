import {Manufacturer} from "../types/not-fully-used";
import {SearchableFrame, SearchableSystem, SearchableTag, SearchableWeapon} from "../search/searchable";
import {LancerData, lancerDataReader} from "../lancer-data-reader";
import {Lcp} from "../types/lcp";
import {InfoManifest} from "../types/info";
import {getCoreLcp} from "../lcp/core";
import {getKtbLcp} from "../lcp/ktb";
import {getLongRimLcp} from "../lcp/long-rim";
import {getWallflowerLcp} from "../lcp/wallflower";
import {getSolsticeRainData} from "../lcp/solstice-rain";
import {getSsmrLcp} from "../lcp/ssmr";
import {getDustgraveLcp} from "../lcp/dustgrave";
import {getWinterScarLcp} from "../lcp/winter-scar";
import {getShadowOfTheWolfLcp} from "../lcp/shadow-of-the-wolf";
import {getCrisisCoreLcp} from "../lcp/homebrew/crisis core";
import {getEHandSLCP} from "../lcp/homebrew/event horizon & suns";
import {getIridiaLcp} from "../lcp/homebrew/iridia";
import {getIronleafFoundryLcp} from "../lcp/homebrew/ironleaf-foundry";
import {getKrfwCatalogLcp} from "../lcp/homebrew/krfw catalog";
import {getLegionnaireLcp} from "../lcp/homebrew/legionnaire";
import {getLiminalSpaceLcp} from "../lcp/homebrew/liminal-space";
import {getMfecaneLcp} from "../lcp/homebrew/mfecane";
import {getSciroccoLcp} from "../lcp/homebrew/scirocco";
import {getStolenCrownLcp} from "../lcp/homebrew/stolen-crown";
import {getSuldanLcp} from "../lcp/homebrew/suldan";


export interface Repository {
    readonly data: LancerData[]
    readonly weapons: SearchableWeapon[]
    readonly systems: SearchableSystem[]
    readonly frames: SearchableFrame[]
    readonly tags: SearchableTag[]

    readonly manufacturers: Manufacturer[]
    readonly firstPartyInfo: InfoManifest[]
    readonly homebrewInfo: InfoManifest[]

    getFrameForIntegratedId(id: string): SearchableFrame | undefined
}

let _repository: Repository

export function getRepository(): Repository {
    if (!_repository) {
        _repository = new RepositoryImpl()
    }
    return _repository
}


function firstParty(): Lcp[] {
    return [
        getCoreLcp(),
        getKtbLcp(),
        getLongRimLcp(),
        getWallflowerLcp(),
        getSolsticeRainData(),
        getSsmrLcp(),
        getDustgraveLcp(),
        getWinterScarLcp(),
        getShadowOfTheWolfLcp()
    ]
}

function homebrew(): Lcp[] {
    return [
        getCrisisCoreLcp(),
        getEHandSLCP(),
        getIridiaLcp(),
        getIronleafFoundryLcp(),
        getKrfwCatalogLcp(),
        getLegionnaireLcp(),
        getLiminalSpaceLcp(),
        getMfecaneLcp(),
        getSciroccoLcp(),
        getStolenCrownLcp(),
        getSuldanLcp()
    ]
}

class RepositoryImpl implements Repository {
    readonly data: LancerData[]

    get weapons(): SearchableWeapon[] {
        return this.data.map((it) => it.weapons).flat()
    }

    get systems(): SearchableSystem[] {
        return this.data.map((it) => it.systems).flat()
    }

    get frames(): SearchableFrame[] {
        return this.data.map((it) => it.frames).flat()
    }

    get tags(): SearchableTag[] {
        return this.data.map((it) => it.tags).flat()
    }

    readonly manufacturers: Manufacturer[]
    readonly firstPartyInfo: InfoManifest[]
    readonly homebrewInfo: InfoManifest[]

    constructor() {
        const firstPartyLcps = firstParty()
        const homebrewLcps = homebrew()
        const lcpData = [...firstPartyLcps, ...homebrewLcps]
        this.data = lcpData.map((it) => lancerDataReader(it))

        this.manufacturers = lcpData.map((it) => it.manufacturers).flat()
        this.firstPartyInfo = firstPartyLcps.map((it) => it.info)
        this.homebrewInfo = homebrewLcps.map((it) => it.info)
    }

    getFrameForIntegratedId(id: string): SearchableFrame | undefined {
        return this.frames.find((it) => {
            const traitIntegrations = it.traits.map((trait) => trait.integrated)
            const coreIntegrations = it.core_system.integrated
            return [...traitIntegrations, coreIntegrations].filter((it) => it).find((integrateds) => {
                return integrateds.find((integratedId) => {
                    return integratedId === id
                })
            })
        })
    }
}
