import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines, splitSpaces } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input: string) => {
    const scores = {
        X: 1,
        Y: 2,
        Z: 3,
    }

    const gameScores = {
        A: { X: 3, Y: 6, Z: 0 },
        B: { X: 0, Y: 3, Z: 6 },
        C: { X: 6, Y: 0, Z: 3 }
    }

    const score = splitLines(input).reduce((prev, curr) => {
        const guesses = splitSpaces(curr);
        return prev + scores[guesses[1]] + gameScores[guesses[0]][guesses[1]];
    }, 0);

    return score;
}

export default runner;
