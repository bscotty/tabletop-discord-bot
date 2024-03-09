import {DisplayResponse} from "./display-response";


export interface RichFormatter<T> {
    richFormat(item: T): DisplayResponse
}

