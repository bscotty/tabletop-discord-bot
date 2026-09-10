import Formatter from "../formatter";
import {DisplayResponse} from "../lancer/format/display-response";
import {formatIcon} from "./format/formatter";
import {SearchableIconData} from "./searchable/searchable-icon-data";

export class IconFormatter implements Formatter<SearchableIconData> {
    async format(item: SearchableIconData): Promise<string | DisplayResponse> {
        return formatIcon(item);
    }
}
