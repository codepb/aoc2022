import fs from 'fs';
import path from 'path';

function getInput(day, type) {
    const input = fs.readFileSync(path.resolve(`../answers/dist/days/${day}/inputs/${type}.txt`));
    return input.toString();
}

export default getInput;