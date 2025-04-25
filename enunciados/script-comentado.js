// Função principal que calcula o resultado do quiz
function calcularResultado() {
    // Inicializa o array de pontos para cada personagem na ordem:
    // [Pekka, Prince, Gigante, Mago, Arqueira]
    let pontos = [0, 0, 0, 0, 0];
    
    // Seleciona todas as respostas marcadas (inputs de rádio selecionados)
    const respostas = document.querySelectorAll('input[type="radio"]:checked');
    
    // Para cada resposta marcada no formulário
    respostas.forEach(resposta => {
        // Divide o valor da resposta (ex: "3,1,3,0,0") em um array de strings
        const valores = resposta.value.split(',');
        
        // Percorre cada valor do array (cada número corresponde a um personagem)
        valores.forEach((valor, indice) => {
            // Converte o valor de string para número inteiro
            const pontosParaAdicionar = parseInt(valor);
            
            // Verifica se a conversão foi bem sucedida (não é NaN)
            if (!isNaN(pontosParaAdicionar)) {
                // Adiciona os pontos ao personagem correspondente (pelo índice)
                pontos[indice] += pontosParaAdicionar;
            }
        });
    });

    // Variáveis para determinar o vencedor
    let maiorPontuacao = -1;  // Inicia com valor negativo para garantir substituição
    let indiceVencedor = 0;   // Índice do personagem vencedor
    
    // Percorre o array de pontos para encontrar o maior valor
    pontos.forEach((pontuacao, indice) => {
        // Se a pontuação atual for maior que a maior registrada
        if (pontuacao > maiorPontuacao) {
            maiorPontuacao = pontuacao;  // Atualiza a maior pontuação
            indiceVencedor = indice;    // Atualiza o índice do vencedor
        }
    });
    
    // Chama a função para exibir o card do personagem vencedor
    exibirCardVencedor(indiceVencedor);
}

// Função para exibir o card do personagem vencedor em um popup
function exibirCardVencedor(indice) {
    // Seleciona o card original do personagem vencedor usando data-value
    const cardOriginal = document.querySelector(`.personagem-card[data-value="${indice}"]`);
    
    // Se não encontrar o card, encerra a função
    if (!cardOriginal) return;
    
    // Cria um clone do card original (com todos os elementos filhos)
    const cardClone = cardOriginal.cloneNode(true);
    
    // Seleciona o container onde o card vencedor será exibido
    const cardVencedor = document.getElementById('card-vencedor');
    
    // Limpa o conteúdo atual do container
    cardVencedor.innerHTML = '';
    
    // Adiciona o clone do card ao container
    cardVencedor.appendChild(cardClone);
    
    // Seleciona o popup e exibe ele (muda display para flex)
    const popup = document.getElementById('popup-vencedor');
    popup.style.display = 'flex';
    
    // Adiciona evento de clique ao botão de fechar o popup
    document.getElementById('fechar-popup').addEventListener('click', () => {
        // Esconde o popup quando o botão é clicado
        popup.style.display = 'none';
    });
}

// Função para verificar se todas as perguntas foram respondidas
function verificarRespostas() {
    // Seleciona todos os grupos de perguntas
    const gruposPerguntas = document.querySelectorAll('.quiz-question');
    
    // Percorre cada grupo de pergunta
    for (const grupo of gruposPerguntas) {
        // Verifica se há algum radio button marcado na pergunta atual
        const respostaMarcada = grupo.querySelector('input[type="radio"]:checked');
        
        // Se não houver resposta marcada para esta pergunta
        if (!respostaMarcada) {
            // Extrai o número da pergunta do texto (ex: "1. Como você..." -> "1")
            const numeroPergunta = grupo.querySelector('p').textContent.split('.')[0];
            
            // Mostra alerta indicando qual pergunta falta responder
            alert(`Por favor, responda a pergunta ${numeroPergunta} antes de ver o resultado!`);
            
            // Retorna false indicando que o quiz não está completo
            return false;
        }
    }
    
    // Se todas as perguntas foram respondidas, retorna true
    return true;
}

// Adiciona evento de clique ao botão de submit
document.querySelector('.submit-btn').addEventListener('click', function() {
    // Primeiro verifica se todas as perguntas foram respondidas
    if (verificarRespostas()) {
        // Se sim, calcula e exibe o resultado
        calcularResultado();
    }
});