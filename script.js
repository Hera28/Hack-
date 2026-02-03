const sentences = [
    "I beg for mercy",
    "Forgive my digital sins",
    "The machine is hungry",
    "My fingers are my life",
    "Empty chambers tell no lies",
    "Death is just a syntax error",
    "The final sentence awaits us all"
];

let currentLevel = 1;
let timeLeft = 5000; 
let timer;
const typer = document.getElementById('typer');
const display = document.getElementById('sentence-display');
const timerBar = document.getElementById('timer-bar');

function startGame() {
    typer.value = '';
    const randomSent = sentences[Math.floor(Math.random() * sentences.length)];
    display.textContent = randomSent;
    
    let duration = Math.max(2000, 6000 - (currentLevel * 400)); // Makin level tinggi, makin cepat
    
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    
    setTimeout(() => {
        timerBar.style.transition = `width ${duration}ms linear`;
        timerBar.style.width = '0%';
    }, 10);

    clearTimeout(timer);
    timer = setTimeout(gameOver, duration);
}

typer.addEventListener('input', () => {
    if (typer.value.toLowerCase() === display.textContent.toLowerCase()) {
        currentLevel++;
        document.getElementById('level').textContent = currentLevel;
        document.body.style.backgroundColor = '#0a1a0a';
        setTimeout(() => document.body.style.backgroundColor = '#050505', 200);
        startGame();
    }
});

function gameOver() {
    display.textContent = "BANG! YOU DIED.";
    document.body.classList.add('death');
    typer.disabled = true;
    setTimeout(() => {
        alert(`Game Over! Level Reached: ${currentLevel}`);
        location.reload();
    }, 1000);
}

// Start on first keypress
window.addEventListener('keydown', (e) => {
    if (display.textContent === "TYPE TO START") startGame();
}, { once: true });
