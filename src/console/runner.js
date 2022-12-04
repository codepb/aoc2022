import inquirer from 'inquirer';
import getInput from './utils/getInput.js';

const runAnswer = async () => {
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
            name: 'inputType',
            message: 'Which input?',
            choices: ['sample', 'input']
        }
    ]);

    const dayFolder = `${answers.day}`;
    
    const func = (await import(`answers/${dayFolder}/part${answers.part}.js`)).default;

    const input = getInput(answers.day, answers.inputType);

    const result = await func(input);

    console.log(result);

    const runAgainAnswer = await inquirer.prompt([
        { 
            type: 'list',
            name: 'runAgain',
            message: 'Would you like to run another?',
            choices: ['yes', 'no']
        }]);

    if(runAgainAnswer.runAgain === 'yes') {
        await runAnswer();
    }
}

const run = async () => {
    await runAnswer();
}

run();