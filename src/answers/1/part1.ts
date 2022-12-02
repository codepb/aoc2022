function runner(input: string) {
    const lines = input.split('\r\n');

    let maxCalories = 0;
    let currentCalories = 0;

    for(const line of lines) {
        if (line === ''){
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