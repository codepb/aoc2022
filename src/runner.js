import inquirer from 'inquirer';
import getInput from './utils/getInput.js';

const run = async () => {
    const answers = await inquirer.prompt([
        { 
            type: 'text',
            name: 'day',
            message: 'Which day do you want to run?'
        },
        {
            type: 'list',
            name: 'part',
            message: 'Which part?',
            choices: ['1', '2']
        },
        {
            type: 'list',
            name: 'input',
            message: 'Which input?',
            choices: ['sample', 'input']
        }
    ]);

    const dayFolder = `${answers.day}`;
    
    const func = (await import(`./${dayFolder}/part${answers.part}.js`)).default;

    const input = getInput(`./src/${dayFolder}/inputs/${answers.input}.txt`);

    const result = await func(input);

    console.log(result);
}

run();