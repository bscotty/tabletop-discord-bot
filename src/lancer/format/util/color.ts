import {LancerRepository} from "../../repository/lancerRepository";

export function getColor(source: string, repo: LancerRepository): string | null {
    const manufacturer = repo.manufacturers.find((it) => it.id == source)
    return manufacturer ? manufacturer.dark.replace("#", "") : null
}
