import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

function getViewDistance(trees: number[][], iStart: number, jStart: number) {
    const value = trees[iStart][jStart];
    let score = 1;
    const directions = [0, 0, 0, 0]
    if (iStart === 0 || jStart === 0 || iStart === trees.length - 1 || jStart === trees[iStart].length - 1) {
        return 0;
    }
    let found = false;
    for (let i = iStart + 1; i < trees.length; i++) {
        if (trees[i][jStart] >= value) {
            directions[0] = (i - iStart);
            score = score * (i - iStart);
            found = true;
            break;
        }
    }
    if (!found) {
        directions[0] = (trees[iStart].length - 1 - iStart);
        score = score * (trees[iStart].length - 1 - iStart);
    }
    found = false;
    for (let i = iStart - 1; i >= 0; i--) {
        if (trees[i][jStart] >= value) {
            directions[1] = (iStart - i);
            score = score * (iStart - i);
            found = true;
            break;
        }
    }
    if (!found) {
        directions[1] = (iStart)
        score = score * iStart;
    }
    found = false;
    for (let j = jStart + 1; j < trees[iStart].length; j++) {
        if (trees[iStart][j] >= value) {
            directions[2] = (j - jStart);
            score = score * (j - jStart);
            found = true;
            break;
        }
    }
    if (!found) {
        directions[2] = (trees.length - 1 - jStart)
        score = score * (trees.length - 1 - jStart);
    }
    found = false;
    for (let j = jStart - 1; j >= 0; j--) {
        if (trees[iStart][j] >= value) {
            directions[3] = (jStart - j);
            score = score * (jStart - j);
            found = true;
            break;
        }
    }
    if (!found) {
        directions[3] = (jStart);
        score = score * jStart;
    }
    found = false;
    return score;
}

const runner: RunnerFunction<number> = (input) => {
    let highestView = 0;
    const lines = splitLines(input);
    const trees = lines.map(l => l.split('').map(t => parseInt(t)));
    for (let i = 0; i < trees.length; i++) {
        for (let j = 0; j < trees[i].length; j++) {
            const viewDistance = getViewDistance(trees, i, j);
            if (viewDistance > highestView) {
                highestView = viewDistance;
            }
        }
    }
    return highestView;
}

export default runner;