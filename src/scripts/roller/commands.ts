export class RollCommand {
    constructor(
        readonly diceCount: number,
        readonly diceNumber: number,
        readonly keepCommand: KeepCommand,
        readonly keepCommandCount: number
    ) {
    }
}

export enum KeepCommand {
    keepHighest = "Keep Highest",
    keepLowest = "Keep Lowest",
    keepAll = "Keep All"
}
