const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')


const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    console.log(username.value)
    saveScoreBtn.disabled = !username.value
})


saveHighScore = async (e) => {
    e.preventDefault()


    const score = {
        score: mostRecentScore,
        name: username.value
        }

        try {
            // Referência ao documento do usuário no Firestore
            const userScoreRef = db.collection('highScores').doc(username.value);
            const doc = await userScoreRef.get();
    
            if (doc.exists) {
                // Atualize a pontuação se a nova for maior
                if (doc.data().score < score.score) {
                    await userScoreRef.update({ score: score.score });
                }
            } else {
                // Se o documento não existir, crie um novo
                await userScoreRef.set(score);
            }


        highScores.push(score)

        highScores.sort((a,b) => {
            return b.score - a.score
        })


        highScores.splice(5)

        window.location.assign('/');
    } catch (error) {
        console.error("Erro ao salvar o score: ", error);
    }
}
