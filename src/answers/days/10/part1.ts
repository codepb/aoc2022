import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input) => {
    const instructions = splitLines(input).map(i => i.split(' '));
    const cycleScores = [] as number[];
    let score = 1;
    let processing = false;
    let nextAdd = 0;
    for (let i = 1; i < 221; i++) {
        if ((i - 20) % 40 === 0) {
            cycleScores.push(i*score);
        }
        if (processing) {
            score += nextAdd;
            nextAdd = 0;
            processing = false;
            continue;
        }
        const instruction = instructions.shift();
        if (instruction[0] === 'addx') {
            nextAdd = parseInt(instruction[1]);
            processing = true;
        }
    }
    return cycleScores.reduce((prev, curr) => prev + curr, 0);
}

export default runner;