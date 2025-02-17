import {IActionData, IDeployableData, ITagData, WeaponType} from "../types/shared-types";
import {
    SearchableAction,
    SearchableBond,
    SearchableBondPower,
    SearchableCoreBonus,
    SearchableFrame,
    SearchableGlossaryItem,
    SearchableICoreSystemData,
    SearchableMod,
    SearchablePilotArmor,
    SearchablePilotGear,
    SearchablePilotWeapon,
    SearchableReserve,
    SearchableSkillTrigger,
    SearchableStatusCondition,
    SearchableSystem,
    SearchableTag,
    SearchableTalent,
    SearchableWeapon
} from "../search/searchable"
import {IWeaponProfile} from "../types/weapon";
import TurndownService from "turndown";
import {IFrameTraitData} from "../types/frame";
import {getEmoji} from "./emoji";
import {
    activationFormat,
    formatContentPack,
    licenseFormat,
    pilotMechActionType,
    replaceVal,
    toTitleCase
} from "./format-utility";
import {isSearchableSystem, isSearchableWeapon} from "./typechecks";
import {Repository} from "./repository";

type PrintableWeaponProfile = IWeaponProfile & { mount: string, type: string }

export const ZERO_SPACE = '\u200B'

// noinspection JSUnusedGlobalSymbols
export class Formatters {
    private readonly turndownService = new TurndownService()
    private readonly repo: Repository

    constructor(repository: Repository) {
        this.repo = repository
    }

    public populateTag(tag: ITagData): string {
        const tagData = this.repo.tags.find(t => t.id === tag.id)

        if (tag.val !== undefined)
            return replaceVal(tagData.name, `${tag.val}`) //For things like HEAT {VAL} Self
        else
            return tagData.name
    }

    public integratedFormat(integrated: string[], source: string) {
        let out = ""

        integrated.forEach(integrated_item_id => {
            const integrated_item = this.repo.weapons.find(w => w.id === integrated_item_id) ||
                this.repo.systems.find(s => s.id === integrated_item_id)
            if (!integrated_item.source) {
                integrated_item.source = source
            }
            if (integrated_item && isSearchableWeapon(integrated_item)) {
                out += this.weaponFormat(integrated_item)
            } else if (integrated_item && isSearchableSystem(integrated_item)) {
                out += this.systemFormat(integrated_item)
            } else {
                console.log(`Couldn't find an integrated item with id ${integrated_item_id}`)
            }
        })
        return out;
    }

    public actionFormat(action: IActionData, customActionName?: string) {
        let activationType = `${pilotMechActionType(action)}${activationFormat(action.activation)}`

        if (action.frequency) {
            activationType += `, *${action.frequency}*`
        }

        const actionName = action.name || customActionName || 'Unnamed Action'
        let out = `**${actionName}** (${activationType})`
        let actionRange
        if (action.range && action.range.length > 0) {
            actionRange = '[' + action.range.map(r => `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        }
        let actionDamage
        if (action.damage && action.damage.length > 0) {
            actionDamage = '[' + action.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        }
        if (actionRange || actionDamage) {
            out += "\n"
            out += actionRange ? actionRange : ""
            out += actionDamage ? actionDamage : ""
        }

        if (action.trigger) {
            out += `\n*Trigger:* ${this.turndownService.turndown(action.trigger)}`
            out += "\n*Effect:* "
        } else {
            out += "\n"
        }

        out += this.turndownService.turndown(action.detail)
        return out;
    }

    public deployableFormatter(dep: IDeployableData) {
        let out = `**${dep.name}** (${dep.type})`

        out += `\nDeployment: ${activationFormat(dep.activation || "Quick Action")}`
        out += `${dep.recall ? ", Recall: " + activationFormat(dep.recall) : ''}${dep.redeploy ? ", Redeploy: " + activationFormat(dep.redeploy) : ''}`

        if (dep.type.includes('Drone')) { //includes type: "OROCHI Drone"
            //Default stats for drones.
            out += `\nSize: ${dep.size || 1 / 2} HP: ${dep.hp || 5} Evasion: ${dep.evasion || 10}`
        } else {
            //Portable bunker still has HP stats
            //Default stats for other deployables, which would just be blank.
            out += `${dep.size ? '\nSize: ' + dep.size : ''} ${dep.hp ? 'HP: ' + dep.hp : ''} ${dep.evasion ? 'Evasion: ' + dep.evasion : ''}`
        }
        out += ` ${dep.edef ? "E-Defense: " + dep.edef : ''} ${dep.armor ? "Armor: " + dep.armor : ''} ${dep.heatcap ? "Heat Cap: " + dep.heatcap : ''}`
        out += ` ${dep.speed ? "Speed: " + dep.speed : ''} ${dep.save ? "Save Target: " + dep.save : ''}`


        let deployableRange
        if (dep.range && dep.range.length > 0) {
            deployableRange = '[' + dep.range.map(r => `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        }
        let deployableDamage
        if (dep.damage && dep.damage.length > 0) {
            deployableDamage = '[' + dep.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        }
        if (deployableRange || deployableDamage) {
            out += "\n"
            out += deployableRange ? deployableRange : ""
            out += deployableDamage ? deployableDamage : ""
        }

        out += `\n${this.turndownService.turndown(dep.detail)}`

        if (dep.actions && dep.actions.length > 0) {
            out += `\n`
            out += dep.actions.map(act => this.actionFormat(act)).join("\n")
        }
        return out;
    }

    private traitFormatter(trait: IFrameTraitData, frame: SearchableFrame) {
        let out = `**${trait.name}:** `
        if (trait.actions && trait.actions.length > 0) {
            trait.actions.forEach(act => out += this.actionFormat(act) + "\n")
        } else {
            out += this.turndownService.turndown(trait.description) + "\n"
        }
        if (trait.integrated) out += this.integratedFormat(trait.integrated, frame.source)
        return out.trim();
    }

    public basicActionFormat(action: SearchableAction, customActionName?: string) {
        const actionType = `${pilotMechActionType(action)}${activationFormat(action.activation)}${formatContentPack(action)}`
        const actionName = action.name || customActionName || 'Unnamed Action'
        return `**${actionName}** (${actionType})\n${this.turndownService.turndown(action.detail)}`;
    }

    public bondFormat(bond: SearchableBond): string {
        const questions = bond.questions.map((it) => {
            const options = it.options.map((option) => `> ${option}`).join("\n")
            return `*${it.question}*\n${options}`
        }).join("\n\n")

        return `**${bond.name}**${formatContentPack(bond)}\n\n` +
            `**Major Ideals:**\n${bond.major_ideals.join("\n")}\n\n` +
            `**Minor Ideals:**\n${bond.minor_ideals.join("\n")}\n\n` +
            `**Questions:**\n${questions}\n\n` +
            `**Powers:**\n${bond.powers.map((it) => it.name).join(", ")}`
    }

    public bondPowerFormat(bondPower: SearchableBondPower): string {
        let frequency: string
        if (bondPower.frequency != undefined) {
            frequency = ` (${bondPower.frequency})`
        } else {
            frequency = ""
        }

        let rank: string
        if (bondPower.master == true) {
            rank = " (Master)"
        } else if (bondPower.veteran == true) {
            rank = " (Veteran)"
        } else {
            rank = ""
        }

        let prerequisite: string;
        if (bondPower.prerequisite) {
            prerequisite = `*${bondPower.prerequisite}*\n\n`
        } else {
            prerequisite = ""
        }

        return `**${bondPower.name}**${frequency}${formatContentPack(bondPower)}\n` +
            `${bondPower.power_name} Bond Power${rank}\n\n` +
            `${prerequisite}${this.turndownService.turndown(bondPower.description)}`
    }

    public cbFormat(cb: SearchableCoreBonus) {
        let out = `**${cb.name}** (${cb.source} Core Bonus)${formatContentPack(cb)}\n` +
            `${this.turndownService.turndown(cb.effect)}\n`
        if (cb.integrated) out += this.integratedFormat(cb.integrated, cb.source)
        return out
    }

    public coreFormat(core: SearchableICoreSystemData) {
        const coreName = core.name || core.passive_name || core.active_name
        let out = `**${coreName}** (${core.source} CORE System)${formatContentPack(core)}`

        if (core.passive_name) {
            out += `\n**Passive: ${core.passive_name}**`
        }
        if (core.passive_effect) {
            out += `\n${this.turndownService.turndown(core.passive_effect)}`
        }
        if (core.passive_actions) {
            core.passive_actions.forEach(pa => out += `\n${this.actionFormat(pa)}`)
        }

        if (core.integrated) {
            out += `\n${this.integratedFormat(core.integrated, core.source)}`
        }
        if (core.deployables) {
            core.deployables.forEach(dep => out += `\n${this.deployableFormatter(dep)}`)
        }
        if (core.tags) {
            core.tags.forEach(t => out += this.populateTag(t))
        }

        if (core.active_name) {
            out += `\n**Active: ${core.active_name}** (Activation: ${activationFormat(core.activation)})`
            out += `\n${this.turndownService.turndown(core.active_effect)}`
        }
        if (core.active_actions) {
            core.active_actions.forEach(aa => out += `\n${this.actionFormat(aa)}`)
        }

        return out
    }

    public frameFormat(frame: SearchableFrame) {
        const {stats, core_system} = frame
        const coreName = core_system.name || core_system.passive_name || core_system.active_name
        return `**${frame.source} ${frame.name}** - ${frame.mechtype.join('/')} Frame${formatContentPack(frame)}\n` +
            `SIZE ${stats.size}, ARMOR ${stats.armor}, SAVE ${stats.save}, SENSOR ${stats.sensor_range}\n` +
            `HP ${stats.hp}, REPAIR CAP ${stats.repcap}        E-DEF ${stats.edef}, TECH ATTACK ${stats.tech_attack > 0 ? '+' : ''}${stats.tech_attack}, SP ${stats.sp}\n` +
            `EVASION ${stats.evasion}, SPEED ${stats.speed}        HEATCAP ${stats.heatcap}\n` +
            `**Mounts:** ${frame.mounts.join(', ')}` +
            `\n${frame.traits.map(trait => this.traitFormatter(trait, frame)).join('\n')}\n` +
            `CORE System: **${coreName}**`
    }

    public glossaryFormat(glossaryEntry: SearchableGlossaryItem) {
        return `**${glossaryEntry.name}${formatContentPack(glossaryEntry)}:** ${this.turndownService.turndown(glossaryEntry.description)}`
    }

    public modFormat(mod: SearchableMod) {
        let out = `**${mod.name}** (${licenseFormat(mod)} Mod)${formatContentPack(mod)}\n${mod.sp} SP`
        if (mod.tags) {
            out += `, ${mod.tags.map(tag => this.populateTag(tag)).join(', ').trim()}\n`;
        } else {
            out += '\n'
        }
        let combined_types: WeaponType[] = []
        let combined_sizes: WeaponType[] = []
        if (mod.allowed_types) {
            combined_types = mod.allowed_types
            if (mod.restricted_types) {
                combined_types = combined_types.filter(t => !mod.restricted_types.includes(t))
            }
        }
        if (mod.allowed_sizes) {
            combined_sizes = mod.allowed_sizes
            if (mod.restricted_sizes) {
                combined_sizes = combined_sizes.filter(s => !mod.restricted_sizes.includes(s))
            }
        }
        out += `${combined_types.length > 0 ? 'Can be applied to these weapon types: ' + combined_types.join(', ').trim() + "\n" : ''}`
        out += `${combined_sizes.length > 0 ? 'Can be applied to these weapon sizes: ' + combined_sizes.join(', ').trim() + "\n" : ''}`

        out += `${this.turndownService.turndown(mod.effect)}`

        return out
    }

    public pilotArmorFormat(pilotArmor: SearchablePilotArmor) {
        let out = `**${pilotArmor.name}** (Pilot Armor)${formatContentPack(pilotArmor)}`
        if (pilotArmor.bonuses && pilotArmor.bonuses.length > 0) {
            out += "\n" + pilotArmor.bonuses.map((it) => {
                return `${toTitleCase(it.id.replace("_", " "))}: ${it.val}`
            }).join("\n").replace(/,\s*$/, "")
        }
        if (pilotArmor.tags) {
            const populatedTags = pilotArmor.tags
                .filter((it) => it.id != "tg_personal_armor")
                .map(tag => this.populateTag(tag))
            if (populatedTags.length > 0) {
                out += "\n" + populatedTags.join(', ').trim()
            }
        }
        if (pilotArmor.effect) {
            out += "\n" + this.turndownService.turndown(pilotArmor.effect)
        }
        if (pilotArmor.actions && pilotArmor.actions.length > 0) {
            out += "\n" + pilotArmor.actions.map((it) => this.actionFormat(it)).join("\n")
        }
        if (pilotArmor.description) {
            out += `\n\n${this.turndownService.turndown(pilotArmor.description)}`
        }
        return out;
    }

    public pilotGearFormat(pilotGear: SearchablePilotGear) {
        let out = `**${pilotGear.name}** (Pilot Gear)${formatContentPack(pilotGear)}`
        if (pilotGear.tags) {
            const populatedTags = pilotGear.tags
                .filter((it) => it.id != "tg_gear")
                .map(tag => this.populateTag(tag))
            if (populatedTags.length > 0) {
                out += "\n" + populatedTags.join(', ').trim()
            }
        }
        if (pilotGear.effect) {
            out += "\n" + this.turndownService.turndown(pilotGear.effect)
        }
        if (pilotGear.actions && pilotGear.actions.length > 0) {
            out += "\n\n" + pilotGear.actions.map(action => this.actionFormat(action)).join(', ').trim()
        }
        if (pilotGear.description) {
            out += "\n\n" + this.turndownService.turndown(pilotGear.description)
        }
        return out;
    }

    public pilotWeaponFormat(pilotWeapon: SearchablePilotWeapon): string {
        let out = `**${pilotWeapon.name} (Pilot Weapon)${formatContentPack(pilotWeapon)}**`
        if (pilotWeapon.tags) {
            const populatedTags = pilotWeapon.tags
                .filter((it) => it.id != "tg_pilot_weapon")
                .map(tag => this.populateTag(tag))
            if (populatedTags.length > 0) {
                out += "\n" + populatedTags.join(', ').trim()
            }
        }

        let weaponRange
        if (pilotWeapon.range && pilotWeapon.range.length > 0) {
            weaponRange = '[' + pilotWeapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        }
        let weaponDamage
        if (pilotWeapon.damage && pilotWeapon.damage.length > 0) {
            weaponDamage = '[' + pilotWeapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        }
        if (weaponRange || weaponDamage) {
            out += "\n"
            out += weaponRange ? weaponRange : ""
            out += weaponDamage ? weaponDamage : ""
        }

        if (pilotWeapon.effect) {
            out += "\n" + this.turndownService.turndown(pilotWeapon.effect)
        }

        if (pilotWeapon.actions && pilotWeapon.actions.length > 0) {
            out += "\n" + pilotWeapon.actions.map(act => out += this.actionFormat(act)).join("\n")
        }

        if (pilotWeapon.deployables) {
            out += "\nThis weapon grants the following deployables:\n"
            pilotWeapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        if (pilotWeapon.description) {
            out += "\n\n" + this.turndownService.turndown(pilotWeapon.description)
        }

        return out
    }

    public reservesFormat(reserve: SearchableReserve) {
        const header = `**${reserve.name}** - Reserve (${reserve.type}: ${reserve.label})${formatContentPack(reserve)}`
        const description = this.turndownService.turndown(reserve.description)
        let action = ""
        if (reserve.actions) {
            action = "\n\n" + reserve.actions.map((it) => this.actionFormat(it)).join("\n")
        }
        let deployables = ""
        if (reserve.deployables) {
            deployables = "\n\n" + reserve.deployables.map((it) => this.deployableFormatter(it)).join("\n")
        }
        return `${header}\n${description}${action}${deployables}`
    }

    public skillFormat(skill: SearchableSkillTrigger) {
        return `**${skill.name}** (Pilot Skill)${formatContentPack(skill)}\n${this.turndownService.turndown(skill.detail)}`
    }

    public statusFormat(object: SearchableStatusCondition) {
        return `**${object.name}** (${object.type})${formatContentPack(object)}\n${this.turndownService.turndown(object.effects)}`
    }


    public systemFormat(system: SearchableSystem) {
        let out = `**${system.name}**`
        if (system.id) {
            const frame = this.repo.getFrameForIntegratedId(system.id)

            if (frame) {
                out += ` (${frame.source} ${frame.name} Integrated`
            } else {
                out += ` (${licenseFormat(system)}`
            }
        }
        out += ` ${system.data_type || system.type || ''})${formatContentPack(system)}\n`
        let tagsEtc = []
        if (system.sp) tagsEtc.push(`${system.sp} SP`)
        if (system.tags) tagsEtc = tagsEtc.concat(system.tags.map(tag => this.populateTag(tag)))
        out += `${tagsEtc.join(', ')}\n`
        if (system.effect) out += `${this.turndownService.turndown(system.effect)}\n`
        if (system.actions && system.actions.length > 0) {
            out += "\n"
            out += system.actions.map((action) => (action.name ? this.actionFormat(action) : this.actionFormat(action, "Use " + system.name))).join("\n")
        }
        if (system.deployables && system.deployables.length > 0) {
            out += "\n"
            out += system.deployables.map(dep => this.deployableFormatter(dep)).join('\n')
        }
        if (system.ammo && system.ammo.length > 0) {
            out += "\n"
            out += system.ammo.map((it) => `* ${it.name} (${it.allowed_types.map((it) => this.formatAllowedType(it)).join(", ")}) - ${it.detail}`).join('\n')
        }
        return out
    }

    private formatAllowedType(allowedType: string): string {
        if (allowedType.toLowerCase() == "cqb") {
            return "CQB"
        } else {
            return allowedType.slice(0, 1).toUpperCase() + allowedType.slice(1)
        }
    }

    public tagFormat(object: SearchableTag) {
        return `**${replaceVal(object.name, "X")}** (${object.data_type})${formatContentPack(object)}\n` +
            `  ${this.turndownService.turndown(replaceVal(object.description, "X"))}`
    }

    public talentFormat(talent: SearchableTalent) {
        let out = `**${talent.name}** - Talent${formatContentPack(talent)}\n`
        talent.ranks.forEach((rank, i) => {
            out += `${getEmoji(`rank_${(i + 1)}`)} **${rank.name}**:${this.turndownService.turndown(rank.description)}\n`
            if (rank.actions && rank.actions.length > 0) {
                rank.actions.forEach(act => out += this.actionFormat(act))
                out += "\n"
            }
        })
        return out;
    }

    public weaponFormat(weapon: SearchableWeapon): string {
        let out = `**${weapon.name}**`
        if (weapon.id) {
            const frame = this.repo.getFrameForIntegratedId(weapon.id)
            if (frame) {
                out += ` (${frame.source} ${frame.name} Integrated ${weapon.data_type})`
            } else {
                out += ` (${[licenseFormat(weapon), weapon.data_type].join(' ').trim()})`
            }
        }
        out += `${formatContentPack(weapon)}`

        let tagsEtc = [`${weapon.mount} ${weapon.type}`]
        if (weapon.sp) tagsEtc.push(`${weapon.sp} SP`)
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}`

        const hasWeaponRange = weapon.range && weapon.range.length
        const hasWeaponDamage = weapon.damage && weapon.damage.length
        if (hasWeaponRange || hasWeaponDamage) out += '\n'
        if (hasWeaponRange) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (hasWeaponDamage) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'

        if (weapon.effect) out += "\n" + this.turndownService.turndown(weapon.effect)
        if (weapon.on_attack) out += `\nOn Attack: ${this.turndownService.turndown(weapon.on_attack)}`
        if (weapon.on_hit) out += `\nOn Hit: ${this.turndownService.turndown(weapon.on_hit)}`
        if (weapon.on_crit) out += `\nOn Crit: ${this.turndownService.turndown(weapon.on_crit)}`

        if (weapon.actions && weapon.actions.length > 0) {
            out += '\nThis weapon grants the following actions:'
            weapon.actions.forEach(act => out += `\n\n${this.actionFormat(act)}`)
        }

        if (weapon.deployables && weapon.deployables.length > 0) {
            out += '\nThis weapon grants the following deployables:'
            weapon.deployables.forEach(dep => out += `\n\n${this.deployableFormatter(dep)}`)
        }

        if (weapon.profiles && weapon.profiles.length > 0) {
            out += '\nThis weapon has the following profiles:'
            weapon.profiles.forEach(profile =>
                out += `\n\nProfile: ${this.weaponProfileFormat(this.weaponProfile(weapon, profile))}`)
        }
        return out
    }

    public weaponProfile(weapon: SearchableWeapon, profile: IWeaponProfile): PrintableWeaponProfile {
        return ({mount: weapon.mount, type: weapon.type, ...profile})
    }

    public weaponProfileFormat(weapon: PrintableWeaponProfile): string {
        let out = `**${weapon.name}**`
        let tagsEtc = [`${weapon.mount} ${weapon.type}`]
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}`

        const hasWeaponRange = weapon.range && weapon.range.length
        const hasWeaponDamage = weapon.damage && weapon.damage.length
        if (hasWeaponRange || hasWeaponDamage) out += '\n'
        if (hasWeaponRange) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (hasWeaponDamage) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'

        if (weapon.effect) out += "\n" + this.turndownService.turndown(weapon.effect)
        if (weapon.on_attack) out += `\nOn Attack: ${this.turndownService.turndown(weapon.on_attack)}`
        if (weapon.on_hit) out += `\nOn Hit: ${this.turndownService.turndown(weapon.on_hit)}`
        if (weapon.on_crit) out += `\nOn Crit: ${this.turndownService.turndown(weapon.on_crit)}`

        if (weapon.actions && weapon.actions.length > 0) {
            out += '\nThis weapon grants the following actions:'
            weapon.actions.forEach(act => out += `\n\n${this.actionFormat(act)}`)
        }

        if (weapon.deployables && weapon.deployables.length > 0) {
            out += '\nThis weapon grants the following deployables:'
            weapon.deployables.forEach(dep => out += `\n\n${this.deployableFormatter(dep)}`)
        }
        return out
    }
}
