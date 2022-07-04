import {IActionData, IDeployableData, ITagData, WeaponType} from "../types/shared-types";
import LancerData from "../types/lancer-data";
import {
    SearchableAction,
    SearchableBond,
    SearchableBondPower,
    SearchableCoreBonus,
    SearchableData,
    SearchableFrame,
    SearchableGlossaryItem,
    SearchableICoreSystemData,
    SearchableMod,
    SearchablePilotArmor,
    SearchablePilotGear,
    SearchablePilotWeapon,
    SearchableSkillTrigger,
    SearchableStatusCondition,
    SearchableSystem,
    SearchableTag,
    SearchableTalent,
    SearchableWeapon
} from "../types/searchable"
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

export default class LancerFormatter {
    private turndownService = new TurndownService()
    private weapons: SearchableWeapon[]
    private systems: SearchableSystem[]
    private tags: SearchableTag[]

    constructor(data: LancerData[]) {
        this.weapons = data.map((it) => it.weapons).flat()
        this.systems = data.map((it) => it.systems).flat()
        this.tags = data.map((it) => it.tags).flat()
    }

    public format(data: SearchableData): string {
        console.log(`formatting ${data.name}`)
        switch (data.kind) {
            case "Action":
                return this.basicActionFormat(data)
            case "Bond":
                return this.bondFormat(data)
            case "Bond Power":
                return this.bondPowerFormat(data)
            case "Core Bonus":
                return this.cbFormat(data)
            case "Core System":
                return this.coreFormat(data)
            case "Frame":
                return this.frameFormat(data)
            case "Glossary":
                return this.glossaryFormat(data)
            case "Mod":
                return this.modFormat(data)
            case "Pilot Armor":
                return this.pilotArmorFormat(data)
            case "Pilot Gear":
                return this.pilotGearFormat(data)
            case "Pilot Weapon":
                return this.pilotWeaponFormat(data)
            case "Skill":
                return this.skillFormat(data)
            case "Status":
                return this.statusFormat(data)
            case "System":
                return this.systemFormat(data)
            case "Tag":
                return this.tagFormat(data)
            case "Talent":
                return this.talentFormat(data)
            case "Weapon":
                return this.weaponFormat(data)
        }
    }

    private basicActionFormat(action: SearchableAction) {
        const actionType = `${pilotMechActionType(action)}${activationFormat(action.activation)}${formatContentPack(action)}`
        return `**${action.name}** (${actionType})\n${this.turndownService.turndown(action.detail)}`
    }

    private bondFormat(bond: SearchableBond): string {
        const questions = bond.questions.map((it) => {
            const options = it.options.map((option) => `> ${option}`).join("\n")
            return `*${it.question}*\n${options}`
        }).join("\n\n")

        return `**${bond.name}**${formatContentPack(bond)}\n\n` +
            `**Major Ideals:**\n${bond.major_ideals.join("\n")}\n\n` +
            `**Minor Ideals:**\n${bond.minor_ideals.join("\n")}\n\n` +
            `**Questions:**\n${questions}`
    }

    private bondPowerFormat(bondPower: SearchableBondPower): string {
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
            `${bondPower.power_name} Bond Power${rank}\n` +
            `${prerequisite}${bondPower.description}`
    }

    private cbFormat(cb: SearchableCoreBonus) {
        let out = `**${cb.name}** (${cb.source} Core Bonus)${formatContentPack(cb)}\n` +
            `${this.turndownService.turndown(cb.effect)}\n`
        if (cb.integrated) out += this.integratedFormat(cb.integrated)
        return out
    }

    private coreFormat(core: SearchableICoreSystemData) {
        const corePassiveName = core.passive_name ? `**Passive: ${core.passive_name}**\n` : ""
        const corePassiveEffect = core.passive_effect ? `${this.turndownService.turndown(core.passive_effect)}\n` : ""
        const corePassiveActions = core.passive_actions ? core.passive_actions.map((it) => this.actionFormat(it)).join("\n") + "\n" : ""
        const coreIntegrated = core.integrated ? this.integratedFormat(core.integrated) : ""
        const coreDeployables = core.deployables ? core.deployables.map(dep => this.deployableFormatter(dep)).join("\n") : ""
        const coreTags = core.tags ? core.tags.map((it) => this.populateTag(it)).join("\n") : ""
        const coreActiveName = core.active_name ? `**Active: ${core.active_name}** (Activation: ${activationFormat(core.activation)})\n${this.turndownService.turndown(core.active_effect)}` : ""
        const coreActiveActions = core.active_actions ? core.active_actions.map((it) => this.actionFormat(it)).join("\n") : ""

        return `**${core.name}** (${core.source} CORE System)${formatContentPack(core)}\n` +
            corePassiveName + corePassiveEffect + corePassiveActions +
            coreIntegrated + coreDeployables + coreTags +
            coreActiveName + coreActiveActions
    }

    private frameFormat(frame: SearchableFrame) {
        const {stats, core_system} = frame
        const coreName = core_system.name || core_system.passive_name || core_system.active_name
        let out = `**${frame.source} ${frame.name}** - ${frame.mechtype.join('/')} Frame${formatContentPack(frame)}\n` +
            `SIZE ${stats.size}, ARMOR ${stats.armor}, SAVE ${stats.save}, SENSOR ${stats.sensor_range}\n` +
            `HP ${stats.hp}, REPAIR CAP ${stats.repcap}        E-DEF ${stats.edef}, TECH ATTACK ${stats.tech_attack > 0 ? '+' : ''}${stats.tech_attack}, SP ${stats.sp}\n` +
            `EVASION ${stats.evasion}, SPEED ${stats.speed}        HEATCAP ${stats.heatcap}\n` +
            `**Mounts:** ${frame.mounts.join(', ')}`
        out += `\n${frame.traits.map(trait => this.traitFormatter(trait)).join('\n')}\n`
        out += `CORE System: **${coreName}**`
        return out
    }

    private glossaryFormat(glossaryEntry: SearchableGlossaryItem) {
        return `**${glossaryEntry.name}${formatContentPack(glossaryEntry)}:** ${this.turndownService.turndown(glossaryEntry.description)}`
    }

    private modFormat(mod: SearchableMod) {
        let out = `**${mod.name}** (${licenseFormat(mod)} Mod)${formatContentPack(mod)}\n${mod.sp} SP`
        if (mod.tags && mod.tags.length > 0) {
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

    private pilotArmorFormat(parmor: SearchablePilotArmor) {
        let out = `**${parmor.name}** (Pilot Armor)${formatContentPack(parmor)}\n`
        if (parmor.bonuses && parmor.bonuses.length > 0) {
            parmor.bonuses.forEach((bonus) => {
                let bonus_name = bonus.id.replace("_", " ")
                bonus_name = toTitleCase(bonus_name)
                out += `**${bonus_name}:** ${bonus.val}, `
            })
            out = out.replace(/,\s*$/, "")
            out += '\n'
        }
        out += `${this.turndownService.turndown(parmor.description)}`
        return out;
    }

    private pilotGearFormat(pgear: SearchablePilotGear) {
        let out = `**${pgear.name}** (Pilot Gear)${formatContentPack(pgear)}\n`
        if (pgear.tags) {
            out += pgear.tags.map(tag => this.populateTag(tag)).join(', ').trim() + "\n"
        }
        out += this.turndownService.turndown(pgear.description) + "\n"
        if (pgear.actions && pgear.actions.length > 0) {
            out += 'This pilot gear grants the following actions:\n'
            out += pgear.actions.map(action => `${action.name} (${action.activation})`).join(', ').trim()
        }
        return out;
    }

    private pilotWeaponFormat(weapon: SearchablePilotWeapon): string {
        let out = `**${weapon.name}${formatContentPack(weapon)}**`
        let tagsEtc = [`-- ${weapon.type || '--'}`]
        if (weapon.tags) {
            tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        }
        out += `\n${tagsEtc.join(', ')}\n`

        if (weapon.range && weapon.range.length) {
            out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        }
        if (weapon.damage && weapon.damage.length) {
            out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        }
        out += '\n'

        if (weapon.actions && weapon.actions.length > 0) {
            out += 'This weapon grants the following actions:\n'
            weapon.actions.forEach(act => out += this.actionFormat(act))
        }

        if (weapon.deployables && weapon.deployables.length > 0) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        return out
    }

    private skillFormat(skill: SearchableSkillTrigger) {
        return `**${skill.name}** (Pilot Skill)${formatContentPack(skill)}\n${this.turndownService.turndown(skill.detail)}`
    }

    private statusFormat(object: SearchableStatusCondition) {
        return `**${object.name}** (${object.type})${formatContentPack(object)}\n${this.turndownService.turndown(object.effects)}`
    }

    private systemFormat(system: SearchableSystem) {
        let out = `**${system.name}** (${licenseFormat(system)} ${system.kind})${formatContentPack(system)}\n`
        let tagsEtc = []

        if (system.sp) {
            tagsEtc.push(`${system.sp} SP`)
        }
        if (system.tags && system.tags.length > 0) {
            tagsEtc = tagsEtc.concat(system.tags.map(tag => this.populateTag(tag)))
            out += `${tagsEtc.join(', ')}\n`
        }
        if (system.effect) {
            out += `${this.turndownService.turndown(system.effect)}\n`
        }
        if (system.actions && system.actions.length > 0) {
            out += `Gain the following actions:\n`
            system.actions.forEach(action => {
                out += (action.name ? this.actionFormat(action) : this.actionFormat(action, "Use " + system.name)) + "\n"
            })
        }
        if (system.deployables && system.deployables.length > 0) {
            out += `Gain the following deployables:\n`
            out += `${system.deployables.map(dep => this.deployableFormatter(dep)).join('\n')}\n`
        }
        return out
    }

    private tagFormat(object: SearchableTag) {
        return `**${replaceVal(object.name, "X")}** (${object.kind})${formatContentPack(object)}\n` +
            `  ${this.turndownService.turndown(replaceVal(object.description, "X"))}`
    }

    private talentFormat(talent: SearchableTalent) {
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

    private weaponFormat(weapon: SearchableWeapon | PrintableWeaponProfile): string {
        let out = `**${weapon.name}**`
        if (weapon.kind == "Weapon") {
            if (weapon.id && !weapon.id.endsWith('_integrated')) {
                out += ` (${[licenseFormat(weapon), weapon.kind].join(' ').trim()})`
            }
            out += `${formatContentPack(weapon)}`
        }

        let tagsEtc = [`${weapon.mount || '--'} ${weapon.type || '--'}`]
        if (weapon.kind == "Weapon" && weapon.sp) {
            tagsEtc.push(`${weapon.sp} SP`)
        }
        if (weapon.tags) {
            tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        }
        out += `\n${tagsEtc.join(', ')}\n`

        if (weapon.range && weapon.range.length) {
            out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        }
        if (weapon.damage && weapon.damage.length) {
            out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        }
        out += '\n'

        if (weapon.effect) {
            out += this.turndownService.turndown(weapon.effect) + "\n"
        }
        if (weapon.on_attack) {
            out += `On Attack: ${this.turndownService.turndown(weapon.on_attack)}\n`
        }
        if (weapon.on_hit) {
            out += `On Hit: ${this.turndownService.turndown(weapon.on_hit)}\n`
        }
        if (weapon.on_crit) {
            out += `On Crit: ${this.turndownService.turndown(weapon.on_crit)}\n`
        }

        if (weapon.actions && weapon.actions.length > 0) {
            out += 'This weapon grants the following actions:\n'
            weapon.actions.forEach(act => out += this.actionFormat(act))
        }

        if (weapon.deployables && weapon.deployables.length > 0) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        if (weapon.kind == "Weapon") {
            if (weapon.profiles && weapon.profiles.length > 0) {
                weapon.profiles.forEach(profile =>
                    out += `Profile: ${this.weaponFormat(this.weaponProfile(weapon, profile))}\n`)
            }
        }
        return out
    }

    private weaponProfile(weapon: SearchableWeapon, profile: IWeaponProfile): PrintableWeaponProfile {
        return ({...profile, kind: "Weapon Profile", mount: weapon.mount, type: weapon.type})
    }

    private populateTag(tag: ITagData): string {
        const tagData = this.tags.find(t => t.id === tag.id)

        if (tag.val !== undefined)
            return replaceVal(tagData.name, `${tag.val}`) //For things like HEAT {VAL} Self
        else
            return tagData.name
    }

    private integratedFormat(integrated: string[]) {
        let out = ""

        integrated.forEach(integrated_item_id => {
            const integrated_item = this.weapons.find(w => w.id === integrated_item_id) ||
                this.systems.find(s => s.id === integrated_item_id)
            if (integrated_item && integrated_item.kind == "Weapon") {
                out += this.weaponFormat(integrated_item)
            } else if (integrated_item && integrated_item.kind == "System") {
                out += this.systemFormat(integrated_item)
            } else {
                console.log(`Couldn't find an integrated item with id ${integrated_item_id}`)
            }
        })
        return out;
    }

    private actionFormat(action: IActionData, customActionName?: string) {
        let activationType = `${pilotMechActionType(action)}${activationFormat(action.activation)}`
        if (action.frequency) {
            activationType += `, *${action.frequency}*`
        }
        const actionName = action.name || customActionName || 'Unnamed Action'
        const activationTrigger = action.trigger ? `*Trigger:* ${this.turndownService.turndown(action.trigger)}\n*Effect:* ` : ""
        const activationDetail = this.turndownService.turndown(action.detail)
        return `**${actionName}** (${activationType})\n${activationTrigger}${activationTrigger}${activationDetail}\n`
    }

    private deployableFormatter(dep: IDeployableData) {
        let deployable: string;
        if (dep.type.includes("Drone")) {
            deployable = `Size: ${dep.size || 1 / 2} HP: ${dep.hp || 5} Evasion: ${dep.evasion || 10}`
        } else {
            deployable = `${dep.size ? 'Size: ' + dep.size : ''} ${dep.hp ? 'HP: ' + dep.hp : ''} ${dep.evasion ? 'Evasion: ' + dep.evasion : ''}`
        }

        let actions: string;
        if (dep.actions && dep.actions.length > 0) {
            actions = `This deployable grants the following actions:\n` +
                dep.actions.map(act => this.actionFormat(act)).join("\n")
        } else {
            actions = ""
        }

        return `**${dep.name}** (${dep.type})\n` +
            `Deployment: ${activationFormat(dep.activation || "Quick Action")}` +
            `${dep.recall ? ", Recall: " + activationFormat(dep.recall) : ''}` +
            `${dep.redeploy ? ", Redeploy: " + activationFormat(dep.redeploy) : ''}\n` +
            `${deployable}` +
            ` ${dep.edef ? "E-Defense: " + dep.edef : ""} ${dep.armor ? "Armor: " + dep.armor : ""} ` +
            `${dep.heatcap ? "Heat Cap: " + dep.heatcap : ""}` +
            ` ${dep.speed ? "Speed: " + dep.speed : ""} ${dep.save ? "Save Target: " + dep.save : ""}\n` +
            `${this.turndownService.turndown(dep.detail)}\n` +
            `${actions}`
    }

    private traitFormatter(trait: IFrameTraitData) {
        let traitActions: string
        if (trait.actions && trait.actions.length > 0) {
            traitActions = trait.actions.map(act => this.actionFormat(act)).join("\n")
        } else {
            traitActions = ""
        }

        let traitIntegration: string = trait.integrated ? `${this.integratedFormat(trait.integrated)}` : ""

        return `**${trait.name}:**${traitActions}\n` +
            `${this.turndownService.turndown(trait.description)}` +
            traitIntegration
    }
}

type PrintableWeaponProfile = IWeaponProfile & { mount: string, type: string, kind: "Weapon Profile" }
