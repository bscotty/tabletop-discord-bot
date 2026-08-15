import {ITagData} from "../../types/shared-types";
import {replaceVal} from "./val";
import {LancerRepository} from "../../repository/lancerRepository";

export function populateTag(tag: ITagData, repo: LancerRepository): string {
    const tagData = repo.tags.find(t => t.id === tag.id)

    if (tag.val !== undefined)
        return replaceVal(tagData.name, `${tag.val}`) //For things like HEAT {VAL} Self
    else
        return tagData.name
}
