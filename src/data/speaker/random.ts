export class Random {
    public getInclusive(maxInclusive: number): number {
        return Math.floor(Math.random() * (maxInclusive + 1))
    }

    public get(max: number): number {
        return Math.floor(Math.random() * max)
    }
}
