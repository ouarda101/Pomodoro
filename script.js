const timerDisplay = document.getElementById('timer-display');
const pomodoroModeButton = document.getElementById('pomodoro-mode');
const shortBreakModeButton = document.getElementById('short-break-mode');
const longBreakModeButton = document.getElementById('long-break-mode');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const alarmSound = document.getElementById('alarm-sound');


let countdown;
let timeLeft;
let isRunning = false;
let currentMode = 'pomodoro'; 


const durations = {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
};

/**
 * Formats seconds into a MM:SS string.
 * @param {number} seconds - The total seconds to format.
 * @returns {string} Formatted time string (MM:SS).
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
}

/**
 * Sets the timer to a specific mode and updates the UI.
 * @param {string} mode - The mode to set ('pomodoro', 'shortBreak', 'longBreak').
 */
function setMode(mode) {
    
    clearInterval(countdown);
    isRunning = false;

    
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';

    
    document.querySelectorAll('.mode-button').forEach(button => {
        button.classList.remove('active');
    });
    if (mode === 'pomodoro') {
        pomodoroModeButton.classList.add('active');
    } else if (mode === 'shortBreak') {
        shortBreakModeButton.classList.add('active');
    } else if (mode === 'longBreak') {
        longBreakModeButton.classList.add('active');
    }

    
    currentMode = mode;
    timeLeft = durations[currentMode];
    updateDisplay();
}


function startTimer() {
    if (isRunning) return; 
    isRunning = true;

    
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';

    countdown = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(countdown);
            isRunning = false;
            alarmSound.play();
            if (currentMode === 'pomodoro') {
                setMode('shortBreak');
            } else {
                setMode('pomodoro'); 
            }
        }
    }, 1000); 
}


function pauseTimer() {
    clearInterval(countdown);
    isRunning = false;
    
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
}



function resetTimer() {
    pauseTimer(); 
    timeLeft = durations[currentMode]; 
    updateDisplay();
    
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
}


pomodoroModeButton.addEventListener('click', () => setMode('pomodoro'));
shortBreakModeButton.addEventListener('click', () => setMode('shortBreak'));
longBreakModeButton.addEventListener('click', () => setMode('longBreak'));
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

window.onload = () => {
    setMode('pomodoro'); 
};