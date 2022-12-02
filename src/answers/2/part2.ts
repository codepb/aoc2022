function runner(input: string) {
    const lines = input.split('\r\n');

    const scores = {
        A: { X: 3, Y: 1, Z: 2 },
        B: { X: 1, Y: 2, Z: 3},
        C: { X: 2, Y: 3, Z: 1 }
    }

    const gameScores = {
        X: 0,
        Y: 3,
        Z: 6
    }

    let score = 0;

    for (const line of lines) {
        const guesses = line.split(' ');

        score += scores[guesses[0]][guesses[1]] + gameScores[guesses[1]];
    }

    return score;
}

export default runner;
