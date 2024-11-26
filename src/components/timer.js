const React = require("react");
const { formatTime } = require("../utils/timeUtils");

function Timer({ settings }) {
  const [timeLeft, setTimeLeft] = React.useState(settings.pomodoro * 60);
  const [isRunning, setIsRunning] = React.useState(false);
  const [cycle, setCycle] = React.useState(1);
  const [phase, setPhase] = React.useState("Pomodoro");

  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            handlePhaseEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handlePhaseEnd = () => {
    if (phase === "Pomodoro") {
      if (cycle % settings.interval === 0) {
        setPhase("Long Break");
        setTimeLeft(settings.longBreak * 60);
      } else {
        setPhase("Short Break");
        setTimeLeft(settings.shortBreak * 60);
      }
      setCycle((prev) => prev + 1);
    } else {
      setPhase("Pomodoro");
      setTimeLeft(settings.pomodoro * 60);
    }
    setIsRunning(false);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const skipPhase = () => {
    handlePhaseEnd();
    setIsRunning(false);
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, phase),
    React.createElement("div", null, formatTime(timeLeft)),
    React.createElement(
      "button",
      { onClick: toggleTimer },
      isRunning ? "Pausar" : "Iniciar"
    ),
    React.createElement("button", { onClick: skipPhase }, "Pular")
  );
}

module.exports = Timer;
