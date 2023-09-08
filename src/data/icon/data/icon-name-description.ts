export type IconNameDescription = {
    name: string
    description: string
}

export function formatNameDescription(tuple: IconNameDescription, newLine = false): string {
    if (newLine) {
        return `${tuple.name}\n${tuple.description}`
    } else {
        return `**${tuple.name}**: ${tuple.description}`
    }
}