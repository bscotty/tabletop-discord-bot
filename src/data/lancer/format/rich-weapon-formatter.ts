import {RichFormatter} from "./rich-formatter";
import {SearchableWeapon} from "../search/searchable";
import TurndownService from "turndown";
import {Repository} from "./repository";
import {Formatters} from "./formatters";
import {ButtonStyle} from "discord.js";
import {getLogo} from "./logos";
import {getColor} from "./color";
import {activationFormat, formatContentPack, licenseFormat, pilotMechActionType} from "./format-utility";
import {getEmoji} from "./emoji";
import {IWeaponProfile} from "../types/weapon";
import {DisplayResponse, ResponseButton, ResponseField} from "./display-response";

export class RichWeaponFormatter implements RichFormatter<SearchableWeapon> {
    private readonly turndownService: TurndownService
    private readonly repo: Repository
    private readonly formatters: Formatters

    constructor(repository: Repository, formatters: Formatters) {
        this.turndownService = new TurndownService()
        this.repo = repository
        this.formatters = formatters
    }

    richFormat(item: SearchableWeapon): DisplayResponse {
        const weapon = item
        const source = weapon.source ?? this.repo.getFrameForIntegratedId(weapon.id).source

        const {imageUrl, file} = getLogo(source, this.repo)
        const color = getColor(source, this.repo)


        let fields: ResponseField[] = [
            this.weaponTagsEtc(weapon),
            ...this.weaponBonusEffectFields(weapon),
            ...this.weaponActionFields(weapon)
        ]
        let buttons: ResponseButton[]
        if (weapon.profiles && weapon.profiles.length > 0) {
            buttons = weapon.profiles.map(profile => this.createWeaponProfileButton(
                weapon, profile, weapon.profiles.indexOf(profile) != 0))
            fields.push(...buttons[0].updatedFields)
        } else {
            buttons = []
            fields = []
        }

        return {
            color: color,
            authorName: `${weapon.name}`,
            authorIconUrl: imageUrl,
            thumbnailUrl: imageUrl,
            description: `${this.weaponLabel(weapon)}\n${this.weaponText(weapon)}`,
            localAssetFilePaths: file ? [file] : [],
            fields: fields,
            buttons: buttons
        }
    }

    private createWeaponProfileButton(weapon: SearchableWeapon, weaponProfile: IWeaponProfile, enable: boolean): ResponseButton {
        return {
            id: weaponProfile.name,
            name: weaponProfile.name,
            style: ButtonStyle.Primary,
            enabled: enable,
            updatedFields: [
                {
                    name: "Weapon Profile",
                    description: this.formatters.weaponProfileFormat(this.formatters.weaponProfile(weapon, weaponProfile)),
                    inline: false
                }
            ]
        }
    }

    private weaponLabel(weapon: SearchableWeapon): string {
        let out = ""
        if (weapon.id) {
            const frame = this.repo.getFrameForIntegratedId(weapon.id)
            if (frame) {
                out += `${frame.source} ${frame.name} Integrated ${weapon.data_type}`
            } else {
                out += [licenseFormat(weapon), weapon.data_type].join(' ').trim()
            }
        }
        return out + formatContentPack(weapon)
    }

    private weaponTagsEtc(weapon: SearchableWeapon): ResponseField {
        const tags = (weapon.tags) ? weapon.tags.map((tag) => this.formatters.populateTag(tag)) : []
        const tagsEtc: string[] = [
            weapon.sp ? `${weapon.sp} SP` : null,
            ...tags
        ].filter((it) => it != null)

        const ranges = (weapon.range && weapon.range.length) ? '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] ' : ""
        const damage = (weapon.damage && weapon.damage.length) ? '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']' : ""
        const effect = (weapon.effect) ? this.turndownService.turndown(weapon.effect) : null

        return {
            name: `${weapon.mount} ${weapon.type}`,
            description: `${tagsEtc.join(", ")}\n${ranges}${damage}\n${effect}`,
            inline: false
        }
    }

    private weaponBonusEffectFields(weapon: SearchableWeapon): ResponseField[] {
        return [
            (weapon.on_attack) ? {
                name: `On Attack`,
                description: this.turndownService.turndown(weapon.on_attack),
                inline: false
            } : null,
            (weapon.on_hit) ? {
                name: `On Hit`,
                description: this.turndownService.turndown(weapon.on_hit),
                inline: false
            } : null,
            (weapon.on_crit) ? {
                name: `On Crit`,
                description: this.turndownService.turndown(weapon.on_crit),
                inline: false
            } : null
        ].filter((it) => it != null)
    }

    private weaponActionFields(weapon: SearchableWeapon): ResponseField[] {
        if (!weapon.actions) {
            return []
        } else {
            return weapon.actions.map((action) => {
                let activationType = `${pilotMechActionType(action)}${activationFormat(action.activation)}`
                if (action.frequency) {
                    activationType += `, *${action.frequency}*`
                }
                const actionName = `**${action.name}** (${activationType})`

                let trigger = ""
                if (action.trigger) {
                    trigger = `*Trigger:* ${this.turndownService.turndown(action.trigger)}\n*Effect:* `
                }
                const actionDescription = `${trigger}${this.turndownService.turndown(action.detail)}`
                return {name: actionName, description: actionDescription, inline: false}
            })
        }
    }

    private weaponText(weapon: SearchableWeapon): string {
        let out = ""

        if (weapon.deployables && weapon.deployables.length > 0) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.formatters.deployableFormatter(dep))
        }

        // if (weapon.profiles && weapon.profiles.length > 0) {
        //     weapon.profiles.forEach(profile =>
        //         out += `Profile: ${this.formatters.weaponProfileFormat(this.formatters.weaponProfile(weapon, profile))} \n`)
        // }
        return out
    }
}