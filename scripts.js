function calcularResultado() {
    let pontos = [0, 0, 0, 0, 0];
    const respostas = document.querySelectorAll('input[type="radio"]:checked');
    
    respostas.forEach(resposta => {
        const valores = resposta.value.split(',');
        
        valores.forEach((valor, indice) => {
            const pontosParaAdicionar = parseInt(valor);
            if (!isNaN(pontosParaAdicionar)) {
                pontos[indice] += pontosParaAdicionar;
            }
        });
    });

    let maiorPontuacao = -1;
    let indiceVencedor = 0;
    
    pontos.forEach((pontuacao, indice) => {
        if (pontuacao > maiorPontuacao) {
            maiorPontuacao = pontuacao;
            indiceVencedor = indice;
        }
    });
    
    exibirCardVencedor(indiceVencedor, pontos);
}

function exibirCardVencedor(indice, pontos) {
    const descricoes = [
        "Você é uma força da natureza! Impulsivo, corajoso e incrivelmente forte, você enfrenta os desafios de frente sem medo. Sua determinação é inabalável e você prefere resolver as coisas com ação direta. Pode não ser o mais estratégico, mas quando se trata de força bruta e resistência, ninguém te supera!",
        "Você é o herói destemido! Nobre, rápido e cheio de estilo, você age com atitude e decisão. Não perde tempo - quando vê uma oportunidade, parte para a ação com tudo. Sua energia é contagiante, e você adora um bom desafio para provar sua habilidade.",
        "Você é o protetor do grupo! Paciente, resistente e sempre disposto a suportar o peso dos problemas pelos outros. Sua abordagem é mais defensiva, mas quando você age, causa um impacto enorme. Prefere a calma da natureza e valoriza a lealdade acima de tudo.",
        "Você é o cérebro da equipe! Inteligente, estratégico e sempre pensando à frente, você resolve problemas com magia (ou criatividade). Conhecimento é poder para você, e você prefere analisar cada situação antes de agir. Seu estilo é calculista, mas extremamente eficaz.",
        "Você é a astuta e ágil! Esperta, ágil e sempre um passo à frente, você prefere atacar de longe com precisão. Paciente quando precisa ser, mas decisiva na hora certa. Valoriza liberdade e natureza, e sabe que velocidade e estratégia são tão importantes quanto força bruta."
    ];

    const nomesPersonagens = ["P.E.K.K.A", "Príncipe", "Gigante", "Mago", "Arqueira"];

    const cardOriginal = document.querySelector(`.personagem-card[data-value="${indice}"]`);
    
    if (!cardOriginal) return;
    
    const cardClone = cardOriginal.cloneNode(true);
    const cardVencedor = document.getElementById('card-vencedor');
    cardVencedor.innerHTML = '';
    cardVencedor.appendChild(cardClone);

    const descricaoElement = document.createElement('p');
    descricaoElement.className = 'descricao-personagem';
    descricaoElement.textContent = descricoes[indice];
    cardVencedor.appendChild(descricaoElement);

    const pontosElement = document.createElement('p');
    pontosElement.className = 'pontos-personagem';
    pontosElement.innerHTML = `<strong>Pontuação:</strong> ${pontos[indice]} pontos`;
    cardVencedor.appendChild(pontosElement);


    const popup = document.getElementById('popup-vencedor');
    popup.style.display = 'flex';
    
    document.getElementById('fechar-popup').addEventListener('click', () => {
        popup.style.display = 'none';
    });

    document.getElementById('reiniciar-quiz').addEventListener('click', () => {
        location.reload()
    });
}

function verificarRespostas() {
    const gruposPerguntas = document.querySelectorAll('.quiz-question');
    
    for (const grupo of gruposPerguntas) {
        const respostaMarcada = grupo.querySelector('input[type="radio"]:checked');
        
        if (!respostaMarcada) {
            const numeroPergunta = grupo.querySelector('p').textContent.split('.')[0];
            alert(`Por favor, responda a pergunta ${numeroPergunta} antes de ver o resultado!`);
            return false;
        }
    }
    return true;
}

document.querySelector('.submit-btn').addEventListener('click', function() {
    if (verificarRespostas()) {
        calcularResultado();
    }
});