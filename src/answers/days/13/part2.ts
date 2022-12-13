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

function runSingleSort(messages: Message[]) {
    let swapped = false;
    for (let i = 0; i < messages.length - 1; i++) {
        const first = messages[i];
        const second = messages[i + 1];

        if (!areInRightOrder(first, second)) {
            messages[i] = second;
            messages[i + 1] = first;
            swapped = true;
        }
    }
    return swapped;
}

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    const messages = lines.map(l => {
        return l === "" ? "" : JSON.parse(l);
    }).reduce((prev, curr) => {
        if (curr === "") {
            return prev;
        }
        return [...prev, curr]
    },[]);
    const firstDivider = [[2]];
    const secondDivider = [[6]]
    messages.push(firstDivider, secondDivider);
    let i = 1;
    while(runSingleSort(messages)) {
        if (i % 100 === 0) {
            console.log(`${i} iterations`);
        }
    }
    const index1 = messages.indexOf(firstDivider) + 1;
    const index2 = messages.indexOf(secondDivider) + 1;
    return index1 * index2;
}

export default runner;