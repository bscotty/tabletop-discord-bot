export type IconArea = {
    area_type: string
    range: number | string
    qualifier?: string
}

export function formatArea(area: IconArea): string {
    let qualifierFlag = ""
    if (area.qualifier) {
        qualifierFlag = ` (${area.qualifier})`
    }
    if (typeof area.range === "number") {
        return `${area.area_type} ${area.range}${qualifierFlag}`
    } else {
        return `${area.range} ${area.area_type}${qualifierFlag}`
    }
}