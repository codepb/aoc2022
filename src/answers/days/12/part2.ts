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
                arr[i][j] = Infinity;
            }
        }
    }

    return arr;
}

function canVisit(current: string, next: string) {
    return current.charCodeAt(0) - 1 <= next.charCodeAt(0);
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

function findShortestPath(startPoints: Coords[], end: Coords, grid: string[][]) {
    const shortestPathArray = buildShortestPathGrid(grid.length, grid[0].length, end);
    visitAdjacent(end, grid, shortestPathArray);
    let shortest = Infinity;
    for (const start of startPoints) {
        if (shortestPathArray[start[0]][start[1]] < shortest) {
            shortest = shortestPathArray[start[0]][start[1]];
        }
    }
    return shortest;
}

function findStartPoints(grid: string[][]) {
    const startPoints = [] as Coords[];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === 'a') {
                startPoints.push([i, j]);
            }
        }
    }

    return startPoints;
}

const runner: RunnerFunction<number> = (input) => {
    const grid = splitIntoGrid(input);
    
    const { end } = findStartAndEnd(grid);
    const startPoints = findStartPoints(grid);
    const shortestPath = findShortestPath(startPoints, end, grid); 
    return shortestPath;
}

export default runner;
