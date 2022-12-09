import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    const positions: Set<string> = new Set();
    positions.add("0-0");
    const headPositions: Set<string> = new Set();
    headPositions.add("0-0");
    const headPos = [0,0]  as [number, number];
    const tailPos = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]] as [number, number][];

    function addPositions() {
        positions.add(`${tailPos[tailPos.length - 1][0]}-${tailPos[tailPos.length - 1][1]}`);
        headPositions.add(`${headPos[0]}-${headPos[1]}`);
    }

    function processInstruction([direction, amount]: [string, number]) {
        for(let i = 0; i < amount; i++) {
            moveHead(direction);
            for(let i = 0; i < tailPos.length; i++) {
                moveTail(i, i === 0 ? headPos : tailPos[i - 1]);
            }
            
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

    function moveTail(i: number, head: [number, number]) {
        const diffX = head[0] - tailPos[i][0];
        const diffY = head[1] - tailPos[i][1];

        if  (Math.abs(diffX) < 2 && Math.abs(diffY) < 2) {
            return;
        }

        // we need to move
        if (diffY === 0) {
            moveTailX(i, diffX);
        } else if (diffX === 0) {
            moveTailY(i, diffY);
        } else {
            moveTailX(i, diffX);
            moveTailY(i, diffY);
        }
    }

    function moveTailX(i: number, diff: number) {
        if (diff < 0) {
            tailPos[i][0]--;
        } else {
            tailPos[i][0]++;
        }
    }

    function moveTailY(i: number, diff: number) {
        if (diff < 0) {
            tailPos[i][1]--;
        } else {
            tailPos[i][1]++;
        }
    }
    for (const line of lines) {
        const instruction = line.split(' ');
        processInstruction([instruction[0], parseInt(instruction[1])]);
    }

    return positions.size;
}

export default runner;