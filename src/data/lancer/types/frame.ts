import {IActionData, IBonusData, ICounterData, IDeployableData, ISynergyData, MountType} from "./shared-types";
import {ICoreSystemData, SourcedCoreSystem} from "./core-system";


export type Frame = {
    id: string
    license_level: number // set to zero for this item to be available to a LL0 character
    license_id: string // reference to the Frame id of the associated license, relevant for variants
    variant?: string // optional; name of the main frame license for which this frame is a variant
    source: string // must be the same as the Manufacturer ID to sort correctly
    name: string
    mechtype: string[] // can be customized
    specialty?: boolean | IPrerequisite // see below
    description: string // v-html
    mounts: MountType[]
    stats: FrameStats
    traits: IFrameTraitData[]
    core_system: ICoreSystemData
    image_url?: string
    y_pos?: number // used for vertical alignment of the mech in banner views (like in the new mech selector)
}

export type IFrameTraitData = {
    name: string
    description: string // v-html
    use?: string // 'Turn' | 'Next Turn' | 'Round' | 'Next Round' | 'Scene' | 'Encounter' | 'Mission'
    actions?: IActionData[]
    bonuses?: IBonusData[]
    synergies?: ISynergyData[]
    deployables?: IDeployableData[]
    counters?: ICounterData[]
    integrated?: string[]
    special_equipment?: string[]
}

export type FrameStats = {
    size: number
    structure: number
    stress: number
    armor: number
    hp: number
    evasion: number
    edef: number
    heatcap: number
    repcap: number
    sensor_range: number
    tech_attack: number
    save: number
    speed: number
    sp: number
}

export type IPrerequisite = {
    source: string
    min_rank: number
    cumulative?: boolean
}

export function getCorePowersFromFrames(frames: Frame[]): (ICoreSystemData & SourcedCoreSystem)[] {
    return frames.map((frame: Frame) => ({
        source: `${frame.source} ${frame.name}`, ...frame.core_system
    }))
}
