import {DisplayResponse} from "../lancer/format/display-response";

export interface Formatter<T> {
    format(item: T): string | DisplayResponse
}
