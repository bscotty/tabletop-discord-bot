import {RichFormatter} from "./rich-formatter";
import {SearchableWeapon} from "../search/searchable";
import TurndownService from "turndown";
import {Repository} from "./repository";
import {Formatters, ZERO_SPACE} from "./formatters";
import {ButtonStyle} from "discord.js";
import {getManufacturerLogo} from "./logos";
import {getColor} from "./color";
import {activationFormat, formatContentPack, licenseFormat} from "./format-utility";
import {getEmoji} from "./emoji";
import {IWeaponProfile} from "../types/weapon";
import {DisplayResponse, ResponseButton, ResponseField} from "./display-response";
import {IDeployableData} from "../types/shared-types";
import {actionTraits} from "./rich-action-formatter";

// TODO: Continue to refine
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

        const {imageUrl, file} = getManufacturerLogo(source, this.repo)
        const color = getColor(source, this.repo)


        const fields: ResponseField[] = [
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
        }

        return {
            color: color,
            authorName: `${weapon.name}`,
            authorIconUrl: imageUrl,
            thumbnailUrl: imageUrl,
            description: this.weaponLabel(weapon),
            localAssetFilePaths: file ? [file] : [],
            fields: fields.concat(this.deployablesFields(weapon)),
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

    // TODO: Better ways to do this?
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
        const effect = (weapon.effect) ? this.turndownService.turndown(weapon.effect) : ""

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
            return weapon.actions.map((action) => actionTraits(action, this.turndownService)).flat()
        }
    }

    private deployablesFields(weapon: SearchableWeapon): ResponseField[] {
        if (!weapon.deployables) {
            return []
        }

        function deployableFields(dep: IDeployableData, turndown: TurndownService): ResponseField[] {
            const traits = [
                {name: `**${dep.name}** (${dep.type})`, description: ZERO_SPACE, inline: false},
                {name: "Deployment", description: `${activationFormat(dep.activation || "Quick")}`, inline: true},
            ]
            if (dep.recall) {
                traits.push({name: "Recall", description: activationFormat(dep.recall), inline: true})
            }
            if (dep.redeploy) {
                traits.push({name: "Redeploy", description: activationFormat(dep.redeploy), inline: true})
            }
            traits.push({name: ZERO_SPACE, description: ZERO_SPACE, inline: false})

            if (dep.size || dep.type.includes('Drone')) {
                traits.push({name: "Size", description: `${dep.size || 1 / 2}`, inline: true})
            }
            if (dep.hp || dep.type.includes('Drone')) {
                traits.push({name: "HP", description: `${dep.hp || 5}`, inline: true})
            }
            if (dep.armor) {
                traits.push({name: "Armor", description: `${dep.armor}`, inline: true})
            }
            if (dep.evasion || dep.type.includes('Drone')) {
                traits.push({name: "Evasion", description: `${dep.evasion || 10}`, inline: true})
            }
            if (dep.edef) {
                traits.push({name: "E-Def", description: `${dep.edef}`, inline: true})
            }
            if (dep.heatcap) {
                traits.push({name: "Heat Cap", description: `${dep.heatcap}`, inline: true})
            }
            if (dep.speed) {
                traits.push({name: "Speed", description: `${dep.speed}`, inline: true})
            }
            if (dep.save) {
                traits.push({name: "Save Target", description: `${dep.save}`, inline: true})
            }
            traits.push({name: ZERO_SPACE, description: turndown.turndown(dep.detail), inline: false})

            return traits
        }

        return weapon.deployables.map((it) => deployableFields(it, this.turndownService)).flat();
    }
}