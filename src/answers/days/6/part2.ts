import type RunnerFunction from "../../types/RunnerFunction.js";

const runner: RunnerFunction<number> = (input) => {
    const setSize = 14
    for (let i = 0; i < input.length - setSize; i++) {
        const stringToCheck = input.substring(i, i+setSize);
        const set = new Set(stringToCheck);
        if (set.size === setSize) {
            return i + setSize;
        }
    }
    return 0;
}

export default runner;