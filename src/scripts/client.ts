export async function initClient(token: string, guilds: string[]) {
    console.log(`initClient: ${token.length > 0 ? "non-empty token" : "empty token"} with guilds ${guilds.join()}`)
}
