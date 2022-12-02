import type RunnerFunction from "../../types/RunnerFunction.js";
import { isEmpty, splitLines } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input) => {
    let maxCalories = 0;
    let currentCalories = 0;

    for(const line of splitLines(input)) {
        if (isEmpty(line)){
            currentCalories = 0;
            continue;
        }
        const calories = parseInt(line);
        currentCalories += calories;
        if(currentCalories > maxCalories) {
            maxCalories = currentCalories;
        }
    }

    return maxCalories;
}

export default runner;