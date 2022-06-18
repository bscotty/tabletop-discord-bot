import {IActionData, IBonusData, ICounterData, IDeployableData, ISynergyData, MountType} from "./shared-types";
import {ICoreSystemData, SourcedCoreSystem} from "./core-system";

export type Frame = {
    id: string
    license_level: number
    license_id?: string
    variant?: string
    source: string
    name: string
    mechtype: string[]
    specialty?: boolean | IPrerequisite
    description: string // v-html
    mounts: MountType[]
    stats: FrameStats
    traits: IFrameTraitData[]
    core_system: ICoreSystemData
    image_url?: string
    y_pos?: number
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
