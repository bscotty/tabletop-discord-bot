import {Repository} from "./repository";

export function getColor(source: string, repo: Repository): string | null {
    const manufacturer = repo.manufacturers.find((it) => it.id == source)
    return manufacturer ? manufacturer.dark.replace("#", "") : null
}
