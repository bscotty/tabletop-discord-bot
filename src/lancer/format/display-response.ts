import {ButtonStyle} from "discord.js";

export type DisplayResponse = {
    color: string | null,
    authorName: string,
    authorIconUrl: string | null,
    thumbnailUrl: string | null,
    description: string,
    localAssetFilePaths: string[]
    fields: ResponseField[],
    buttons: ResponseButton[]
}

export type ResponseField = {
    name: string,
    description: string,
    inline: boolean
}

export type ResponseButton = {
    id: string,
    name: string,
    style: ButtonStyle,
    enabled: boolean
    updatedFields: ResponseField[]
}