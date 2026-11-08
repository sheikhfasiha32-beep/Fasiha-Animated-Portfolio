
/* =========================================
   THE SOUNDLESS SYMPHONY
   Interactive Generative Light Art
   MAGICAL GALAXY AUDIO EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const museum = document.createElement("section");
    museum.id = "soundless-symphony";
    museum.className = "symphony-section";

    museum.innerHTML = `
        <div class="symphony-background">
            <canvas class="symphony-canvas"></canvas>
        </div>

        <div class="symphony-content">
            <span class="symphony-eyebrow">
                AN INTERACTIVE DIGITAL ART EXPERIENCE
            </span>

            <h2>THE SOUNDLESS<br>SYMPHONY</h2>

            <p>Where Light Becomes Music</p>

            <div class="symphony-controls">
                <button class="symphony-sound" type="button">
                    <span>♫</span> Sound: OFF
                </button>

                <button class="symphony-pause" type="button">
                    <span>Ⅱ</span> Pause
                </button>
            </div>

            <span class="symphony-hint">
                MOVE YOUR CURSOR TO CREATE LIGHT
            </span>
        </div>
    `;

    document.body.appendChild(museum);

    const canvas = museum.querySelector(".symphony-canvas");
    const ctx = canvas.getContext("2d");

    const soundButton = museum.querySelector(".symphony-sound");
    const pauseButton = museum.querySelector(".symphony-pause");

    let width = 0;
    let height = 0;
    let paused = false;

    let soundEnabled = false;
    let audioContext = null;
    let masterGain = null;
    let soundNodes = [];
    let chimeInterval = null;
    let stopTimeout = null;

    let pointer = {
        x: -1000,
        y: -1000,
        active: false
    };

    const particles = [];

    /* =====================================
       CANVAS SIZE
    ===================================== */

    function resizeCanvas() {

        const rect = museum.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = width * ratio;
        canvas.height = height * ratio;

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    /* =====================================
       PARTICLES
    ===================================== */

    function createParticle(x, y) {

        particles.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2.5 + 0.5,
            life: 1
        });

        if (particles.length > 180) {
            particles.shift();
        }
    }

    function updateParticles() {

        for (let i = particles.length - 1; i >= 0; i--) {

            const p = particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.009;

            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function drawParticles() {

        particles.forEach(p => {

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

            ctx.fillStyle =
                `rgba(174, 165, 255, ${p.life})`;

            ctx.shadowBlur = 12;
            ctx.shadowColor = "#9d8bff";

            ctx.fill();
        });

        ctx.shadowBlur = 0;
    }

    /* =====================================
       LIGHT WAVES
    ===================================== */

    function drawWaves(time) {

        const centerY = height / 2;

        for (let layer = 0; layer < 5; layer++) {

            ctx.beginPath();

            for (let x = 0; x <= width; x += 5) {

                const distance = pointer.active
                    ? Math.abs(x - pointer.x)
                    : width;

                const influence =
                    Math.max(0, 1 - distance / 350);

                const wave =
                    Math.sin(
                        x * 0.008 +
                        time * 0.001 +
                        layer
                    ) * (35 + layer * 10);

                const mouseWave =
                    influence *
                    Math.sin(x * 0.025 + time * 0.003) *
                    55;

                const y =
                    centerY +
                    wave +
                    mouseWave +
                    Math.sin(
                        x * 0.003 +
                        time * 0.0007
                    ) * 30;

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            const hue = 220 + layer * 13;

            ctx.strokeStyle =
                `hsla(${hue}, 90%, 75%, ${0.3 - layer * 0.035})`;

            ctx.lineWidth = 2;
            ctx.shadowBlur = 18;

            ctx.shadowColor =
                `hsla(${hue}, 90%, 70%, 0.8)`;

            ctx.stroke();
        }

        ctx.shadowBlur = 0;
    }

    /* =====================================
       ANIMATION
    ===================================== */

    function animate(time = 0) {

        requestAnimationFrame(animate);

        if (paused) return;

        ctx.clearRect(0, 0, width, height);

        drawWaves(time);
        updateParticles();
        drawParticles();
    }

    /* =====================================
       MOUSE INTERACTION
    ===================================== */

    museum.addEventListener("pointermove", event => {

        const rect = museum.getBoundingClientRect();

        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointer.active = true;

        for (let i = 0; i < 3; i++) {
            createParticle(pointer.x, pointer.y);
        }
    });

    museum.addEventListener("pointerleave", () => {
        pointer.active = false;
    });

    /* =====================================
       PAUSE / RESUME
    ===================================== */

    pauseButton.addEventListener("click", () => {

        paused = !paused;

        pauseButton.innerHTML = paused
            ? "<span>▶</span> Resume"
            : "<span>Ⅱ</span> Pause";

    });

    /* =====================================
       GALAXY AUDIO ENGINE
    ===================================== */

    function createGalaxyTone(frequency, volume, type = "sine") {

        const oscillator = audioContext.createOscillator();
        const toneGain = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        filter.type = "lowpass";
        filter.frequency.value = 1400;

        toneGain.gain.value = volume;

        oscillator.connect(filter);
        filter.connect(toneGain);
        toneGain.connect(masterGain);

        oscillator.start();

        soundNodes.push(oscillator);
    }

    /* =====================================
       SPARKLING COSMIC CHIMES
    ===================================== */

    function createGalaxyChime() {

        if (!soundEnabled || !audioContext || !masterGain) {
            return;
        }

        const notes = [
            523.25,
            587.33,
            659.25,
            783.99,
            880.00,
            1046.50
        ];

        const frequency =
            notes[Math.floor(Math.random() * notes.length)];

        const oscillator = audioContext.createOscillator();
        const chimeGain = audioContext.createGain();

        const now = audioContext.currentTime;

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, now);

        chimeGain.gain.setValueAtTime(0.0001, now);

        chimeGain.gain.exponentialRampToValueAtTime(
            0.018,
            now + 0.08
        );

        chimeGain.gain.exponentialRampToValueAtTime(
            0.0001,
            now + 2.2
        );

        oscillator.connect(chimeGain);
        chimeGain.connect(masterGain);

        oscillator.start(now);
        oscillator.stop(now + 2.3);
    }

    /* =====================================
       START MAGICAL GALAXY
    ===================================== */

    async function startGalaxySound() {

        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            soundButton.textContent = "Sound unavailable";
            return false;
        }

        try {

            audioContext =
                audioContext || new AudioContextClass();

            if (audioContext.state === "suspended") {
                await audioContext.resume();
            }

            if (stopTimeout) {
                clearTimeout(stopTimeout);
                stopTimeout = null;
            }

            masterGain = audioContext.createGain();

            masterGain.gain.value = 0.0001;
            masterGain.connect(audioContext.destination);

            // Deep cosmic atmosphere
            createGalaxyTone(110, 0.10);
            createGalaxyTone(164.81, 0.07);
            createGalaxyTone(220, 0.035);

            // Soft upper atmospheric layer
            createGalaxyTone(329.63, 0.018);

            masterGain.gain.setTargetAtTime(
                0.55,
                audioContext.currentTime,
                2
            );

            soundEnabled = true;

            // Gentle sparkling chimes
            chimeInterval = setInterval(() => {

                if (soundEnabled) {
                    createGalaxyChime();
                }

            }, 1800);

            return true;

        } catch (error) {

            console.error("Galaxy audio error:", error);

            soundEnabled = false;

            return false;
        }
    }

    /* =====================================
       STOP MAGICAL GALAXY
    ===================================== */

    function stopGalaxySound() {

        soundEnabled = false;

        if (chimeInterval) {
            clearInterval(chimeInterval);
            chimeInterval = null;
        }

        if (!audioContext || !masterGain) return;

        const oldMaster = masterGain;
        const oldNodes = [...soundNodes];

        masterGain = null;
        soundNodes = [];

        oldMaster.gain.setTargetAtTime(
            0.0001,
            audioContext.currentTime,
            0.3
        );

        stopTimeout = setTimeout(() => {

            oldNodes.forEach(node => {

                try {
                    node.stop();
                    node.disconnect();
                } catch (error) {
                    // Already stopped
                }
            });

            oldMaster.disconnect();

        }, 1500);
    }

    /* =====================================
       SOUND BUTTON
    ===================================== */

    soundButton.addEventListener("click", async () => {

        if (!soundEnabled) {

            soundButton.innerHTML =
                "<span>♫</span> Starting...";

            const success = await startGalaxySound();

            if (success) {

                soundButton.innerHTML =
                    "<span>♫</span> Sound: ON";

            } else {

                soundButton.innerHTML =
                    "<span>♫</span> Sound unavailable";
            }

        } else {

            stopGalaxySound();

            soundButton.innerHTML =
                "<span>♫</span> Sound: OFF";
        }

    });

    /* =====================================
       INITIALIZE
    ===================================== */

    animate();

    console.log("The Magical Galaxy Symphony initialized.");

});
