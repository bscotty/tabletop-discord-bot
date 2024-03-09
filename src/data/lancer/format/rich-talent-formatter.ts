import {RichFormatter} from "./rich-formatter";
import {SearchableTalent} from "../search/searchable";
import {DisplayResponse, ResponseField} from "./display-response";
import TurndownService from "turndown";
import {Repository} from "./repository";
import {Formatters, ZERO_SPACE} from "./formatters";
import {getTalentLogo} from "./logos";
import {IRankData} from "../types/talent";
import {getEmoji} from "./emoji";
import {actionTraits} from "./rich-action-formatter";

// TODO: Continue to refine
export class RichTalentFormatter implements RichFormatter<SearchableTalent> {
    private readonly turndownService: TurndownService
    private readonly repo: Repository
    private readonly formatters: Formatters

    constructor(repository: Repository, formatters: Formatters) {
        this.turndownService = new TurndownService()
        this.repo = repository
        this.formatters = formatters
    }

    richFormat(item: SearchableTalent): DisplayResponse {
        const {imageUrl, file} = getTalentLogo(item)
        return {
            color: null,
            authorName: `${item.name} - Talent`,
            authorIconUrl: imageUrl,
            thumbnailUrl: imageUrl,
            description: ZERO_SPACE, //this.turndownService.turndown(item.description),
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
