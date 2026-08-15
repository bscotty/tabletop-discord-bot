export function replaceVal(valString: string, replaceWith: string): string {
    return valString.replace(/\{VAL}/, replaceWith)
}