import {SearchableFrame} from "../search/searchable";
import TurndownService from "turndown";
import {LicenseData, Repository} from "./repository";
import {Formatters} from "./formatters";
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
        const frame = item
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
                {name: "Statistics", description: this.formattedStatBlock(stats), inline: false},
                ...(frame.traits.map((trait) => this.traitToField(frame.source, trait))),
                {name: "Core System", description: coreName, inline: false},
                ...this.getLicenseGear(frame)
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

    private formattedStatBlock(stats: FrameStats): string {
        const horizontalLine: string = "|-------------|-------------|-------------|"
        const techAttack = stats.tech_attack > 0 ? `+${stats.tech_attack}` : `${stats.tech_attack}`

        function assembleRow(first: string, second: string, third: string): string {
            function statWhitespace(value: string): string {
                const maxSize = 13
                const whiteSpace = maxSize - value.length
                const startingWhitespace = Math.round(whiteSpace / 2)
                return " ".repeat(startingWhitespace) + value + " ".repeat(whiteSpace - startingWhitespace)
            }

            return "|" + [first, second, third].map((it) => statWhitespace(it)).join("|") + "|"
        }

        return [
            "```",
            horizontalLine,
            assembleRow("STRUCTURE", "STRESS", "ARMOR"),
            assembleRow(`${stats.structure}`, `${stats.stress}`, `${stats.armor}`),
            horizontalLine,
            assembleRow("HP", "EVASION", "E-DEF"),
            assembleRow(`${stats.hp}`, `${stats.evasion}`, `${stats.edef}`),
            horizontalLine,
            assembleRow("HEATCAP", "SENSORS", "TECH ATTACK"),
            assembleRow(`${stats.heatcap}`, `${stats.sensor_range}`, `${techAttack}`),
            horizontalLine,
            assembleRow("REPAIR CAP", "SAVE", "SPEED"),
            assembleRow(`${stats.repcap}`, `${stats.save}`, `${stats.speed}`),
            horizontalLine,
            assembleRow("", "SP", ""),
            assembleRow("", `${stats.sp}`, ""),
            horizontalLine,
            "```"
        ].join("\n")
    }

    private getLicenseGear(frame: SearchableFrame): ResponseField[] {
        if (frame.variant) {
            return [
                {name: "Frame Variant", description: `${frame.variant} Variant`, inline: false}
            ]
        }

        function getGearNames(forLicenseLevel: 1 | 2 | 3, gear: LicenseData[]): string {
            return gear.filter((it) => it.license_level == forLicenseLevel)
                .map((it) => isSearchableFrame(it) ? `${it.name} Frame` : it.name)
                .join(", ")
        }

        const gear = this.repo.getLicenseData(frame)
        return [
            {name: "License Level 1", description: getGearNames(1, gear), inline: true},
            {name: "License Level 2", description: getGearNames(2, gear), inline: true},
            {name: "License Level 3", description: getGearNames(3, gear), inline: true}
        ]
    }
}
