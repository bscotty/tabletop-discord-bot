import {Repository} from "./repository";
import {Manufacturer} from "../types/not-fully-used";

export type Logo = {
    imageUrl: string | null
    file: string | null,
}

export function getLogo(source: string, repo: Repository): Logo {
    const manufacturer = repo.manufacturers.find((it) => it.id == source)
    const logoUrl = getLogoUrl(manufacturer)
    const logoFilePath = logoUrl != null ? logoUrl.replace("attachment://", "./assets/logos/") : null
    return {imageUrl: logoUrl, file: logoFilePath}
}


function getLogoUrl(manufacturer: Manufacturer): string | null {
    if (manufacturer) {
        if (manufacturer.logo_url) {
            return null
        } else if (manufacturer.logo) {
            return `attachment://${manufacturer.logo}.png`
        } else {
            return null
        }
    } else {
        return null
    }
}