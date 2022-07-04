import {KeepCommand, RollCommand} from "./commands";

export function parseRoll(roll: string): RollCommand {
    const split: string[] = roll.split("d").map((it) => it.trim())
    let numberOfRolls: number = 1
    if (split.length > 0) {
        const diceSpecified = split[0]
        if (diceSpecified.length > 0) {
            numberOfRolls = parseInt(diceSpecified)
        }
    }

    let dieType: number = 6
    if (split.length > 1) {
        const die = split[1]
        if (die.length > 1) {
            dieType = parseInt(die)
        }
    }

    let additionalCommand: KeepCommand
    let keepCount: number
    if (split.length > 2) {
        const rawCommand = split[2]
        if (rawCommand.includes("l")) {
            // dl -> kh
            additionalCommand = KeepCommand.keepHighest
            keepCount = numberOfRolls - (parseInt(rawCommand.split("l")[1]) || 1)
        } else if (rawCommand.includes("h")) {
            // dh -> kl
            additionalCommand = KeepCommand.keepLowest
            keepCount = numberOfRolls - (parseInt(rawCommand.split("h")[1]) || 1)
        }
    } else if (split.length > 1) {
        const rawCommand = split[1]
        if (rawCommand.includes("kh")) {
            additionalCommand = KeepCommand.keepHighest
            keepCount = parseInt(rawCommand.split("kh")[1]) || 1
        } else if (rawCommand.includes("kl")) {
            additionalCommand = KeepCommand.keepLowest
            keepCount = parseInt(rawCommand.split("kl")[1]) || 1
        }
    }

    if (additionalCommand == undefined) {
        additionalCommand = KeepCommand.keepAll
        keepCount = 0
    }

    return new RollCommand(
        numberOfRolls,
        dieType,
        additionalCommand,
        keepCount
    )
}
