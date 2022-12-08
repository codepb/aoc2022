import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

interface VisibleStatus {
    visible0?: boolean;
    visible1?: boolean;
    visible2?: boolean;
    visible3?: boolean;
}

const runner: RunnerFunction<number> = (input) => {
    const map: Record<string, VisibleStatus> = {}
    const lines = splitLines(input);
    const trees = lines.map(l => l.split('').map(t => parseInt(t)));
    const highestJ = [];
    const highestK = [];
    for(let j = 0 ; j < trees.length; j++) {
        for (let k = 0; k < trees[j].length; k++) {
            if (typeof highestJ[j] === 'undefined' || highestJ[j] < trees[j][k]) {
                highestJ[j] = trees[j][k];
                const key = `${j}-${k}`;
                map[key] = map[key] ? {...map[key], [`visible${0}`]: true } : {[`visible${0}`]: true}
            }
            if (typeof highestK[k] === 'undefined' || highestK[k] < trees[j][k]) {
                highestK[k] = trees[j][k];
                const key = `${j}-${k}`;
                map[key] = map[key] ? {...map[key], [`visible${1}`]: true } : {[`visible${1}`]: true}
            } 
        }
    }
    highestJ.length = 0;
    highestK.length = 0;
    for(let j = trees.length - 1 ; j >= 0; j--) {
        for (let k = trees.length - 1; k >= 0; k--) {
            if (typeof highestJ[j] === 'undefined' || highestJ[j] < trees[j][k]) {
                highestJ[j] = trees[j][k];
                const key = `${j}-${k}`;
                map[key] = map[key] ? {...map[key], [`visible${2}`]: true } : {[`visible${2}`]: true}
            }
            if (typeof highestK[k] === 'undefined' || highestK[k] < trees[j][k]) {
                highestK[k] = trees[j][k];
                const key = `${j}-${k}`;
                map[key] = map[key] ? {...map[key], [`visible${3}`]: true } : {[`visible${3}`]: true}
            } 
        }
    }
    const numberOfVisibleTrees = Object.values(map).reduce((prev, curr) => prev + (curr.visible0 || curr.visible1 || curr.visible2 || curr.visible3 ? 1 : 0), 0)
    return numberOfVisibleTrees;
}

export default runner;