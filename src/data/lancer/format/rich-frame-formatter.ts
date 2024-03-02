import {SearchableFrame} from "../search/searchable";
import TurndownService from "turndown";
import {Repository} from "./repository";
import {Formatters} from "./formatters";
import {EmbedBuilder} from "discord.js";
import {formatContentPack} from "./format-utility";
import {IFrameTraitData} from "../types/frame";
import {RichFormatter} from "./rich-formatter";
import {getLogo} from "./logos";
import {getColor} from "./color";
import {DisplayResponse, ResponseField} from "./display-response";

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

        const horizontalLine: string = "|-------------|-------------|-------------|"
        const techAttack = stats.tech_attack > 0 ? `+${stats.tech_attack}` : `${stats.tech_attack}`

        const formattedStatBlock = [
            "\`\`\`",
            horizontalLine,
            this.assembleRow("STRUCTURE", "STRESS", "ARMOR"),
            this.assembleRow(`${stats.structure}`, `${stats.stress}`, `${stats.armor}`),
            horizontalLine,
            this.assembleRow("HP", "EVASION", "E-DEF"),
            this.assembleRow(`${stats.hp}`, `${stats.evasion}`, `${stats.edef}`),
            horizontalLine,
            this.assembleRow("HEATCAP", "SENSORS", "TECH ATTACK"),
            this.assembleRow(`${stats.heatcap}`, `${stats.sensor_range}`, `${stats.tech_attack}`),
            horizontalLine,
            this.assembleRow("REPAIR CAP", "SAVE", "SPEED"),
            this.assembleRow(`${stats.heatcap}`, `${stats.sensor_range}`, `${techAttack}`),
            horizontalLine,
            this.assembleRow("", "SP", ""),
            this.assembleRow("", `${stats.sp}`, ""),
            horizontalLine,
            "\`\`\`"
        ].join("\n")

        const {imageUrl, file} = getLogo(frame.source, this.repo)
        const color = getColor(frame.source, this.repo)

        // const embed = new EmbedBuilder()
        //     .setColor(color ? `#${color}` : null)
        //     .setTitle(`${frame.source} ${frame.name}`)
            // .setAuthor({name: `${frame.source} ${frame.name}`, iconURL: imageUrl})
            // .setDescription(`${frame.mechtype.join('/')} Frame${formatContentPack(frame)}`)
            // .setImage(frame.image_url || "https://d2c79xe1p61csc.cloudfront.net/frames/nodata.png")
            // .setThumbnail(frame.image_url || "https://d2c79xe1p61csc.cloudfront.net/frames/nodata.png")
            // .setFields(
            //     {name: "Size", value: `${frame.stats.size}`, inline: true},
            //     {name: "Mounts", value: `${frame.mounts.join(', ')}`, inline: true},
            //     {name: "STATISTICS", value: ` `, inline: false}, // \u200B
            //     {name: "Structure", value: `${stats.structure}`, inline: true},
            //     {name: "Stress", value: `${stats.stress}`, inline: true},
            //     {name: "Armor", value: `${stats.armor}`, inline: true},
            //     {name: "HP", value: `${stats.hp}`, inline: true},
            //     {name: "Evasion", value: `${stats.evasion}`, inline: true},
            //     {name: "E-Def", value: `${stats.edef}`, inline: true},
            //     {name: "Heatcap", value: `${stats.heatcap}`, inline: true},
            //     {name: "Sensors", value: `${stats.sensor_range}`, inline: true},
            //     {name: "Tech Attack", value: `${stats.tech_attack > 0 ? '+' : ''}${stats.tech_attack}`, inline: true},
            //     {name: "Repair Cap", value: `${stats.repcap}`, inline: true},
            //     {name: "Save", value: `${stats.save}`, inline: true},
            //     {name: "Speed", value: `${stats.speed}`, inline: true},
            //     {name: "SP", value: `${stats.sp}`, inline: false},
                // {name: "Statistics", value: formattedStatBlock, inline: false},
                // ...(frame.traits.map((trait) => this.traitToField(frame.source, trait))),
                // {name: "Core System", value: coreName, inline: false}
            // )
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
                {name: "Statistics", description: formattedStatBlock, inline: false},
                ...(frame.traits.map((trait) => this.traitToField(frame.source, trait))),
                {name: "Core System", description: coreName, inline: false}
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

    private assembleRow(first: string, second: string, third: string): string {
        return "|" + [first, second, third].map((it) => this.statWhitespace(it)).join("|") + "|"
    }

    private statWhitespace(value: string): string {
        const maxSize = 13
        const whiteSpace = maxSize - value.length
        const startingWhitespace = Math.round(whiteSpace / 2)
        return " ".repeat(startingWhitespace) + value + " ".repeat(whiteSpace - startingWhitespace)
    }
}
