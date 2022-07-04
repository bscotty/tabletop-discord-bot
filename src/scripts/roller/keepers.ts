import {KeepCommand} from "./commands";
import {ExecutedRoll} from "./roller";

export class KeptRoll {
    constructor(
        readonly index: number,
        readonly value: number
    ) {
    }
}

export function keepRolls(command: KeepCommand, rolls: ExecutedRoll[], numberToKeep: number): KeptRoll[] {
    if (command == KeepCommand.keepHighest) {
        return keepHighest(rolls, numberToKeep)
    } else if (command == KeepCommand.keepLowest) {
        return keepLowest(rolls, numberToKeep)
    } else {
        return rolls.map((it, index) => new KeptRoll(index, it.result))
    }
}

function keepHighest(rolls: ExecutedRoll[], numberToKeep: number): KeptRoll[] {
    return rolls.slice()
        .sort((first, second) => first.result - second.result)
        .reverse()
        .slice(0, numberToKeep)
        .map((it) => new KeptRoll(rolls.indexOf(it), it.result))
}

function keepLowest(rolls: ExecutedRoll[], numberToKeep: number): KeptRoll[] {
    return rolls.slice()
        .sort((first, second) => first.result - second.result)
        .slice(0, numberToKeep)
        .map((it) => new KeptRoll(rolls.indexOf(it), it.result))
}
