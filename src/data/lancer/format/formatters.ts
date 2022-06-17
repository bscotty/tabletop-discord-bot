import {ActivationType, IActionData, IDeployableData, ITagData, WeaponType} from "../types/shared-types";
import {
    LancerData,
    SearchableAction,
    SearchableCoreBonus,
    SearchableData,
    SearchableFrame,
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
} from "../lancer-data-reader";
import {isSearchableFrame} from "./typechecks";
import {IWeaponProfile} from "../types/weapon";
import TurndownService from "turndown";
import {IFrameTraitData} from "../types/frame";
// import emoji from "./emoji.json";


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

    private licenseFormat(object: SearchableFrame | SearchableMod | SearchableSystem | SearchableWeapon) {
        if (object.license_level === 0) {
            return `${object.source}`
        } else if (object.source.toUpperCase() === 'EXOTIC') {
            return "Exotic"
        } else if (!isSearchableFrame(object) && object.tags && object.tags.find(tag => tag.id === 'tg_exotic')) {
            return "Exotic"
        } else if (isSearchableFrame(object)) {
            return `${object.source} ${object.license_level}`
        } else {
            return `${object.source} ${object?.license} ${object.license_level}`
        }
    }

    // TODO Use this, especially with homebrew coming
    private formatContentPack(data: SearchableData) {
        return `(From *${data.content_pack}*)`
    }

    private populateTag(tag: ITagData): string {
        //This is for weapons and systems that have tags, though not the tag's entry itself.
        //It reformats the tag's name, not including the tag definition.
        const tagData = this.tags.find(t => t.id === tag.id)
        let fixedTag: string

        if (tag.val !== undefined)
            fixedTag = tagData.name.replace(/\{VAL}/, `${tag.val}`) //For things like HEAT {VAL} Self
        else
            fixedTag = tagData.name
        return fixedTag
        //return `${tagData["name"] + (tag.val? tag.val : '')}`
    }

    private toTitleCase(str: string): string {
        const allWordsNoWhitespace = /\w\S*/g
        return str.replace(allWordsNoWhitespace, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        })
    }

    private integratedFormat(integrated: string[]) {
        let out = ""


        function isWeapon(object: SearchableWeapon | SearchableSystem): object is SearchableWeapon {
            return object.data_type === "weapon"
        }

        function isSystem(object: SearchableWeapon | SearchableSystem): object is SearchableSystem {
            return object.data_type === "system"
        }

        integrated.forEach(integrated_item_id => {
            const integrated_item = this.weapons.find(w => w.id === integrated_item_id) ||
                this.systems.find(s => s.id === integrated_item_id)
            if (integrated_item && isWeapon(integrated_item)) {
                out += this.weaponFormat(integrated_item)
            } else if (integrated_item && isSystem(integrated_item)) {
                out += this.systemFormat(integrated_item)
            } else {
                console.log("Couldn't find an integrated item with that id")
            }
        })
        return out;
    }

    private pilotMechActionType(action: (SearchableAction | IActionData)): string {
        //Determines if an action is mech-only, pilot-only, or available to both.
        if (action.activation && action.activation.toUpperCase() === "DOWNTIME") {
            return ""
        } else if (action.pilot) {
            return "Pilot-Only "
        } else {
            return ""
        }
    }

    private activationFormat(activation: ActivationType): string {
        // Maps built-in activations to pretty-printed output.
        // Activation types that don't need to be renamed (e.g. protocol) are ignored
        const actionTypesPrettyPrint: [string, string][] = [
            ['Free', 'Free Action'],
            ['Quick', 'Quick Action'],
            ['Full', 'Full Action'],
            ['Invade', 'Quick Tech (Invade)'],
            ['Downtime', 'Downtime Action']
        ]
        const prettyPrint: string[] | undefined =
            actionTypesPrettyPrint.find((entry: [string, string]) => entry[0] == activation)

        if (prettyPrint === undefined)
            return activation
        else
            return prettyPrint[0]
    }

    private actionFormat(action: IActionData, customActionName?: string) {
        //Formats an action.
        //customActionName is optional and only used if the action lacks an action.name property
        let actionType = `${this.pilotMechActionType(action)}${this.activationFormat(action.activation)}`
        //Activation string, e.g. "Pilot and Mech Quick Action", or "Quick Tech (Invade))"
        if (action.frequency) actionType += `, *${action.frequency}*`

        let out = `**${action.name || customActionName || 'Unnamed Action'}** (${actionType})\n`
        //Output is Action Name (Activation Type)

        if (action.trigger) out += `*Trigger:* ${this.turndownService.turndown(action.trigger)}\n` //For reactions
        out += `${action.trigger ? "*Effect:* " : ""}${this.turndownService.turndown(action.detail)}\n`
        return out;
    }

    private deployableFormatter(dep: IDeployableData) {
        //Formats a single deployable object.
        let out = `**${dep.name}** (${dep.type})\n`

        //Deploy, redeploy, etc
        out += `Deployment: ${this.activationFormat(dep.activation || "Quick Action")}`
        out += `${dep.recall ? ", Recall: " + this.activationFormat(dep.recall) : ''}${dep.redeploy ? ", Redeploy: " + this.activationFormat(dep.redeploy) : ''}`
        out += "\n"

        //Stats
        if (dep.type.includes('Drone')) { //includes type: "OROCHI Drone"
            //Default stats for drones.
            out += `Size: ${dep.size || 1 / 2} HP: ${dep.hp || 5} Evasion: ${dep.evasion || 10}`
        } else { //Portable bunker still has HP stats
            //Default stats for other deployables, which would just be blank.
            out += `${dep.size ? 'Size: ' + dep.size : ''} ${dep.hp ? 'HP: ' + dep.hp : ''} ${dep.evasion ? 'Evasion: ' + dep.evasion : ''}`
        }
        out += ` ${dep.edef ? "E-Defense: " + dep.edef : ''} ${dep.armor ? "Armor: " + dep.armor : ''} ${dep.heatcap ? "Heat Cap: " + dep.heatcap : ''}`
        out += ` ${dep.speed ? "Speed: " + dep.speed : ''} ${dep.save ? "Save Target: " + dep.save : ''}\n`

        //Details
        out += `${this.turndownService.turndown(dep.detail)}\n`

        //Actions
        if (dep.actions) {
            out += `This deployable grants the following actions:\n`
            dep.actions.forEach(act => out += `${this.actionFormat(act)}\n`)
        }
        return out;
    }

    private traitFormatter(trait: IFrameTraitData) {
        //Formats a single Frame Trait.
        let out = `**${trait.name}:** `
        if (trait.actions && trait.actions.length > 0) {
            //out += "\nThis trait grants the following actions:\n"
            trait.actions.forEach(act => out += this.actionFormat(act) + "\n")
        }
        // if (trait.deployables && trait.deployables.length > 0) {
        //   trait.deployables.forEach(dep => out += deployableFormatter(dep))
        // }
        if (!trait.actions) {
            out += this.turndownService.turndown(trait.description)
        }
        if (trait.integrated) out += this.integratedFormat(trait.integrated)
        return out.trim();
    }

    public basicActionFormat(action: SearchableAction, customActionName?: string) {
        //Formats an action.
        //customActionName is optional and only used if the action lacks an action.name property
        const actionType = `${this.pilotMechActionType(action)}${this.activationFormat(action.activation)}`
        //Activation string, e.g. "Pilot and Mech Quick Action", or "Quick Tech (Invade))"

        let out = `**${action.name || customActionName || 'Unnamed Action'}** (${actionType})\n`
        //Output is Action Name (Activation Type)

        out += `${this.turndownService.turndown(action.detail)}\n`
        return out;
    }

    public cbFormat(cb: SearchableCoreBonus) {
        //For core bonuses.
        let out = `**${cb.name}** (${cb.source} Core Bonus)\n${this.turndownService.turndown(cb.effect)}\n`
        if (cb.integrated) out += this.integratedFormat(cb.integrated)
        return out
    }

    public coreFormat(core: SearchableICoreSystemData) {
        //For core systems.
        const coreName = core.name || core.passive_name || core.active_name
        let out = `**${coreName}** (${core.source} CORE System)\n`

        //Passive info
        if (core.passive_name) {
            out += `**Passive: ${core.passive_name}**\n`
        }
        if (core.passive_effect) {
            out += `${this.turndownService.turndown(core.passive_effect)}\n`
        }
        if (core.passive_actions) {
            core.passive_actions.forEach(pa => out += `${this.actionFormat(pa)}\n`)
        }

        //Integrated systems, weapons, or other stuff
        if (core.integrated) {
            out += this.integratedFormat(core.integrated)
        }
        if (core.deployables) {
            core.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }
        if (core.tags) {
            core.tags.forEach(t => out += this.populateTag(t))
        }

        //Active info
        if (core.active_name) {
            out += `**Active: ${core.active_name}** `
            out += `(Activation: ${this.activationFormat(core.activation)})\n`
            out += `${this.turndownService.turndown(core.active_effect)}`
        }
        if (core.active_actions) {
            core.active_actions.forEach(aa => out += `\n${this.actionFormat(aa)}`)
        }

        return out
    }

    public frameFormat(frame: SearchableFrame) {
        const {stats, core_system} = frame
        const coreName = core_system.name || core_system.passive_name || core_system.active_name
        let out = `**${frame.source} ${frame.name}** - ${frame.mechtype.join('/')} Frame
SIZE ${stats.size}, ARMOR ${stats.armor}, SAVE ${stats.save}, SENSOR ${stats.sensor_range}
HP ${stats.hp}, REPAIR CAP ${stats.repcap}        E-DEF ${stats.edef}, TECH ATTACK ${stats.tech_attack > 0 ? '+' : ''}${stats.tech_attack}, SP ${stats.sp}
EVASION ${stats.evasion}, SPEED ${stats.speed}        HEATCAP ${stats.heatcap}
**Mounts:** ${frame.mounts.join(', ')}`
        out += `\n${frame.traits.map(trait => this.traitFormatter(trait)).join('\n')}\n`
        out += `CORE System: **${coreName}**`
        return out
    }

    // TODO: Do we care about the glossary?
    // function glossaryFormat(glossaryEntry) {
    //     //For useful rules and entries in the glossary.
    //     return `**${glossaryEntry.name}:** ${turndownService.turndown(glossaryEntry.description)}`
    // }

    public modFormat(mod: SearchableMod) {
        let out = `**${mod.name}** (${this.licenseFormat(mod)} Mod)\n${mod.sp} SP`
        //Tags, if any
        if (mod.tags) {
            out += `, ${mod.tags.map(tag => this.populateTag(tag)).join(', ').trim()}\n`;
        } else {
            out += '\n'
        }
        //Type/size restrictions, if any
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
        //Actions, if any
        // if(mod.actions) {
        //   out += "This mod grants the following actions:\n"
        //   mod.actions.forEach(act => out += actionFormat(act) + "\n")
        // }

        return out
    }

    public pilotArmorFormat(parmor: SearchablePilotArmor) {
        let out = `**${parmor.name}** (Pilot Armor)\n`
        if (parmor.bonuses) {
            //Iterate thru each bonus and prettyprint it
            for (const bonus_indx in parmor.bonuses) {
                const bonus = parmor.bonuses[bonus_indx]
                let bonus_name = bonus.id.replace("_", " ")
                bonus_name = this.toTitleCase(bonus_name)
                out += `**${bonus_name}:** ${bonus.val}, `
            }
            out = out.replace(/,\s*$/, "")
            out += '\n'
        }
        out += `${this.turndownService.turndown(parmor.description)}`
        //Actions not implemented
        return out;
    }

    public pilotGearFormat(pgear: SearchablePilotGear) {
        let out = `**${pgear.name}** (Pilot Gear)\n`
        if (pgear.tags) {
            out += pgear.tags.map(tag => this.populateTag(tag)).join(', ').trim() + "\n"
        }
        out += this.turndownService.turndown(pgear.description) + "\n"
        if (pgear.actions) {
            out += 'This pilot gear grants the following actions:\n'
            out += pgear.actions.map(action => `${action.name} (${action.activation})`).join(', ').trim()
        }
        return out;
    }

    public pilotWeaponFormat(weapon: SearchablePilotWeapon): string {
        //Mount, Type, Tags
        let out = `**${weapon.name}**`
        let tagsEtc = [`-- ${weapon.type || '--'}`]
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}\n`

        //Range and damage
        if (weapon.range && weapon.range.length) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (weapon.damage && weapon.damage.length) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        out += '\n'

        //Actions (e.g. autopod reaction)
        if (weapon.actions) {
            out += 'This weapon grants the following actions:\n'
            weapon.actions.forEach(act => out += this.actionFormat(act))
        }

        //Deployables (e.g. ghast drone) aaah screw it this should be done universally tbh
        if (weapon.deployables) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        return out
    }

    public skillFormat(skill: SearchableSkillTrigger) {
        return `**${skill.name}** (Pilot Skill)\n${this.turndownService.turndown(skill.detail)}`
    }

    public statusFormat(object: SearchableStatusCondition) {
        return `**${object.name}** (${object.type})\n  ${this.turndownService.turndown(object.effects)}`
    }


    public systemFormat(system: SearchableSystem) {
        let out = `**${system.name}** (${this.licenseFormat(system)} ${system.data_type || system.type || ''})\n`
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
        //Only for when users search for specific tags.
        return `**${object.name}** (${object.data_type})\n  ${this.turndownService.turndown(object.description.replace(/\{VAL}/, 'X'))}`
    }

    public talentFormat(talent: SearchableTalent) {
        let out = `**${talent.name}** - Talent\n`
        talent.ranks.forEach((rank, i) => {
            out += `${getEmoji(`rank_${(i + 1)}`)} **${rank.name}**:`

            // if(rank.integrated) {
            //   out += `You gain the following: ${integratedFormat(rank.integrated)}`
            // }
            out += this.turndownService.turndown(rank.description) + "\n"
            if (rank.actions && rank.actions.length > 0) {
                rank.actions.forEach(act => out += this.actionFormat(act))
                out += "\n"
            }
        })
        return out;
    }

    public weaponFormat(weapon: SearchableWeapon): string {
        //Mount, Type, Tags
        let out = `**${weapon.name}**`
        if (weapon.id && !weapon.id.endsWith('_integrated')) {
            out += ` (${[this.licenseFormat(weapon), weapon.data_type].join(' ').trim()})`
        }
        let tagsEtc = [`${weapon.mount || '--'} ${weapon.type || '--'}`]
        if (weapon.sp) tagsEtc.push(`${weapon.sp} SP`)
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}\n`

        //Range and damage
        if (weapon.range && weapon.range.length) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (weapon.damage && weapon.damage.length) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        out += '\n'

        //Description(s)
        if (weapon.effect) out += this.turndownService.turndown(weapon.effect) + "\n"
        if (weapon.on_attack) out += `On Attack: ${this.turndownService.turndown(weapon.on_attack)}\n`
        if (weapon.on_hit) out += `On Hit: ${this.turndownService.turndown(weapon.on_hit)}\n`
        if (weapon.on_crit) out += `On Crit: ${this.turndownService.turndown(weapon.on_crit)}\n`

        //Actions (e.g. autopod reaction)
        if (weapon.actions) {
            out += 'This weapon grants the following actions:\n'
            weapon.actions.forEach(act => out += this.actionFormat(act))
        }

        //Deployables (e.g. ghast drone) aaah screw it this should be done universally tbh
        if (weapon.deployables) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        //Recursively define profiles
        if (weapon.profiles) {
            weapon.profiles.forEach(profile =>
                out += `Profile: ${this.weaponProfileFormat(this.weaponProfile(weapon, profile))} \n`)
        }

        return out
    }

    private weaponProfile(weapon: SearchableWeapon, profile: IWeaponProfile): PrintableWeaponProfile {
        return ({mount: weapon.mount, type: weapon.type, ...profile})
    }

    private weaponProfileFormat(weapon: PrintableWeaponProfile): string {

        //Mount, Type, Tags
        let out = `**${weapon.name}**`
        let tagsEtc = [`${weapon.mount} ${weapon.type}`]
        if (weapon.tags) tagsEtc = tagsEtc.concat(weapon.tags.map(tag => this.populateTag(tag)))
        out += `\n${tagsEtc.join(', ')}\n`

        //Range and damage
        if (weapon.range && weapon.range.length) out += '[' + weapon.range.map(r => r.override ? r.val : `${getEmoji(r.type.toLowerCase())} ${r.val}`).join(', ') + '] '
        if (weapon.damage && weapon.damage.length) out += '[' + weapon.damage.map(dmg => dmg.override ? dmg.val : `${dmg.val}${getEmoji(dmg.type.toLowerCase())}`).join(' + ') + ']'
        out += '\n'

        //Description(s)
        if (weapon.effect) out += this.turndownService.turndown(weapon.effect) + "\n"
        if (weapon.on_attack) out += `On Attack: ${this.turndownService.turndown(weapon.on_attack)}\n`
        if (weapon.on_hit) out += `On Hit: ${this.turndownService.turndown(weapon.on_hit)}\n`
        if (weapon.on_crit) out += `On Crit: ${this.turndownService.turndown(weapon.on_crit)}\n`

        //Actions (e.g. autopod reaction)
        if (weapon.actions) {
            out += 'This weapon grants the following actions:\n'
            weapon.actions.forEach(act => out += this.actionFormat(act))
        }

        //Deployables (e.g. ghast drone) aaah screw it this should be done universally tbh
        if (weapon.deployables) {
            out += 'This weapon grants the following deployables:\n'
            weapon.deployables.forEach(dep => out += this.deployableFormatter(dep))
        }

        return out
    }
}

type PrintableWeaponProfile = IWeaponProfile & { mount: string, type: string }

const emoji = {
    threat: "<:cc_threat:683696636156707002>",
    range: "<:cc_range:683696633950634044>",
    blast: "<:cc_aoe_blast:683697064814706689>",
    burst: "<:cc_aoe_burst:683697065209233450>",
    line: "<:cc_aoe_line:683696633065636033>",
    cone: "<:cc_aoe_cone:683696632969035864>",
    kinetic: "<:cc_damage_kinetic:683696633216499749>",
    explosive: "<:cc_damage_explosive:683696633329877011>",
    energy: "<:cc_damage_energy:683696632889737241>",
    burn: "<:cc_damage_burn:683696632642011187>",
    heat: "<:cc_damage_heat:683696632868503652>",
    rank_1: "<:cc_rank_1:683696633933987919>",
    rank_2: "<:cc_rank_2:683696633929793605>",
    rank_3: "<:cc_rank_3:683696634223132740>"
}

function getEmoji(key: string): string {
    switch (key) {
        case "threat":
            return emoji[key]
        case "range":
            return emoji[key]
        case "blast":
            return emoji[key]
        case "burst":
            return emoji[key]
        case "line":
            return emoji[key]
        case "cone":
            return emoji[key]
        case "kinetic":
            return emoji[key]
        case "explosive":
            return emoji[key]
        case "energy":
            return emoji[key]
        case "burn":
            return emoji[key]
        case "heat":
            return emoji[key]
        case "rank_1":
            return emoji[key]
        case "rank_2":
            return emoji[key]
        case "rank_3":
            return emoji[key]
        default:
            return `[can't find emoji ${key}`
    }
}
