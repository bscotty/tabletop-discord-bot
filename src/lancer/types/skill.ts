export type SkillTrigger = {
    id: string
    name: string
    description: string // terse, prefer fewest characters
    detail: string // v-html
    family: string // "str" | "con" | "dex" | "int" | "cha"
}
