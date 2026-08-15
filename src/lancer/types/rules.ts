export type Rules = {
    base_structure: number
    base_stress: number
    base_grapple: number
    base_ram: number
    base_pilot_hp: number
    base_pilot_evasion: number
    base_pilot_edef: number
    base_pilot_speed: number
    minimum_pilot_skills: number
    minimum_mech_skills: number
    minimum_pilot_talents: number
    trigger_bonus_per_rank: number
    max_trigger_rank: number
    max_pilot_level: number
    max_pilot_weapons: number
    max_pilot_armor: number
    max_pilot_gear: number
    max_frame_size: number
    max_mech_armor: number
    max_hase: number
    mount_fittings: MountFitting
    overcharge: string[]
    skill_headers: SkillHeader[]
}

export type MountFitting = {
    Auxiliary: string[]
    Main: string[]
    Flex: string[]
    Heavy: string[]
}

export type SkillHeader = {
    attr: string
    description: string
}