document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. DATA POOL (20 Jogadores)
    // =========================================
    // Substitua os caminhos pelos seus assets reais (ex: assets/renders/vini-full.png)
    const playersPool = [
        { id: 1, name: 'Vini Jr.', flag: 'assets/flags/br.png', render: 'assets/renders/vini.png', card: 'assets/cards/vini.png' },
        { id: 2, name: 'Bellingham', flag: 'assets/flags/en.png', render: 'assets/renders/bellingham.png', card: 'assets/cards/bellingham.png' },
        { id: 3, name: 'Marta', flag: 'assets/flags/br.png', render: 'assets/renders/marta.png', card: 'assets/cards/marta.png' }, // Mulher 1
        { id: 4, name: 'Mbappé', flag: 'assets/flags/fr.png', render: 'assets/renders/mbappe.png', card: 'assets/cards/mbappe.png' },
        { id: 5, name: 'Haaland', flag: 'assets/flags/no.png', render: 'assets/renders/haaland.png', card: 'assets/cards/haaland.png' },
        { id: 6, name: 'Alexia Putellas', flag: 'assets/flags/es.png', render: 'assets/renders/alexia.png', card: 'assets/cards/alexia.png' }, // Mulher 2
        { id: 7, name: 'Neymar Jr.', flag: 'assets/flags/br.png', render: 'assets/renders/neymar.png', card: 'assets/cards/neymar.png' },
        { id: 8, name: 'De Bruyne', flag: 'assets/flags/be.png', render: 'assets/renders/debruyne.png', card: 'assets/cards/debruyne.png' },
        { id: 9, name: 'Aitana Bonmatí', flag: 'assets/flags/es.png', render: 'assets/renders/aitana.png', card: 'assets/cards/aitana.png' }, // Mulher 3
        { id: 10, name: 'Messi', flag: 'assets/flags/ar.png', render: 'assets/renders/messi.png', card: 'assets/cards/messi.png' },
        { id: 11, name: 'C. Ronaldo', flag: 'assets/flags/pt.png', render: 'assets/renders/cr7.png', card: 'assets/cards/cr7.png' },
        { id: 12, name: 'Rodrygo', flag: 'assets/flags/br.png', render: 'assets/renders/rodrygo.png', card: 'assets/cards/rodrygo.png' },
        { id: 13, name: 'Sam Kerr', flag: 'assets/flags/au.png', render: 'assets/renders/kerr.png', card: 'assets/cards/kerr.png' }, // Mulher 4
        { id: 14, name: 'Saka', flag: 'assets/flags/en.png', render: 'assets/renders/saka.png', card: 'assets/cards/saka.png' },
        { id: 15, name: 'Griezmann', flag: 'assets/flags/fr.png', render: 'assets/renders/griezmann.png', card: 'assets/cards/griezmann.png' },
        { id: 16, name: 'Van Dijk', flag: 'assets/flags/nl.png', render: 'assets/renders/vandijk.png', card: 'assets/cards/vandijk.png' },
        { id: 17, name: 'Salah', flag: 'assets/flags/eg.png', render: 'assets/renders/salah.png', card: 'assets/cards/salah.png' },
        { id: 18, name: 'Musiala', flag: 'assets/flags/de.png', render: 'assets/renders/musiala.png', card: 'assets/cards/musiala.png' },
        { id: 19, name: 'Son', flag: 'assets/flags/kr.png', render: 'assets/renders/son.png', card: 'assets/cards/son.png' },
        { id: 20, name: 'Leão', flag: 'assets/flags/pt.png', render: 'assets/renders/leao.png', card: 'assets/cards/leao.png' }
    ];

    // Embaralha o pool inicial para aleatoriedade
    let shuffledPool = [...playersPool].sort(() => 0.5 - Math.random());
    let poolIndex = 0;

    // =========================================
    // 2. LÓGICA DA ESTEIRA (CAROUSEL)
    // =========================================
    const track = document.getElementById('cards-track');
    const spotlightFlag = document.getElementById('spotlight-flag');
    const spotlightRender = document.getElementById('spotlight-render');
    
    // O array mantém a referência aos elementos DOM das cartas na esteira
    let activeCards = []; 

    function getNextPlayer() {
        const player = shuffledPool[poolIndex];
        poolIndex = (poolIndex + 1) % shuffledPool.length;
        return player;
    }

    // Cria o elemento DOM de uma carta
    function createCardElement(player, initialPos) {
        const slot = document.createElement('div');
        slot.className = `track-slot pos-${initialPos}`;
        slot.dataset.pos = initialPos;
        slot.dataset.playerRender = player.render;
        slot.dataset.playerFlag = player.flag;

        slot.innerHTML = `
            <div class="card-3d-wrapper">
                <div class="card-face card-back"></div>
                <div class="card-face card-front" style="background-image: url('${player.card}')"></div>
            </div>
        `;
        track.appendChild(slot);
        return slot;
    }

    // Setup Inicial: Preenche as posições 1 até 8
    // pos-1 a pos-7 (Fila), pos-8 (Em Destaque/Virada)
    for (let i = 1; i <= 8; i++) {
        const p = getNextPlayer();
        const cardEl = createCardElement(p, i);
        activeCards.push(cardEl);
        
        // Se for a carta inicial da pos-8, injeta no painel direito
        if (i === 8) {
            spotlightFlag.src = p.flag;
            spotlightRender.src = p.render;
            spotlightFlag.classList.add('fade-in');
            spotlightRender.classList.add('fade-in');
        }
    }

    // Função que empurra a esteira para a direita
    function shiftConveyorBelt() {
        // 1. Atualiza o Spotlight (Desvanece o atual)
        spotlightFlag.classList.remove('fade-in');
        spotlightRender.classList.remove('fade-in');
        spotlightFlag.classList.add('fade-out');
        spotlightRender.classList.add('fade-out');

        // 2. Move todas as cartas existentes uma posição para a direita
        activeCards.forEach(card => {
            let currentPos = parseInt(card.dataset.pos);
            let nextPos = currentPos + 1;
            
            card.className = `track-slot pos-${nextPos}`;
            card.dataset.pos = nextPos;

            // Se a carta chegou na posição 8 (O Destaque)
            if (nextPos === 8) {
                setTimeout(() => {
                    spotlightFlag.src = card.dataset.playerFlag;
                    spotlightRender.src = card.dataset.playerRender;
                    spotlightFlag.classList.remove('fade-out');
                    spotlightRender.classList.remove('fade-out');
                    spotlightFlag.classList.add('fade-in');
                    spotlightRender.classList.add('fade-in');
                }, 400); // Espera metade da transição da carta
            }

            // Se a carta chegou na posição 9 (Saída), remove do DOM após a animação
            if (nextPos === 9) {
                setTimeout(() => {
                    if(card.parentNode) card.parentNode.removeChild(card);
                }, 800);
            }
        });

        // 3. Remove a carta que foi para a pos-9 do array de controle
        activeCards = activeCards.filter(card => parseInt(card.dataset.pos) < 9);

        // 4. Injeta uma NOVA carta na posição 0 (Escondida à esquerda) 
        // No próximo ciclo, ela andará para a pos-1 e ficará visível
        const newPlayer = getNextPlayer();
        const newCard = createCardElement(newPlayer, 0);
        
        // Força o reflow para garantir que o CSS registre a pos-0 antes de animar
        void newCard.offsetWidth; 
        
        // Coloca no início do array
        activeCards.unshift(newCard);
        
        // Anima a nova carta da pos-0 para a pos-1 quase imediatamente
        setTimeout(() => {
            newCard.className = `track-slot pos-1`;
            newCard.dataset.pos = 1;
        }, 50);
    }

    // Aciona a esteira a cada 4.5 segundos
    setInterval(shiftConveyorBelt, 4500);
});
