export function capitalizeFLetter(letter:string): string{
    return letter.toLowerCase().replace(/^\w/, (character) => character.toUpperCase());
}