export type IconAttack = {
    on_hit: string
    on_miss: string
    effect?: string
    auto_hit?: boolean
}

export function formatAttack(attack: IconAttack): string {
    let attackEffectFlag = ""
    if (attack.effect) {
        attackEffectFlag = ` *Effect*: ${attack.effect}.`
    }
    if (attack.auto_hit) {
        return `**Attack: *Auto-hit*** ${attack.on_hit}`
    } else {
        return `**Attack:** *On Hit*${attack.on_hit}. *Miss*: ${attack.on_miss}.${attackEffectFlag}`
    }
}