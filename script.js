document.addEventListener('DOMContentLoaded', () => {
    
    const playerPool = [
        { id: 'vini', card: 'assets/card-vini.png', render: 'assets/render-vini.png', flag: 'assets/flag-br.png' },
        { id: 'bell', card: 'assets/card-bell.png', render: 'assets/render-bell.png', flag: 'assets/flag-en.png' },
        { id: 'marta', card: 'assets/card-marta.png', render: 'assets/render-marta.png', flag: 'assets/flag-br.png' },
        { id: 'aitana', card: 'assets/card-aitana.png', render: 'assets/render-aitana.png', flag: 'assets/flag-es.png' },
        { id: 'haal', card: 'assets/card-haaland.png', render: 'assets/render-haaland.png', flag: 'assets/flag-no.png' },
        { id: 'kdb', card: 'assets/card-kdb.png', render: 'assets/render-kdb.png', flag: 'assets/flag-be.png' },
        { id: 'mbap', card: 'assets/card-mbappe.png', render: 'assets/render-mbappe.png', flag: 'assets/flag-fr.png' },
        { id: 'messi', card: 'assets/card-messi.png', render: 'assets/render-messi.png', flag: 'assets/flag-ar.png' },
        { id: 'cr7', card: 'assets/card-cr7.png', render: 'assets/render-cr7.png', flag: 'assets/flag-pt.png' },
        { id: 'ney', card: 'assets/card-ney.png', render: 'assets/render-ney.png', flag: 'assets/flag-br.png' },
        { id: 'salah', card: 'assets/card-salah.png', render: 'assets/render-salah.png', flag: 'assets/flag-eg.png' },
        { id: 'vvd', card: 'assets/card-vvd.png', render: 'assets/render-vvd.png', flag: 'assets/flag-nl.png' },
        { id: 'son', card: 'assets/card-son.png', render: 'assets/render-son.png', flag: 'assets/flag-kr.png' },
        { id: 'lewa', card: 'assets/card-lewa.png', render: 'assets/render-lewa.png', flag: 'assets/flag-pl.png' },
        { id: 'kane', card: 'assets/card-kane.png', render: 'assets/render-kane.png', flag: 'assets/flag-en.png' },
        { id: 'rodri', card: 'assets/card-rodri.png', render: 'assets/render-rodri.png', flag: 'assets/flag-es.png' },
        { id: 'ali', card: 'assets/card-alisson.png', render: 'assets/render-alisson.png', flag: 'assets/flag-br.png' },
        { id: 'valv', card: 'assets/card-valverde.png', render: 'assets/render-valverde.png', flag: 'assets/flag-uy.png' },
        { id: 'griez', card: 'assets/card-griez.png', render: 'assets/render-griez.png', flag: 'assets/flag-fr.png' },
        { id: 'musi', card: 'assets/card-musi.png', render: 'assets/render-musi.png', flag: 'assets/flag-de.png' }
    ];

    const track = document.getElementById('card-track');
    const bgRender = document.getElementById('active-render');
    const bgFlag = document.getElementById('active-flag');
    const VISIBLE_CARDS = 8; 

    function getRandomPlayer() {
        return playerPool[Math.floor(Math.random() * playerPool.length)];
    }

    function createCardElement(player, isEntering = false) {
        const slot = document.createElement('div');
        slot.className = `track-slot ${isEntering ? 'entering' : ''}`;
        
        slot.dataset.render = player.render;
        slot.dataset.flag = player.flag;

        slot.innerHTML = `
            <div class="card-3d-inner">
                <img src="assets/card-back.png" class="card-face card-back" alt="Verso FC26">
                <img src="${player.card}" class="card-face card-front" alt="${player.id}">
            </div>
        `;
        return slot;
    }

    function updateBackground(renderSrc, flagSrc) {
        bgRender.style.opacity = 0;
        bgFlag.style.opacity = 0;
        
        setTimeout(() => {
            bgRender.src = renderSrc;
            bgFlag.src = flagSrc;
            bgRender.style.opacity = 1;
            bgFlag.style.opacity = 0.35;
        }, 300);
    }

    for (let i = 0; i < VISIBLE_CARDS; i++) {
        const player = getRandomPlayer();
        const slot = createCardElement(player);
        track.appendChild(slot);
    }
    
    const initialSlots = track.querySelectorAll('.track-slot');
    const lastIndex = VISIBLE_CARDS - 1;
    if (initialSlots[lastIndex]) {
        initialSlots[lastIndex].classList.add('active-card');
        updateBackground(initialSlots[lastIndex].dataset.render, initialSlots[lastIndex].dataset.flag);
    }

    setInterval(() => {
        const newPlayer = getRandomPlayer();
        const newSlot = createCardElement(newPlayer, true);
        track.insertBefore(newSlot, track.firstChild);

        void newSlot.offsetWidth; 
        newSlot.classList.remove('entering');

        const currentSlots = track.querySelectorAll('.track-slot');
        
        if (currentSlots[lastIndex]) {
            currentSlots[lastIndex].classList.add('active-card');
            updateBackground(currentSlots[lastIndex].dataset.render, currentSlots[lastIndex].dataset.flag);
        }

        const outOfBoundsIndex = VISIBLE_CARDS;
        if (currentSlots[outOfBoundsIndex]) {
            const oldCard = currentSlots[outOfBoundsIndex];
            oldCard.classList.remove('active-card');
            oldCard.classList.add('leaving');
            
            setTimeout(() => {
                if (track.contains(oldCard)) track.removeChild(oldCard);
            }, 600);
        }
    }, 4500); 

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

    const matchBox = document.getElementById('match-1');
    if (matchBox) {
        setTimeout(() => {
            matchBox.classList.add('active-match');
            setTimeout(() => {
                const teams = matchBox.querySelectorAll('.team-row');
                const score1 = Math.floor(Math.random() * 5);
                const score2 = Math.floor(Math.random() * 5);
                let s1Text = score1;
                let s2Text = score2;

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