import {Discord, Slash, SlashOption} from "discordx";
import {CommandInteraction} from "discord.js";

@Discord()
export class Godbound {
    @Slash("godbound", {description: "Search for a Godbound search term"})
    public command(
        @SlashOption("term", {description: "what to search for"})
            term: string,
        interaction: CommandInteraction
    ) {
        // compile all godbound json files
        // parse the fields that we would match to the term
        // have fuse.js search the fields for a match
        // format the returned field for display
        // respond to interaction with formatted field
        interaction.reply("I can't do that yet.")
    }
}
