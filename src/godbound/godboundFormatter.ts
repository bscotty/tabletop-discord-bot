import Formatter from "../formatter";
import {DisplayResponse} from "../lancer/format/display-response";
import {DivineItem} from "./data/divine-item";
import {formatGodbound} from "./data/formatter";

export class GodboundFormatter implements Formatter<DivineItem> {
    format(item: DivineItem): string | DisplayResponse {
        return formatGodbound(item);
    }
}
