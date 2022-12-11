import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

type Operation = `${'+' | '*'} ${number | 'old'}`;

interface Monkey {
    items: number[];
    operation: Operation;
    test: number;
    result: {
        success: number;
        failure: number;
    };
    inspections: number;
}

function parseIntoMonkeys(lines: string[]) {
    const monkeys: Monkey[] = [];

    for (let i = 0; i < lines.length; i = i + 7) {
        const items = lines[i + 1].replace('  Starting items: ', '').split(', ').map(i => parseInt(i));
        const operation = lines[i + 2].replace('  Operation: new = old ', '') as Operation;
        const test = parseInt(lines[i + 3].replace('  Test: divisible by ', ''));
        const success = parseInt(lines[i + 4].replace('    If true: throw to monkey ', ''));
        const failure = parseInt(lines[i + 5].replace('    If false: throw to monkey ', ''));
        monkeys.push({
            items,
            operation,
            test,
            result: {
                success,
                failure
            },
            inspections: 0
        });
    }
    return monkeys;
}

function processRound(monkeys: Monkey[]) {
    for (let i = 0; i < monkeys.length; i++) {
        processMonkey(monkeys, i);
    }
}

function processMonkey(monkeys: Monkey[], index: number) {
    const inspectingMonkey = monkeys[index];
    inspectingMonkey.items = inspectingMonkey.items.map(i => Math.floor(applyOperation(i, inspectingMonkey.operation) / 3));
    inspectingMonkey.inspections += inspectingMonkey.items.length;
    for (const item of inspectingMonkey.items) {
        if (applyTest(item, inspectingMonkey.test)) {
            monkeys[inspectingMonkey.result.success].items.push(item)
        } else {
            monkeys[inspectingMonkey.result.failure].items.push(item);
        }
    }
    inspectingMonkey.items.length = 0;
    
}

function applyOperation(num: number, operation: Operation) {
    const parts = operation.split(' ');
    if (parts[0] === '*') {
        if(parts[1] === 'old') {
            return num * num;
        }

        return num * parseInt(parts[1]);
    }
    if (parts[1] === 'old') {
        return num + num;
    }
    return num + parseInt(parts[1]);
}

function applyTest(item: number, test: number) {
    return item % test === 0;
}

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    const monkeys = parseIntoMonkeys(lines);

    for (let i = 0; i < 20; i++) {
        processRound(monkeys);
    }
    console.log(monkeys.map((m => m.inspections)));
    monkeys.sort((a,b) => b.inspections - a.inspections);
    
    return monkeys[0].inspections * monkeys[1].inspections;
}

export default runner;
