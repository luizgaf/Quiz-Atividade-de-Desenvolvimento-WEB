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
    
    exibirCardVencedor(indiceVencedor);
}

function exibirCardVencedor(indice) {
    const cardOriginal = document.querySelector(`.personagem-card[data-value="${indice}"]`);
    
    if (!cardOriginal) return;
    
    const cardClone = cardOriginal.cloneNode(true);
    
    const cardVencedor = document.getElementById('card-vencedor');
    cardVencedor.innerHTML = '';
    cardVencedor.appendChild(cardClone);
    
    const popup = document.getElementById('popup-vencedor');
    popup.style.display = 'flex';
    
    document.getElementById('fechar-popup').addEventListener('click', () => {
        popup.style.display = 'none';
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