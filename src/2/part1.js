function runner(input) {
    const lines = input.split('\r\n');

    const scores = {
        X: 1,
        Y: 2,
        Z: 3,
    }

    const gameScores = {
        A: {
            X: 3,
            Y: 6,
            Z: 0
        },
        B: {
            X: 0,
            Y: 3,
            Z: 6
        },
        C: {
            X: 6,
            Y: 0,
            Z: 3
        }
    }

    let score = 0;

    for (const line of lines) {
        const guesses = line.split(' ');

        score += scores[guesses[1]] + gameScores[guesses[0]][guesses[1]];
    }

    return score;
}

export default runner;
