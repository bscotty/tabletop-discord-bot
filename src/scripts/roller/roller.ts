import {RollCommand} from "./commands";
import {parseRoll} from "./roll-parser";
import {keepRolls} from "./keepers";
import {formatRoll, formatRollCommand, FormattedRoll} from "./roll-formatter";

export class ExecutedRoll {
    constructor(readonly result: number) {
    }
}

export function executeRoll(command: RollCommand): ExecutedRoll[] {
    const results: ExecutedRoll[] = new Array(command.diceCount)

    for (let i = 0; i < command.diceCount; i++) {
        results[i] = new ExecutedRoll(1 + Math.floor(Math.random() * command.diceNumber))
    }

    return results
}
