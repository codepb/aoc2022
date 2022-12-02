import { splitLines } from "../../utils/string.js";
const runner = (input) => {
    let maxCalories = 0;
    let currentCalories = 0;
    for (const line of splitLines(input)) {
        if (line === '') {
            currentCalories = 0;
            continue;
        }
        const calories = parseInt(line);
        currentCalories += calories;
        if (currentCalories > maxCalories) {
            maxCalories = currentCalories;
        }
    }
    return maxCalories;
};
export default runner;