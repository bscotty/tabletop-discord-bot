import {DisplayResponse} from "../lancer/format/display-response";

export default interface Formatter<T> {
    format(item: T): Promise<string | DisplayResponse>
}
