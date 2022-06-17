const emoji = {
    threat: "<:cc_threat:683696636156707002>",
    range: "<:cc_range:683696633950634044>",
    blast: "<:cc_aoe_blast:683697064814706689>",
    burst: "<:cc_aoe_burst:683697065209233450>",
    line: "<:cc_aoe_line:683696633065636033>",
    cone: "<:cc_aoe_cone:683696632969035864>",
    kinetic: "<:cc_damage_kinetic:683696633216499749>",
    explosive: "<:cc_damage_explosive:683696633329877011>",
    energy: "<:cc_damage_energy:683696632889737241>",
    burn: "<:cc_damage_burn:683696632642011187>",
    heat: "<:cc_damage_heat:683696632868503652>",
    rank_1: "<:cc_rank_1:683696633933987919>",
    rank_2: "<:cc_rank_2:683696633929793605>",
    rank_3: "<:cc_rank_3:683696634223132740>"
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
        default:
            return `[can't find emoji ${key}`
    }
}