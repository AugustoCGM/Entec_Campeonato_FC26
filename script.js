document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. SISTEMA DE DRAFT (ROTAÇÃO DE CARTAS)
    // =========================================
    const cards = document.querySelectorAll('.ut-card');
    
    setInterval(() => {
        // Seleciona uma carta aleatória para o efeito de "Flip"
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        randomCard.classList.toggle('flip');
        
        // Simula a injeção de novos dados na carta quando ela vira de costas
        // (A ser integrado com os assets de cartas do Ultimate Team no Figma)
    }, 4500);

    // =========================================
    // 2. SCROLL DO HEADER
    // =========================================
    const headerBtn = document.getElementById('btn-header-inscricao');
    const heroSection = document.getElementById('hero-section');
    
    window.addEventListener('scroll', () => {
        if (heroSection) {
            if (window.scrollY > (heroSection.offsetHeight * 0.5)) {
                headerBtn.style.opacity = '1';
                headerBtn.style.visibility = 'visible';
                headerBtn.style.transform = 'translateY(0)';
            } else {
                headerBtn.style.opacity = '0';
                headerBtn.style.visibility = 'hidden';
                headerBtn.style.transform = 'translateY(-10px)';
            }
        }
    });

    // =========================================
    // 3. SIMULAÇÃO DE PARTIDA (ROAD TO THE FINAL)
    // =========================================
    const matchBox = document.getElementById('match-1');
    
    if (matchBox) {
        // Simula o início de uma partida após 2 segundos
        setTimeout(() => {
            matchBox.classList.add('active-match');
            
            // Simula o resultado após mais 2 segundos
            setTimeout(() => {
                const teams = matchBox.querySelectorAll('.team-row');
                const score1 = Math.floor(Math.random() * 5);
                const score2 = Math.floor(Math.random() * 5);
                
                let s1Text = score1;
                let s2Text = score2;

                // Lógica simples para lidar com empate (Pênaltis)
                if (score1 === score2) {
                    const pen1 = Math.floor(Math.random() * 5) + 3;
                    const pen2 = Math.floor(Math.random() * 5) + 3;
                    s1Text = `${score1} (${pen1})`;
                    s2Text = `${score2} (${pen2})`;
                    
                    if(pen1 > pen2) {
                        teams[0].classList.add('winner');
                        teams[1].classList.add('loser');
                    } else {
                        teams[1].classList.add('winner');
                        teams[0].classList.add('loser');
                    }
                } else if (score1 > score2) {
                    teams[0].classList.add('winner');
                    teams[1].classList.add('loser');
                } else {
                    teams[1].classList.add('winner');
                    teams[0].classList.add('loser');
                }

                teams[0].querySelector('.score').innerText = s1Text;
                teams[1].querySelector('.score').innerText = s2Text;
                
                matchBox.classList.remove('active-match');
            }, 2000);
            
        }, 2000);
    }
});
