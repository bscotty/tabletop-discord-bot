const emoji = {
    threat: "<:cc_threat:1005575815062372382>",
    range: "<:cc_range:1005575811044229170>",
    blast: "<:cc_aoe_blast:1005575801292476557>",
    burst: "<:cc_aoe_burst:1005575802399764531>",
    line: "<:cc_aoe_line:1005575804945698917>",
    cone: "<:cc_aoe_cone:1005575804001996851>",
    kinetic: "<:cc_damage_kinetic:1005575809387466892>",
    explosive: "<:cc_damage_explosive:1005575807755878470>",
    energy: "<:cc_damage_energy:1005575806636015617>",
    burn: "<:cc_damage_burn:1005576299110211584>",
    heat: "<:cc_damage_heat:1005575808485691392>",
    variable: "<:cc_damage_variable:1005575810180198400>",
    rank_1: "<:cc_rank_1:1005575811958571049>",
    rank_2: "<:cc_rank_2:1005575813002960936>",
    rank_3: "<:cc_rank_3:1005575813804068945>"
}

export function getEmoji(key: string): string {
    switch (key) {
        case "threat":
            return emoji[key]
        case "range":
            return emoji[key]
        case "blast":
            return emoji[key]
        case "burst":
            return emoji[key]
        case "line":
            return emoji[key]
        case "cone":
            return emoji[key]
        case "kinetic":
            return emoji[key]
        case "explosive":
            return emoji[key]
        case "energy":
            return emoji[key]
        case "burn":
            return emoji[key]
        case "heat":
            return emoji[key]
        case "rank_1":
            return emoji[key]
        case "rank_2":
            return emoji[key]
        case "rank_3":
            return emoji[key]
        case "variable":
            return emoji[key]
        default:
            return `[can't find emoji ${key}`
    }
}