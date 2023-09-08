export function splitResponse(response: string): string[] {
    const lines: string[] = response.split("\n")
    const splitResponse: string[] = []

    let currentIndex = 0
    lines.forEach((response) => {
        if (splitResponse.length <= currentIndex) {
            splitResponse.push(response)
        } else if (splitResponse[currentIndex].length + response.length < 2000) {
            splitResponse[currentIndex] = splitResponse[currentIndex] + "\n" + response
        } else {
            splitResponse.push(response)
            currentIndex += 1
        }
    })
    return splitResponse
}
