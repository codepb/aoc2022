import type RunnerFunction from "../../types/RunnerFunction.js";
import { isEmpty, splitLines } from "../../utils/string.js";

const indexString = "¬abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const runner: RunnerFunction<number> = (input) => {
    let totalScore = 0;
    const lines = splitLines(input)
    for(let i = 0; i < lines.length / 3; i++) {
        const first = Array.from(lines[i * 3], i => indexString.indexOf(i));
        const second = Array.from(lines[i * 3 + 1], i => indexString.indexOf(i));
        const third = Array.from(lines[i * 3 + 2], i => indexString.indexOf(i));
        const inAll = first.find(i => second.includes(i) && third.includes(i));
        totalScore += inAll;
    }
    return totalScore;
}

export default runner;