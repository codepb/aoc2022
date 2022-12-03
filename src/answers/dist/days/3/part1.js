import { splitLines } from "../../utils/string.js";
const indexString = "¬abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const runner = (input) => {
    let totalScore = 0;
    for (const line of splitLines(input)) {
        const firstHalf = [];
        const secondHalf = [];
        for (let i = 0; i < line.length; i++) {
            const charAt = indexString.indexOf(line.charAt(i));
            if (i < line.length / 2) {
                firstHalf.push(charAt);
            }
            else {
                secondHalf.push(charAt);
            }
        }
        const itemInBoth = firstHalf.find(i => secondHalf.includes(i));
        totalScore += itemInBoth;
    }
    return totalScore;
};
export default runner;
