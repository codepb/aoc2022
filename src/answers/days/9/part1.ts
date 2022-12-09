import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    const positions: Set<string> = new Set();
    positions.add("0-0");
    const headPositions: Set<string> = new Set();
    const headPos = [0,0];
    const tailPos = [0,0];

    function addPositions() {
        positions.add(`${tailPos[0]}-${tailPos[1]}`);
        headPositions.add(`${headPos[0]}-${headPos[1]}`);
    }

    function processInstruction([direction, amount]: [string, number]) {
        for(let i = 0; i < amount; i++) {
            moveHead(direction);
            moveTail();
            addPositions();
        }
    }

    function moveHead(direction: string) {
        switch (direction) {
            case 'R':
                headPos[0]++;
                break;
            case 'L':
                headPos[0]--;
                break;
            case 'U':
                headPos[1]++;
                break;
            case 'D':
                headPos[1]--;
                break;
        }
    }

    function moveTail() {
        const diffX = headPos[0] - tailPos[0];
        const diffY = headPos[1] - tailPos[1];

        if  (Math.abs(diffX) < 2 && Math.abs(diffY) < 2) {
            return;
        }

        // we need to move
        if (diffY === 0) {
            moveTailX(diffX);
        } else if (diffX === 0) {
            moveTailY(diffY);
        } else {
            moveTailX(diffX);
            moveTailY(diffY);
        }
    }

    function moveTailX(diff: number) {
        if (diff < 0) {
            tailPos[0]--;
        } else {
            tailPos[0]++;
        }
    }

    function moveTailY(diff: number) {
        if (diff < 0) {
            tailPos[1]--;
        } else {
            tailPos[1]++;
        }
    }
    for (const line of lines) {
        const instruction = line.split(' ');
        processInstruction([instruction[0], parseInt(instruction[1])]);
    }

    return positions.size;
}

export default runner;