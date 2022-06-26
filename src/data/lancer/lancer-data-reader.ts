import {addAlternativeNames, AlternativelyNamed, SupportsAltName} from "./name-fixes";
import {Lcp} from "./types/lcp";
import {getCorePowersFromFrames, TypedFrame} from "./types/frame";
import {splitPilotItems, TypedPilotArmor, TypedPilotGear, TypedPilotWeapon} from "./types/pilot";
import {LabeledContent} from "./types/shared-types";
import {sourceBondPowers, TypedBond, TypedBondPower} from "./types/bonds";
import {TypedAction} from "./types/action";
import {TypedCoreBonus} from "./types/core-bonus";
import {TypedGlossaryItem} from "./types/glossary";
import {TypedMod} from "./types/mod";
import {TypedSkillTrigger} from "./types/skill";
import {TypedStatus} from "./types/status";
import {TypedSystem} from "./types/system";
import {TypedTag} from "./types/tag";
import {TypedTalent} from "./types/talent";
import {TypedWeapon} from "./types/weapon";
import {TypedCoreSystem} from "./types/core-system";
import {LancerData} from "./types/lancer-data";

export function lancerDataReader(lcp: Lcp): LancerData {
    const typedActions: TypedAction[] = lcp.actions.map((it) => ({...it, kind: "Action"}))

    const typedBonds: TypedBond[] = lcp.bonds.map((it) => ({...it, kind: "Bond"}))
    const typedBondPowers: TypedBondPower[] =
        lcp.bonds.map((it) => sourceBondPowers(it)).flat().map((it) => ({...it, kind: "Bond Power"}))

    const typedCoreBonuses: TypedCoreBonus[] = lcp.coreBonuses.map((it) => ({...it, kind: "Core Bonus"}))
    const typedCorePowers: TypedCoreSystem[] =
        getCorePowersFromFrames(lcp.frames).map((it) => ({...it, kind: "Core System"}))

    const typedFrames: TypedFrame[] = lcp.frames.map((it) => ({...it, kind: "Frame"}))
    const typedGlossary: TypedGlossaryItem[] = lcp.glossary.map((it) => ({...it, kind: "Glossary"}))
    const typedMods: TypedMod[] = lcp.mods.map((it) => ({...it, kind: "Mod"}))

    const pilotItems = splitPilotItems(lcp.pilot_gear)
    const typedPilotArmor: TypedPilotArmor[] = pilotItems.armor.map((it) => ({...it, kind: "Pilot Armor"}))
    const typedPilotGear: TypedPilotGear[] = pilotItems.gear.map((it) => ({...it, kind: "Pilot Gear"}))
    const typedPilotWeapons: TypedPilotWeapon[] = pilotItems.weapon.map((it) => ({...it, kind: "Pilot Weapon"}))

    const typedSkills: TypedSkillTrigger[] = lcp.skills.map((it) => ({...it, kind: "Skill"}))
    const typedStatuses: TypedStatus[] = lcp.statuses.map((it) => ({...it, kind: "Status"}))
    const typedSystems: TypedSystem[] = lcp.systems.map((it) => ({...it, kind: "System"}))
    const typedTags: TypedTag[] = lcp.tags.map((it) => ({...it, kind: "Tag"}))
    const typedTalents: TypedTalent[] = lcp.talents.map((it) => ({...it, kind: "Talent"}))
    const typedWeapons: TypedWeapon[] = lcp.weapons.map((it) => ({...it, kind: "Weapon"}))

    return new LancerData(
        filterTypeAndLabel(typedActions, lcp.info.name),
        filterTypeAndLabel(typedBonds, lcp.info.name),
        typeAndLabel(typedBondPowers, lcp.info.name),
        filterTypeAndLabel(typedCoreBonuses, lcp.info.name),
        typeAndLabel(typedCorePowers, lcp.info.name),
        filterTypeAndLabel(typedFrames, lcp.info.name),
        typeAndLabel(typedGlossary, lcp.info.name),
        filterTypeAndLabel(typedMods, lcp.info.name),
        filterTypeAndLabel(typedPilotArmor, lcp.info.name),
        filterTypeAndLabel(typedPilotGear, lcp.info.name),
        filterTypeAndLabel(typedPilotWeapons, lcp.info.name),
        filterTypeAndLabel(typedSkills, lcp.info.name),
        typeAndLabel(typedStatuses, lcp.info.name),
        filterTypeAndLabel(typedSystems, lcp.info.name),
        filterTypeAndLabel(typedTags, lcp.info.name),
        filterTypeAndLabel(typedTalents, lcp.info.name),
        filterTypeAndLabel(typedWeapons, lcp.info.name),
    )
}

function filterTypeAndLabel<T extends SupportsAltName & { id: string }>(
    jsonBlob: T[],
    lcpName: string
): (T & LabeledContent & AlternativelyNamed)[] {
    const filteredJson: T[] = filterMissing(jsonBlob)
    return typeAndLabel<T>(filteredJson, lcpName)
}

function filterMissing<T extends { id: string }>(array: T[]): T[] {
    return array.filter((entry) => !entry.id.startsWith("missing_"))
}

function typeAndLabel<T extends SupportsAltName>(
    jsonBlob: T[],
    lcpName: string
): (T & LabeledContent & AlternativelyNamed)[] {
    return jsonBlob
        .map((entry: T) => ({...entry, content_pack: lcpName}))
        .map((entry: T & LabeledContent) => addAlternativeNames(entry))
}
