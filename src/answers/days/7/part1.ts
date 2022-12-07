import type RunnerFunction from "../../types/RunnerFunction.js";
import { splitLines } from "../../utils/string.js";

const runner: RunnerFunction<number> = (input) => {
    const lines = splitLines(input);
    const currentDirectory = [];
    const directoryMap: Record<string, number> = {};

    function handleCommand(command: string[]) {
        if (command[1] === 'cd') {
            switch(command[2]) {
                case '..':
                    currentDirectory.pop();
                    break;
                case '..':
                    currentDirectory.length = 0;
                    break;
                default:
                    currentDirectory.push(command[2]);
                    break;
            }
        }
    }

    function handleFile(file: string[]) {
        if (file[0] !== 'dir') {
            let path = '/';
            const fileSize = parseInt(file[0]);
            
            for (const directory of currentDirectory) {
                path += directory + '/'
                directoryMap[path] = directoryMap[path] ? directoryMap[path] + fileSize : fileSize;
            }
        }
    }

    for (const line of lines) {
        const splitLine = line.split(' ');
        if (splitLine[0] === '$') {
            handleCommand(splitLine);
        } else {
            handleFile(splitLine);
        }
    }
    const totalFileSize = Object.values(directoryMap).filter(v => v <= 100000).reduce((prev, curr) => {
        return prev + curr;
    }, 0)
    return totalFileSize;
}

export default runner;