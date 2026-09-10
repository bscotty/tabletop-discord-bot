import {Manufacturer} from "../../types/not-fully-used";
import {Talent} from "../../types/talent";
import * as fs from "fs";
import {LancerRepository} from "../../repository/lancerRepository";
import downloadLogo from "./logoDownloader"

export type Logo = {
    imageUrl: string | null
    file: string | null,
}

export async function getManufacturerLogo(source: string, repo: LancerRepository): Promise<Logo> {
    const manufacturer = repo.manufacturers.find((it) => it.id == source)
    return await getLogo(manufacturer)
}

async function getLogo(manufacturer: Manufacturer): Promise<Logo> {
    if (manufacturer.logo_url) {
        return await getCachedLogo(manufacturer)
    } else if (manufacturer.logo) {
        if (fs.existsSync(`./assets/logos/${manufacturer.logo}.png`)) {
            return {
                imageUrl: `attachment://${manufacturer.logo}.png`,
                file: `./assets/logos/${manufacturer.logo}.png`
            }
        } else {
            return {imageUrl: null, file: null}
        }
    } else {
        return {imageUrl: null, file: null}
    }
}

async function getCachedLogo(manufacturer: Manufacturer): Promise<Logo> {
    const imageName = `${manufacturer.id}.png`
        .replaceAll(" ", "_")
        .replaceAll("&", "-")
        .replaceAll("/", "-")
    const filePath = assetFilePath(imageName)
    if (fs.existsSync(filePath)) {
        return {imageUrl: `attachment://${imageName}`, file: filePath}
    } else {
        if (await downloadLogo(manufacturer.logo_url, manufacturer.light, filePath)) {
            return {imageUrl: `attachment://${imageName}`, file: filePath}
        } else {
            console.error(`Could not download logo for ${manufacturer.id}`)
            return {imageUrl: null, file: null}
        }
    }
}

function assetFilePath(name: string): string {
    return __dirname + "/../../../../../../assets/cache/" + name
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
