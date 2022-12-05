import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";


function populateBoxes(line: string, boxes: string[][]) {
    for (let j = 1; j < line.length; j += 4) {
        const char = line[j];
        if (char !== ' ' && isNaN(parseInt(char))) {
            addBox(boxes, (j - 1) / 4, char);
        }
    }
}

function addBox(boxes: string[][], index: number, letter: string) {
    let current = boxes[index];
    if (!current) {
        boxes[index] = [];
        current = boxes[index];
    }

    current.unshift(letter);
}

interface Instruction {
    amount: number;
    from: number;
    to: number
}

function parseInstruction(line: string) {
    const amountSplit = line.split(' from ');
    const amount = parseInt(amountSplit[0].replace('move ', ''));
    const fromToSplit = amountSplit[1].split(' to ');
    const from = parseInt(fromToSplit[0]) - 1;
    const to = parseInt(fromToSplit[1]) - 1;
    return {amount, from, to};
}

function processInstructions(instructions: Instruction[], boxes: string[][]) {
    for (const instruction of instructions) {
        processInstruction(instruction, boxes);
    }
}

function processInstruction({amount, from, to}: Instruction, boxes: string[][]) {
    for (let i = 0; i < amount; i ++) {
        const toMove = boxes[from].pop();
        boxes[to].push(toMove);
    }
}

const runner: RunnerFunction<string> = (input) => {
    const lines = splitLines(input);
    const boxes = [] as string[][];
    const instructions = [] as Instruction[];
    let onInstructions = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === '') {
            onInstructions = true;
            continue;
        }
        if (!onInstructions) {
            populateBoxes(lines[i], boxes);
        } else {
            instructions.push(parseInstruction(lines[i]));
        }
    }
    processInstructions(instructions, boxes);
    return boxes.map(b => b.pop()).join('');
}

export default runner;

