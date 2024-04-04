import {SearchableFrame} from "../search/searchable";
import TurndownService from "turndown";
import {LicenseData, Repository} from "./repository";
import {Formatters, ZERO_SPACE} from "./formatters";
import {formatContentPack} from "./format-utility";
import {FrameStats, IFrameTraitData} from "../types/frame";
import {RichFormatter} from "./rich-formatter";
import {getManufacturerLogo} from "./logos";
import {getColor} from "./color";
import {DisplayResponse, ResponseField} from "./display-response";
import {isSearchableFrame} from "./typechecks";

export class RichFrameFormatter implements RichFormatter<SearchableFrame> {
    private readonly turndownService: TurndownService
    private readonly repo: Repository
    private readonly formatters: Formatters

    constructor(repository: Repository, formatters: Formatters) {
        this.turndownService = new TurndownService()
        this.repo = repository
        this.formatters = formatters
    }

    richFormat(item: SearchableFrame): DisplayResponse {
        if (item.specialty) {
            return this.specialtyFormat(item)
        } else {
            return this.frameFormat(item)
        }
    }

    private frameFormat(frame: SearchableFrame): DisplayResponse {
        const {stats, core_system} = frame
        const coreName = core_system.name || core_system.passive_name || core_system.active_name

        const {imageUrl, file} = getManufacturerLogo(frame.source, this.repo)
        const color = getColor(frame.source, this.repo)
        return {
            color: color,
            authorName: `${frame.source} ${frame.name}`,
            authorIconUrl: imageUrl,
            thumbnailUrl: frame.image_url || "https://d2c79xe1p61csc.cloudfront.net/frames/nodata.png",
            description: `${frame.mechtype.join('/')} Frame${formatContentPack(frame)}`,
            localAssetFilePaths: file ? [file] : [],
            fields: [
                {name: "Size", description: `${frame.stats.size}`, inline: true},
                {name: "Mounts", description: `${frame.mounts.join(', ')}`, inline: true},
                ...this.formattedStatFields(stats),
                ...(frame.traits.map((trait) => this.traitToField(frame.source, trait))),
                {name: "Core System", description: coreName, inline: false},
                ...this.getLicenseGear(frame)
            ],
            buttons: []
        }
    }

    private specialtyFormat(specialtyLicense: SearchableFrame): DisplayResponse {
        console.log(`found specialty item: ${specialtyLicense.id}`)
        const {imageUrl, file} = getManufacturerLogo(specialtyLicense.source, this.repo)
        const color = getColor(specialtyLicense.source, this.repo)
        const prerequisite: ResponseField[] = []
        const specialty = specialtyLicense.specialty
        if (typeof specialty != "boolean") {
            prerequisite.push(
                {
                    name: "Prerequisite",
                    description: `${specialty.min_rank} Rank(s) of ${specialty.source} Licenses`,
                    inline: false
                }
            )
        }
        const mechType = specialtyLicense.mechtype.length > 0 ? specialtyLicense.mechtype.join("/") : "Specialty"
        return {
            color: color,
            authorName: `${specialtyLicense.source} ${specialtyLicense.name}`,
            authorIconUrl: imageUrl,
            thumbnailUrl: specialtyLicense.image_url || "https://d2c79xe1p61csc.cloudfront.net/frames/nodata.png",
            description: `${mechType}${formatContentPack(specialtyLicense)}`,
            localAssetFilePaths: file ? [file] : [],
            fields: [
                ...prerequisite,
                ...this.getLicenseGear(specialtyLicense)
            ],
            buttons: []
        }
    }

    private traitToField(source: string, trait: IFrameTraitData): ResponseField {
        let description = ""
        if (trait.actions && trait.actions.length > 0) {
            trait.actions.forEach(act => description += this.formatters.actionFormat(act) + "\n")
        } else {
            description += this.turndownService.turndown(trait.description) + "\n"
        }
        if (trait.integrated) description += this.formatters.integratedFormat(trait.integrated, source)

        return {name: trait.name, description: description.trim(), inline: false}
    }

    private formattedStatFields(stats: FrameStats): ResponseField[] {
        const techAttack = stats.tech_attack > 0 ? `+${stats.tech_attack}` : `${stats.tech_attack}`
        return [
            {name: ZERO_SPACE, description: `**-------------- STATISTICS --------------**`, inline: false},

            {name: "STRUCTURE", description: `${stats.structure}`, inline: true},
            {name: "STRESS", description: `${stats.stress}`, inline: true},
            {name: "ARMOR", description: `${stats.armor}`, inline: true},

            {name: "HP", description: `${stats.hp}`, inline: true},
            {name: "EVASION", description: `${stats.evasion}`, inline: true},
            {name: "E-DEF", description: `${stats.edef}`, inline: true},

            {name: "HEATCAP", description: `${stats.heatcap}`, inline: true},
            {name: "SENSORS", description: `${stats.sensor_range}`, inline: true},
            {name: "TECH ATTACK", description: `${techAttack}`, inline: true},

            {name: "REPAIR CAP", description: `${stats.repcap}`, inline: true},
            {name: "SAVE", description: `${stats.save}`, inline: true},
            {name: "SPEED", description: `${stats.speed}`, inline: true},

            {name: "SP", description: `${stats.sp}`, inline: true},
            {name: ZERO_SPACE, description: ZERO_SPACE, inline: false},
        ]
    }

    private getLicenseGear(frame: SearchableFrame): ResponseField[] {
        if (frame.variant) {
            return [
                {name: "Frame Variant", description: `${frame.variant} Variant`, inline: false}
            ]
        }
        if (frame.source == "GMS") {
            return []
        }

        function getGearNames(forLicenseLevel: 1 | 2 | 3, gear: LicenseData[]): string[] {
            return gear.filter((it) => it.license_level == forLicenseLevel)
                .map((it) => isSearchableFrame(it) ? `${it.name} Frame` : it.name)
        }

        const validLicenseLevels: (1 | 2 | 3)[] = [1, 2, 3]
        const gear = this.repo.getLicenseData(frame)

        return validLicenseLevels.map((licenseLevel) => {
            return ({level: licenseLevel, names: getGearNames(licenseLevel, gear)});
        }).filter(({names}) => {
            return names.length > 0
        }).map(({level, names}) => {
            return ({name: `License Level ${level}`, description: `${names.join(", ")}`, inline: true})
        })
    }
}
