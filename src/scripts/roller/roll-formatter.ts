import {KeepCommand} from "./commands";
import {KeptRoll} from "./keepers";

export class FormattedRoll {
    constructor(
        readonly text: string,
        readonly sum: number,
        readonly shouldPrintVerbosely: boolean = false
    ) {
    }
}

export function formatRoll(
    command: KeepCommand,
    results: number[],
    keeps: KeptRoll[]
): FormattedRoll {
    if (command != KeepCommand.keepAll) {
        const rollsText = results.map((it, index) => {
            if (keeps.find((keptRoll) => index == keptRoll.index) == undefined) {
                return `~~${it}~~`
            } else {
                return `**${it}**`
            }
        }).join(", ")
        const keepSum: number = sum(keeps.map((it) => it.value))
        return new FormattedRoll(`[${rollsText}]`, keepSum, true)
    } else {
        const resultsSum = sum(results)
        return new FormattedRoll(`[${results.join(", ")}]`, resultsSum, results.length > 1)
    }
}

export function formatRollCommand(
    rawCommand: string,
    commands: FormattedRoll[]
): string {
    const rollText = `Rolling ${rawCommand}`

    const shouldPrintVerbosely = commands.map((it) => it.shouldPrintVerbosely)
        .reduce((previousValue, currentValue, _, __) => previousValue || currentValue)
    if (shouldPrintVerbosely) {
        const resultText = commands.map((it) => it.text).join(" + ")
        const sumOfSums = sum(commands.map((it) => it.sum))
        return `${rollText}!\n${resultText} = ${sumOfSums}!`
    } else {
        return `${rollText}!\n${sum(commands.map((it) => it.sum))}`
    }
}

function sum(array: number[]): number {
    return array.reduce((previous, current, _, __) => previous + current)
}