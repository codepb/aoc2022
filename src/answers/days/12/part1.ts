import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitIntoGrid } from "../../utils/string.js";

type Coords = [number, number];

function findStartAndEnd(grid: string[][]) {
    let start = [0,0] as Coords;
    let end = [0,0] as Coords;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 'S') {
                start = [i, j];
                grid[i][j] = 'a';
            } else if (grid[i][j] === 'E') {
                end = [i, j];
                grid[i][j] = 'z';
            }
        }
    }
    return { start, end };
}

function buildShortestPathGrid(height: number, width: number, start: Coords) {
    const arr = [] as number[][];
    for (let i = 0; i < height; i++) {
        arr[i] = [];
        for (let j = 0; j < width; j++) {
            if (i === start[0] && j === start[1]) {
                arr[i][j] = 0;
            } else {
                arr[i][j] = null;
            }
        }
    }

    return arr;
}

function canVisit(current: string, next: string) {
    return current.charCodeAt(0) >= next.charCodeAt(0) - 1;
}

function visitAdjacent(start: Coords, grid: string[][], shortestPath: number[][]) {
    const current = grid[start[0]][start[1]];
    const nextPathLength = shortestPath[start[0]][start[1]] + 1;
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;
    if (start[0] - 1 >= 0) {
        const destination = grid[start[0] - 1][start[1]];
        const destinationPathLength = shortestPath[start[0] - 1][start[1]];
        if (canVisit(current, destination) && (destinationPathLength === null || destinationPathLength > nextPathLength)) {
            shortestPath[start[0] - 1][start[1]] = nextPathLength;
            visitAdjacent([start[0] - 1, start[1]], grid, shortestPath);
        }
    }
    if (start[0] + 1 < gridHeight) {
        const destination = grid[start[0] + 1][start[1]];
        const destinationPathLength = shortestPath[start[0] + 1][start[1]];
        if (canVisit(current, destination) && (destinationPathLength === null || destinationPathLength > nextPathLength)) {
            shortestPath[start[0] + 1][start[1]] = nextPathLength;
            visitAdjacent([start[0] + 1, start[1]], grid, shortestPath);
        }
    }
    if (start[1] - 1 >= 0) {
        const destination = grid[start[0]][start[1] - 1];
        const destinationPathLength = shortestPath[start[0]][start[1] - 1];
        if (canVisit(current, destination) && (destinationPathLength === null || destinationPathLength > nextPathLength)) {
            shortestPath[start[0]][start[1] - 1] = nextPathLength;
            visitAdjacent([start[0], start[1] - 1], grid, shortestPath);
        }
    }
    if (start[1] + 1 < gridWidth) {
        const destination = grid[start[0]][start[1] + 1];
        const destinationPathLength = shortestPath[start[0]][start[1] + 1];
        if (canVisit(current, destination) && (destinationPathLength === null || destinationPathLength > nextPathLength)) {
            shortestPath[start[0]][start[1] + 1] = nextPathLength;
            visitAdjacent([start[0], start[1] + 1], grid, shortestPath);
        }
    }
}

function findShortestPath(start: Coords, end: Coords, grid: string[][]) {
    const shortestPathArray = buildShortestPathGrid(grid.length, grid[0].length, start);
    visitAdjacent(start, grid, shortestPathArray);
    return shortestPathArray[end[0]][end[1]];
}

const runner: RunnerFunction<number> = (input) => {
    const grid = splitIntoGrid(input);
    
    const { start, end } = findStartAndEnd(grid);
    const shortestPath = findShortestPath(start, end, grid);
    return shortestPath;
}

export default runner;
