import {Formatter} from "../../../formatter/formatter";
import {DisplayResponse} from "../../../data/lancer/format/display-response";
import {DivineItem} from "../../../data/godbound/divine-item";
import {formatGodbound} from "../../../data/godbound/formatter";

export class GodboundFormatter implements Formatter<DivineItem> {
    format(item: DivineItem): string | DisplayResponse {
        return formatGodbound(item);
    }
}
