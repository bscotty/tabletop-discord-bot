import {Formatter} from "../../../formatter/formatter";
import {DisplayResponse} from "../../../data/lancer/format/display-response";
import {formatIcon} from "../../../data/icon/formatter";
import {SearchableIconData} from "../../../data/icon/searchable/searchable-icon-data";

export class IconFormatter implements Formatter<SearchableIconData> {
    format(item: SearchableIconData): string | DisplayResponse {
        return formatIcon(item);
    }
}
