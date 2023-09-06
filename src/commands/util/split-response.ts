export function splitResponse(response: string): string[] {
    const responses: string[] = response.split("\n")
    const splitResponse: string[] = [""]

    responses.forEach(response => {
        const index = splitResponse.findIndex((entry) => (entry.length + response.length) < 2000)
        if (index < 0) {
            splitResponse.push(response)
        } else {
            splitResponse[index] = splitResponse[index] + "\n" + response
        }
    })
    return splitResponse
}
