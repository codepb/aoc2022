import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";
type CoordMap = ('r' | 's' | 'e')[][];
type Coord = readonly [number, number];

function splitIntoGridCoords (lines: string[]) {
    const coordMap: CoordMap = [];
    for (const line of lines) {
        const coords = line.split(' -> ').map(c => c.split(',').map(c1 => parseInt(c1)));
        for (let i = 1; i < coords.length; i++) {
            const prev = coords[i - 1];
            const curr = coords[i];
            for (let x = Math.min(prev[0], curr[0]); x <= Math.max(prev[0], curr[0]); x++) {
                for (let y = Math.min(prev[1], curr[1]); y <= Math.max(prev[1], curr[1]); y++) {
                    if (!coordMap[x]) {
                        coordMap[x] = [];
                    }
                    
                    for (let i = 0; i < y; i++) {
                        if (!coordMap[x][i]) {
                            coordMap[x][i] = 'e';
                        }
                    }
                    coordMap[x][y] = 'r';
                }
            }
        }
    }
    const maxY = coordMap.reduce((prev, curr) => {
        return Math.max(prev, curr.length - 1);
    }, 0);

    for (let x = 0; x < 1000; x++) {
        if (!coordMap[x]) {
            coordMap[x] = [];
        }
        for (let y = 0; y < maxY + 2; y++) {
            if (!coordMap[x][y]) {
                coordMap[x][y] = 'e';
            }
        }
        coordMap[x][maxY + 2] = 'r';
    }
    return coordMap;
}

function simulateSand(map: CoordMap, sandOrigin: Coord) {
    let i = 1;
    while (simulateSandParticle(map, sandOrigin)) {
        i++;
        if (i > 100000) {
            break;
        }
    }
    return i;
}

function simulateSandParticle(map: CoordMap, sandOrigin: Coord) {
    let location = sandOrigin;
    let canMove = true;
    while(canMove) {
        const nextLocation = takeStep(map, location);
        if (nextLocation === false) {
            map[location[0]][location[1]] = 's';
            return !(location[0] === 500 && location[1] === 0);
        }
        location = nextLocation
    }
    return false;
}

function takeStep(map: CoordMap, currentLocation: Coord): Coord | false {
    const nextY = currentLocation[1] + 1;
    if (map[currentLocation[0]][nextY] === 'e') {
        return [currentLocation[0], nextY];
    }
    if (map[currentLocation[0] - 1][nextY] === 'e') {
        return [currentLocation[0] - 1, nextY];
    }
    if (map[currentLocation[0] + 1][nextY] === 'e') {
        return [currentLocation[0] + 1, nextY];
    }
    return false;
}

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    const map = splitIntoGridCoords(lines);
    const sandOrigin = [500,0] as const;
    const sandParticles = simulateSand(map, sandOrigin);

    return sandParticles;
}

export default runner;