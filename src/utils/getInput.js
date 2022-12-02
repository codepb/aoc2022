import fs from 'fs';

function getInput(path) {
    const input = fs.readFileSync(path);
    return input.toString();
}

export default getInput;