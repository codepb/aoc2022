import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

function overlaps(a: [number, number], b: [number, number]) {
    return (a[0] >= b[0] && a[0] <= b[1])
    || (a[1] >= b[0] && a[1] <= b[1])
    || (b[0] >= a[0] && b[0] <= a[1])
    || (b[1] >= a[0] && b[1] <= a[1]);
}

const runner: RunnerFunction<number> = (input) => {
    return splitLines(input).reduce((prev, curr) => {
        const pair = curr.split(',').map(p => p.split('-').map(n => parseInt(n)));
        return overlaps(pair[0] as [number, number], pair[1] as [number, number]) ? prev + 1 : prev;
    }, 0);
}

export default runner;