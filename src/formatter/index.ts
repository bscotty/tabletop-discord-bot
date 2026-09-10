import {DisplayResponse} from "../lancer/format/display-response";

export default interface Formatter<T> {
    format(item: T, state: string | null): Promise<string | DisplayResponse>
}
