export type Tag = {
    id: string
    name: string
    description: string // v-html, see note below
    hidden?: boolean
    filter_ignore?: boolean
}

export type TypedTag = Tag & { kind: "Tag" }
