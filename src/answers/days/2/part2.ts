import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines, splitSpaces } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input: string) => {
    const scores = {
        A: { X: 3, Y: 1, Z: 2 },
        B: { X: 1, Y: 2, Z: 3},
        C: { X: 2, Y: 3, Z: 1 }
    }

    const gameScores = {
        X: 0,
        Y: 3,
        Z: 6
    }

    const score = splitLines(input).reduce((prev, curr) => {
        const guesses = splitSpaces(curr);
        return prev + scores[guesses[0]][guesses[1]] + gameScores[guesses[1]];
    }, 0);

    return score;
}

export default runner;
