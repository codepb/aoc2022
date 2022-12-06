import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    return 0;
}

export default runner;