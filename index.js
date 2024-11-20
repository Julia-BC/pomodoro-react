// Seleção de elementos
const pomodoroTimer = document.getElementById('timerPomodoro');
const pausaTimer = document.getElementById('timerPausa');
const longBreakTimer = document.getElementById('timerLongBreak');

const startPomodoroButton = document.getElementById('startPomodoro');
const startPausaButton = document.getElementById('startPausa');
const startLongBreakButton = document.getElementById('startLongBreak');

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

let timerInterval;

// Formatar tempo (minutos e segundos)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Iniciar o temporizador
function startTimer(duration, display) {
    clearInterval(timerInterval);
    let timeLeft = duration;

    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Tempo finalizado!');
        } else {
            timeLeft -= 1;
            display.textContent = formatTime(timeLeft);
        }
    }, 1000);
}

// Alternar entre abas
function switchTab(event) {
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    const target = event.target.getAttribute('data-tab');
    event.target.classList.add('active');
    document.getElementById(target).classList.add('active');
}

// Eventos para as abas
tabs.forEach(tab => tab.addEventListener('click', switchTab));

// Eventos para os botões de início
startPomodoroButton.addEventListener('click', () => {
    const duration = parseInt(document.getElementById('pomodoro').value, 10) * 60;
    startTimer(duration, pomodoroTimer);
});

startPausaButton.addEventListener('click', () => {
    const duration = parseInt(document.getElementById('pequena-pausa').value, 10) * 60;
    startTimer(duration, pausaTimer);
});

startLongBreakButton.addEventListener('click', () => {
    const duration = parseInt(document.getElementById('longa-pausa').value, 10) * 60;
    startTimer(duration, longBreakTimer);
});

// Modal de configurações
const modal = document.getElementById('configModal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.querySelector('.close');

openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Adicionar tarefas
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', () => li.remove());
        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

document.getElementById('salvar').addEventListener('click', addTask);
