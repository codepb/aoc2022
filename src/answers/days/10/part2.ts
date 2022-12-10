import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

const runner: RunnerFunction<string> = (input) => {
    const instructions = splitLines(input).map(i => i.split(' '));
    const output = [] as string[];
    let score = 1;
    let processing = false;
    let nextAdd = 0;
    for (let i = 0; i < 240; i++) {
        const pixel = i % 40;
        if(score - 1 <= pixel && score + 1 >= pixel) {
            output.push('#');
        } else {
            output.push('.');
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
    return output.reduce((prev, curr, index) => {
        if ((index + 1) % 40 === 0) {
            return prev + curr + '\r\n';
        }
        return prev + curr;
    }, '');
}

export default runner;