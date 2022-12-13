export function splitLines(input: string): string[]
export function splitLines<T>(input: string, mapFunction: (char: string) => T): T[]

export function splitLines<T = string>(input: string, mapFunction?: (line: string) => T) {
    if (mapFunction) {
        return input.split('\r\n').map(mapFunction);
    }
    return input.split('\r\n');
}

export function splitIntoGrid(input: string): string[][]
export function splitIntoGrid<T>(input: string, mapFunction: (char: string) => T): T[][]

export function splitIntoGrid<T = string>(input: string, mapFunction?: (char: string) => T) {
    const lines = splitLines(input);
    const grid = lines.map(l => {
        if (mapFunction) {
            return l.split('').map(mapFunction);
        } else {
            return l.split('');
        }});
    return grid;
}

export function splitSpaces(input: string) {
    return input.split(' ');
}

export function isEmpty(input: string) {
    return input === '';
}