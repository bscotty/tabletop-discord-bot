import {Repository} from "./repository";
import {Manufacturer} from "../types/not-fully-used";
import {Talent} from "../types/talent";
import * as fs from "fs";

export type Logo = {
    imageUrl: string | null
    file: string | null,
}

export function getManufacturerLogo(source: string, repo: Repository): Logo {
    const manufacturer = repo.manufacturers.find((it) => it.id == source)
    const logoUrl = getLogoUrl(manufacturer)
    const logoFilePath = logoUrl != null ? logoUrl.replace("attachment://", "./assets/logos/") : null
    return {imageUrl: manufacturer.logo_url ?? logoUrl, file: logoFilePath}
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

export function getTalentLogo(talent: Talent): Logo {
    const logoUrl = getTalentIconFilepath(talent)
    const logoFilePath = logoUrl != null ? logoUrl.replace("attachment://", "./assets/talents/") : null
    return {imageUrl: talent.icon_url ?? logoUrl, file: logoFilePath}
}

function getTalentIconFilepath(talent: Talent): string | null {
    if (talent) {
        if (talent.icon_url) {
            return null
        } else if (talent.icon) {
            return `attachment://${talent.icon.replace(" ", "-")}.png`
        } else if (fs.existsSync(`./assets/talents/${talent.name.replace(" ", "-")}.png`)) {
            return `attachment://${talent.name.replace(" ", "-")}.png`
        } else {
            return `attachment://GENERIC-TALENT.png`
        }
    } else {
        return null
    }
}
