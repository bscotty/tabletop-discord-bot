import {IActionData, IDeployableData, ITagData, WeaponType} from "../types/shared-types";
import {LancerData} from "../lancer-data-reader";
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

type PrintableWeaponProfile = IWeaponProfile & { mount: string, type: string }

// noinspection JSUnusedGlobalSymbols
export class Formatters {
    private turndownService = new TurndownService()
    private weapons: SearchableWeapon[]
    private systems: SearchableSystem[]
    private tags: SearchableTag[]

    constructor(data: LancerData[]) {
        this.weapons = data.map((it) => it.weapons).flat()
        this.systems = data.map((it) => it.systems).flat()
        this.tags = data.map((it) => it.tags).flat()
    }

    private populateTag(tag: ITagData): string {
        const tagData = this.tags.find(t => t.id === tag.id)

        if (tag.val !== undefined)
            return replaceVal(tagData.name, `${tag.val}`) //For things like HEAT {VAL} Self
        else
            return tagData.name
    }

    private integratedFormat(integrated: string[], source: string) {
        let out = ""

        integrated.forEach(integrated_item_id => {
            const integrated_item = this.weapons.find(w => w.id === integrated_item_id) ||
                this.systems.find(s => s.id === integrated_item_id)
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

    private actionFormat(action: IActionData, customActionName?: string) {
        let activationType = `${pilotMechActionType(action)}${activationFormat(action.activation)}`

        if (action.frequency)
            activationType += `, *${action.frequency}*`

        const actionName = action.name || customActionName || 'Unnamed Action'
        let out = `**${actionName}** (${activationType})\n`

        if (action.trigger)
            out += `*Trigger:* ${this.turndownService.turndown(action.trigger)}\n`
        out += `${action.trigger ? "*Effect:* " : ""}${this.turndownService.turndown(action.detail)}\n`
        return out;
    }

    private deployableFormatter(dep: IDeployableData) {
        let out = `**${dep.name}** (${dep.type})\n`

        out += `Deployment: ${activationFormat(dep.activation || "Quick Action")}`
        out += `${dep.recall ? ", Recall: " + activationFormat(dep.recall) : ''}${dep.redeploy ? ", Redeploy: " + activationFormat(dep.redeploy) : ''}`
        out += "\n"

        if (dep.type.includes('Drone')) { //includes type: "OROCHI Drone"
            //Default stats for drones.
            out += `Size: ${dep.size || 1 / 2} HP: ${dep.hp || 5} Evasion: ${dep.evasion || 10}`
        } else {
            //Portable bunker still has HP stats
            //Default stats for other deployables, which would just be blank.
            out += `${dep.size ? 'Size: ' + dep.size : ''} ${dep.hp ? 'HP: ' + dep.hp : ''} ${dep.evasion ? 'Evasion: ' + dep.evasion : ''}`
        }
        out += ` ${dep.edef ? "E-Defense: " + dep.edef : ''} ${dep.armor ? "Armor: " + dep.armor : ''} ${dep.heatcap ? "Heat Cap: " + dep.heatcap : ''}`
        out += ` ${dep.speed ? "Speed: " + dep.speed : ''} ${dep.save ? "Save Target: " + dep.save : ''}\n`

        out += `${this.turndownService.turndown(dep.detail)}\n`

        if (dep.actions && dep.actions.length > 0) {
            out += `This deployable grants the following actions:\n`
            dep.actions.forEach(act => out += `${this.actionFormat(act)}\n`)
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
            `**Questions:**\n${questions}`
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
            `${bondPower.power_name} Bond Power${rank}\n` +
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
        let out = `**${coreName}** (${core.source} CORE System)${formatContentPack(core)}\n`

        if (core.passive_name) {
            out += `**Passive: ${core.passive_name}**\n`
        }
        if (core.passive_effect) {
            out += `${this.turndownService.turndown(core.passive_effect)}\n`
        }
        if (core.passive_actions) {
            core.passive_actions.forEach(pa => out += `${this.actionFormat(pa)}\n`)
        }

        if (core.integrated) {
            out += this.integratedFormat(core.integrated, core.source)
        }
        if (core.deployables) {
            core.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }
        if (core.tags) {
            core.tags.forEach(t => out += this.populateTag(t))
        }

        if (core.active_name) {
            out += `**Active: ${core.active_name}** `
            out += `(Activation: ${activationFormat(core.activation)})\n`
            if (core.active_effect) {
                out += `${this.turndownService.turndown(core.active_effect)}`
            }
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

    public pilotArmorFormat(parmor: SearchablePilotArmor) {
        let out = `**${parmor.name}** (Pilot Armor)${formatContentPack(parmor)}\n`
        if (parmor.bonuses) {
            for (const bonus_indx in parmor.bonuses) {
                const bonus = parmor.bonuses[bonus_indx]
                let bonus_name = bonus.id.replace("_", " ")
                bonus_name = toTitleCase(bonus_name)
                out += `**${bonus_name}:** ${bonus.val}, `
            }
            out = out.replace(/,\s*$/, "")
            out += '\n'
        }
        out += `${this.turndownService.turndown(parmor.description)}`
        return out;
    }

    public pilotGearFormat(pgear: SearchablePilotGear) {
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

    public pilotWeaponFormat(weapon: SearchablePilotWeapon): string {
        let out = `**${weapon.name}${formatContentPack(weapon)}**`
        let tagsEtc = [`-- ${weapon.type || '--'}`]
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}\n`

        if (weapon.range && weapon.range.length) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (weapon.damage && weapon.damage.length) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        out += '\n'

        if (weapon.actions && weapon.actions.length > 0) {
            out += 'This weapon grants the following actions:\n'
            weapon.actions.forEach(act => out += this.actionFormat(act))
        }

        if (weapon.deployables) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        return out
    }

    public skillFormat(skill: SearchableSkillTrigger) {
        return `**${skill.name}** (Pilot Skill)${formatContentPack(skill)}\n${this.turndownService.turndown(skill.detail)}`
    }

    public statusFormat(object: SearchableStatusCondition) {
        return `**${object.name}** (${object.type})${formatContentPack(object)}\n${this.turndownService.turndown(object.effects)}`
    }


    public systemFormat(system: SearchableSystem) {
        let out = `**${system.name}** (${licenseFormat(system)} ${system.data_type || system.type || ''})${formatContentPack(system)}\n`
        let tagsEtc = []
        if (system.sp) tagsEtc.push(`${system.sp} SP`)
        if (system.tags) tagsEtc = tagsEtc.concat(system.tags.map(tag => this.populateTag(tag)))
        out += `${tagsEtc.join(', ')}\n`
        if (system.effect) out += `${this.turndownService.turndown(system.effect)}\n`
        if (system.actions) {
            out += `Gain the following actions:\n`
            system.actions.forEach(action => {
                out += (action.name ? this.actionFormat(action) : this.actionFormat(action, "Use " + system.name)) + "\n"
            })
        }
        if (system.deployables) {
            out += `Gain the following deployables:\n${system.deployables.map(dep => this.deployableFormatter(dep)).join('\n')}\n`
        }
        return out
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
        if (weapon.id && !weapon.id.endsWith('_integrated')) {
            out += ` (${[licenseFormat(weapon), weapon.data_type].join(' ').trim()})`
        }
        out += `${formatContentPack(weapon)}`

        let tagsEtc = [`${weapon.mount || '--'} ${weapon.type || '--'}`]
        if (weapon.sp) tagsEtc.push(`${weapon.sp} SP`)
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}\n`

        if (weapon.range && weapon.range.length) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (weapon.damage && weapon.damage.length) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        out += '\n'

        if (weapon.effect) out += this.turndownService.turndown(weapon.effect) + "\n"
        if (weapon.on_attack) out += `On Attack: ${this.turndownService.turndown(weapon.on_attack)}\n`
        if (weapon.on_hit) out += `On Hit: ${this.turndownService.turndown(weapon.on_hit)}\n`
        if (weapon.on_crit) out += `On Crit: ${this.turndownService.turndown(weapon.on_crit)}\n`

        if (weapon.actions && weapon.actions.length > 0) {
            out += 'This weapon grants the following actions:\n'
            weapon.actions.forEach(act => out += this.actionFormat(act))
        }

        if (weapon.deployables && weapon.deployables.length > 0) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        if (weapon.profiles && weapon.profiles.length > 0) {
            weapon.profiles.forEach(profile =>
                out += `Profile: ${this.weaponProfileFormat(this.weaponProfile(weapon, profile))} \n`)
        }
        return out
    }

    private weaponProfile(weapon: SearchableWeapon, profile: IWeaponProfile): PrintableWeaponProfile {
        return ({mount: weapon.mount, type: weapon.type, ...profile})
    }

    private weaponProfileFormat(weapon: PrintableWeaponProfile): string {
        let out = `**${weapon.name}**`
        let tagsEtc = [`${weapon.mount} ${weapon.type}`]
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}\n`

        if (weapon.range && weapon.range.length) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (weapon.damage && weapon.damage.length) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        out += '\n'

        if (weapon.effect) out += this.turndownService.turndown(weapon.effect) + "\n"
        if (weapon.on_attack) out += `On Attack: ${this.turndownService.turndown(weapon.on_attack)}\n`
        if (weapon.on_hit) out += `On Hit: ${this.turndownService.turndown(weapon.on_hit)}\n`
        if (weapon.on_crit) out += `On Crit: ${this.turndownService.turndown(weapon.on_crit)}\n`

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
}
