import {SearchableTalent} from "../../search/searchable";
import TurndownService from "turndown";
import {DisplayResponse, ResponseField} from "../display-response";
import {getTalentLogo} from "../util/logos";
import {IRankData} from "../../types/talent";
import {getEmoji} from "../util/emoji";
import {actionTraits} from "./rich-action-formatter";
import Formatter from "../../../formatter";
import {formatContentPackTitle} from "../util/contentPack";

export class RichTalentFormatter implements Formatter<SearchableTalent> {
    constructor(
        private readonly turndownService: TurndownService,
    ) {
    }

    format(item: SearchableTalent): DisplayResponse {
        const {imageUrl, file} = getTalentLogo(item)
        return {
            color: null,
            authorName: `${item.name} - Talent` + formatContentPackTitle(item),
            authorIconUrl: imageUrl,
            thumbnailUrl: imageUrl,
            description: null, //this.turndownService.turndown(`<i>${item.description}</i>`),
            localAssetFilePaths: [file].filter((it) => it != null),
            fields: item.ranks.map((it, index) => this.rankFields(it, index)).flat(),
            buttons: []
        }
    }

    private rankFields(rank: IRankData, index: number): ResponseField[] {
        const fields = [
            {
                name: `${getEmoji(`rank_${index + 1}`)} ${rank.name}`,
                description: this.turndownService.turndown(rank.description),
                inline: false
            }
        ]
        if (rank.actions) {
            const actions = rank.actions.map((it) => actionTraits(it, this.turndownService)).flat()
            fields.push(...actions)
        }

        return fields
    }
}
