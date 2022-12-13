import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

type Message = number | Message[];

function areInRightOrder(first: Message, second: Message) {
    if (typeof first === 'number' && typeof second === 'number') {
        if (first === second) {
            return null;
        } else {
            return first < second;
        }
    }
    if (typeof first === 'number' && typeof second !== 'number') {
        return areInRightOrder([first], second);
    }
    if (typeof first !== 'number' && typeof second === 'number') {
        return areInRightOrder(first, [second]);
    }
    if (typeof first === 'number') {
        throw 'First should not be number here';
    }
    if (typeof second === 'number') {
        throw 'Second should not be number here';
    }
    for (let i = 0; i < first.length; i++) {
        if (second.length < i + 1) {
            return false;
        }
        const result = areInRightOrder(first[i], second[i]);
        if (result !== null) {
            return result;
        }
    }
    if (first.length < second.length) {
        return true;
    }
    return null;
}

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    const messages = lines.map(l => {
        return l === "" ? "" : JSON.parse(l);
    })
    const rightOrder: number[] = []
    for (let i = 0; i < messages.length; i += 3) {
        const first = messages[i];
        const second = messages[i + 1];

        if (areInRightOrder(first, second)) {
            rightOrder.push((i / 3) + 1);
        }
    }
    return rightOrder.reduce((prev, curr) => prev + curr, 0);
}

export default runner;