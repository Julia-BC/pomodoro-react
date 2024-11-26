// Variáveis globais para os intervalos e tempo restante
let pomodoroTime = 25 * 60;
let breakTime = 5 * 60;
let longBreakTime = 15 * 60;
let currentTime = pomodoroTime;
let interval;
let isTimerRunning = false;

// Elementos DOM
const startPomodoroButton = document.getElementById("startPomodoro");
const startPausaButton = document.getElementById("startPausa");
const startLongBreakButton = document.getElementById("startLongBreak");

const timerPomodoro = document.getElementById("timerPomodoro");
const timerPausa = document.getElementById("timerPausa");
const timerLongBreak = document.getElementById("timerLongBreak");

// Função de formatação de tempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Função para iniciar/pausar o timer
function startPauseTimer(button, timerDisplay, timerType) {
    if (!isTimerRunning) {
        isTimerRunning = true;
        button.textContent = "Pausar";
        interval = setInterval(() => {
            currentTime--;
            timerDisplay.textContent = formatTime(currentTime);
            if (currentTime <= 0) {
                clearInterval(interval);
                button.textContent = "Iniciar";
                isTimerRunning = false;
                if (timerType === 'pomodoro') {
                    alert("Tempo Pomodoro terminado!");
                } else if (timerType === 'break') {
                    alert("Intervalo terminado!");
                } else {
                    alert("Longa Pausa terminada!");
                }
            }
        }, 1000);
    } else {
        clearInterval(interval);
        isTimerRunning = false;
        button.textContent = "Iniciar";
    }
}

// Inicializando eventos
startPomodoroButton.addEventListener("click", () => startPauseTimer(startPomodoroButton, timerPomodoro, 'pomodoro'));
startPausaButton.addEventListener("click", () => startPauseTimer(startPausaButton, timerPausa, 'break'));
startLongBreakButton.addEventListener("click", () => startPauseTimer(startLongBreakButton, timerLongBreak, 'longBreak'));

// Função para abrir e fechar o modal de configurações
const openModalButton = document.getElementById("openModal");
const configModal = document.getElementById("configModal");
const closeModalButton = configModal.querySelector(".close");
const saveConfigButton = document.getElementById("saveConfig");

openModalButton.addEventListener("click", () => {
    configModal.style.display = "block";
});

closeModalButton.addEventListener("click", () => {
    configModal.style.display = "none";
});

saveConfigButton.addEventListener("click", () => {
    pomodoroTime = document.getElementById("pomodoro").value * 60;
    breakTime = document.getElementById("pequena-pausa").value * 60;
    longBreakTime = document.getElementById("longa-pausa").value * 60;
    currentTime = pomodoroTime; // Reset timer to Pomodoro time
    timerPomodoro.textContent = formatTime(pomodoroTime);
    timerPausa.textContent = formatTime(breakTime);
    timerLongBreak.textContent = formatTime(longBreakTime);
    configModal.style.display = "none";
});

// Tarefas
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
    const taskInput = document.getElementById("new-task");
    if (taskInput.value.trim() !== "") {
        const newTask = document.createElement("li");
        newTask.textContent = taskInput.value;
        taskList.appendChild(newTask);
        taskInput.value = "";
    }
});

// Função para alternar as abas
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        // Remover 'active' de todas as abas e conteúdos
        tabs.forEach(tab => tab.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        // Adicionar 'active' à aba clicada e ao conteúdo correspondente
        tab.classList.add("active");
        const contentId = tab.getAttribute("data-tab");
        document.getElementById(contentId).classList.add("active");
    });
});

// Inicializando os temporizadores
function startTimer(tempoId, buttonId, intervalVar, isRunningVar, defaultTime) {
    const timerElement = document.getElementById(tempoId);
    const button = document.getElementById(buttonId);
    let time = defaultTime;

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        time--;
        if (time < 0) {
            clearInterval(intervalVar);
            isRunningVar = false;
            button.innerText = 'Iniciar';
            alert('Tempo finalizado!');
        }
    }

    button.addEventListener('click', function () {
        if (isRunningVar) {
            clearInterval(intervalVar);
            isRunningVar = false;
            button.innerText = 'Iniciar';
        } else {
            intervalVar = setInterval(updateTimer, 1000);
            isRunningVar = true;
            button.innerText = 'Pausar';
        }
    });
}

// Inicializando os temporizadores
startTimer('timerPomodoro', 'startPomodoro', pomodoroInterval, isPomodoroRunning, 25 * 60);
startTimer('timerPausa', 'startPausa', pausaInterval, isPausaRunning, 5 * 60);
startTimer('timerLongBreak', 'startLongBreak', longaPausaInterval, isLongBreakRunning, 15 * 60);
