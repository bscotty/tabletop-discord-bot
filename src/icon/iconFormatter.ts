import Formatter from "../formatter";
import {DisplayResponse} from "../lancer/format/display-response";
import {formatIcon} from "./format/formatter";
import {SearchableIconData} from "./searchable/searchable-icon-data";

export class IconFormatter implements Formatter<SearchableIconData> {
    format(item: SearchableIconData): string | DisplayResponse {
        return formatIcon(item);
    }
}
