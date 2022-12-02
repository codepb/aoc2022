import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input) => {
    let maxCalories = [0,0,0];
    let currentCalories = 0;

    function checkAndUpdateMaxCalories(calories) {
        if (calories > maxCalories[2]) {
            maxCalories[2] = calories;
            maxCalories.sort((a, b) => b - a);
        }
    }

    for(const line of splitLines(input)) {
        if (line === ''){
            checkAndUpdateMaxCalories(currentCalories);
            currentCalories = 0;
            continue;
        }
        const calories = parseInt(line);
        currentCalories += calories;
    }

    checkAndUpdateMaxCalories(currentCalories);

    return maxCalories.reduce((a,b) => a + b, 0);
}

export default runner;