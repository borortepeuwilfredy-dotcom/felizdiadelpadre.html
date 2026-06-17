        let locksState = { fuerza: 0, sabiduria: false, corazon: false };
        let heartLockTimer;

        // --- Lógica de Candados ---
        function clickLock(type, event) {
            event.stopPropagation();
            if (locksState[type] === true) return;

            spawnSparks(event.clientX, event.clientY);

            if (type === 'sabiduria') {
                locksState.sabiduria = true;
                document.getElementById('lockSabiduria').classList.add('unlocked');
            } else if (type === 'fuerza') {
                locksState.fuerza++;
                if (locksState.fuerza >= 3) {
                    locksState.fuerza = true;
                    document.getElementById('lockFuerza').classList.add('unlocked');
                } else {
                    // Ajuste: crear un escalado progresivo en lugar de usar una cadena inválida
                    const scale = 1 + (locksState.fuerza * 0.08);
                    document.getElementById('lockFuerza').style.transform = `scale(${scale})`;
                }
            }
            checkAllUnlocked();
        }

        // Candado del Corazón (Clic Mantenido)
        function startHeartLock() {
            if (locksState.corazon === true) return;
            document.getElementById('lockCorazon').style.backgroundColor = '#e74c3c'; // Rojo
            heartLockTimer = setTimeout(() => {
                locksState.corazon = true;
                document.getElementById('lockCorazon').classList.add('unlocked');
                document.getElementById('lockCorazon').style.backgroundColor = '#f1c40f'; // Volver a Dorado
                checkAllUnlocked();
            }, 1000);
        }

        function endHeartLock() {
            if (locksState.corazon === true) return;
            clearTimeout(heartLockTimer);
            document.getElementById('lockCorazon').style.backgroundColor = '#00A86B'; // Volver a Jade
        }

        // --- Revelación Final ---
        function checkAllUnlocked() {
            if (locksState.fuerza === true && locksState.sabiduria === true && locksState.corazon === true) {
                setTimeout(() => {
                    document.getElementById('mainBody').classList.add('open-state');
                    launchCelebration();
                }, 500);
            }
        }

        // --- Efectos Visuales (Chispas y Celebración) ---
        function spawnSparks(x, y) {
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement('div');
                spark.classList.add('spark');
                spark.style.left = x + 'px'; spark.style.top = y + 'px';
                const moveX = (Math.random() * 80 - 40) + 'px';
                const moveY = (Math.random() * 80 - 40) + 'px';
                spark.style.setProperty('--x', moveX); spark.style.setProperty('--y', moveY);
                document.body.appendChild(spark);
                setTimeout(() => spark.remove(), 600);
            }
        }

        function launchCelebration() {
            const colors = ['#00A86B', '#fff', '#2c3e50', '#f1c40f']; // Jade, Blanco, Azul Chapín, Dorado
            for (let i = 0; i < 100; i++) {
                const p = document.createElement('div');
                p.classList.add('particle');
                if (Math.random() > 0.4) { p.innerHTML = '⚡'; p.style.color = '#f1c40f'; } 
                else { p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; p.style.width = '8px'; p.style.height = '8px'; p.style.borderRadius = '2px'; }
                
                p.style.left = '50vw'; p.style.top = '45vh';
                const destX = (Math.random() * 300 - 150);
                p.animate([{ transform: 'translate(0, 0) scale(0.3)', opacity: 1 }, { transform: `translate(${destX}px, -20vh) scale(1.1)`, opacity: 1, offset: 0.2 }, { transform: `translate(${destX * 1.5}px, 60vh) scale(0.5)`, opacity: 0 }], { duration: Math.random() * 2000 + 2500, easing: 'cubic-bezier(0.1, 0.5, 0.5, 1)', fill: 'forwards' });
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 5000);
            }
        }
