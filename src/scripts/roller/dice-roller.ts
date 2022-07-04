import {parseRoll} from "./roll-parser";
import {keepRolls} from "./keepers";
import {formatRoll, formatRollCommand, FormattedRoll} from "./roll-formatter";
import {executeRoll} from "./roller";

export function rollDice(rawCommand: string): string {
    const splitRolls = rawCommand.split("+").map((it) => it.trim())
    const formattedRolls = splitRolls.map((it) => {
        if (it.includes("d")) {
            const command = parseRoll(it)
            const results = executeRoll(command)
            const keeps = keepRolls(command.keepCommand, results, command.keepCommandCount)
            return formatRoll(command.keepCommand, results.map((it) => it.result), keeps)
        } else {
            if (!new RegExp("^[0-9]+").test(it)) {
                throw Error(`I hate ${it}`)
            }
            return new FormattedRoll(it, parseInt(it))
        }
    })
    return formatRollCommand(rawCommand, formattedRolls)
}