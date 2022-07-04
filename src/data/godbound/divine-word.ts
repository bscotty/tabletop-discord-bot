export type DivineWord = {
    name: string
    type: string
    data: DivineWordData
}

export type DivineWordData = {
    description: string
    pdfCode: string
    pdfPage: number
}