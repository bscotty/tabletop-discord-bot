import {Random} from "./random";

const random = new Random()

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Array<T> {
        random(): T
    }
}

Array.prototype.random = function <T>(this: T[]): T {
    return this[random.get(this.length)]
}