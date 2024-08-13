const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')

const saveHighScore = async (name, score) => {
    try {
        // Referência ao documento do usuário
        const userScoreRef = db.collection('highScores').doc(name);
        const doc = await userScoreRef.get();

        if (doc.exists) {
            // Se o novo score for maior, atualize
            if (doc.data().score < score) {
                await userScoreRef.update({ score: score });
            }
        } else {
            // Se o usuário não tem um score, crie um novo
            await userScoreRef.set({ name: name, score: score });
        }
    } catch (error) {
        console.error("Erro ao salvar o score: ", error);
    }
};

const loadHighScores = async () => {
    try {
        const querySnapshot = await db.collection('highScores').orderBy('score', 'desc').limit(10).get();
        const highScoresList = document.querySelector('#highScoresList');
        highScoresList.innerHTML = querySnapshot.docs.map(doc => {
            const { name, score } = doc.data();
            return `<li class="high-score">${name} - ${score}</li>`;
        }).join('');
    } catch (error) {
        console.error("Erro ao carregar os scores: ", error);
    }
};

// Chamar a função para carregar as pontuações ao carregar a página
loadHighScores();
