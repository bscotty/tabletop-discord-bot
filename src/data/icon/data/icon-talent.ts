export type IconTalent = {
    name: string
    description: string
}

export function formatTalent(talent: IconTalent): string {
    return `**${talent.name}**: ${talent.description}`
}