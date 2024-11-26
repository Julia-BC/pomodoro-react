const React = require("react");

function TaskList() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [newTask, setNewTask] = React.useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { name: newTask, completed: false }];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h3", null, "Tarefas"),
    React.createElement("input", {
      type: "text",
      value: newTask,
      onChange: (e) => setNewTask(e.target.value),
      placeholder: "Adicionar nova tarefa",
    }),
    React.createElement("button", { onClick: addTask }, "Adicionar"),
    React.createElement(
      "ul",
      null,
      tasks.map((task, index) =>
        React.createElement(
          "li",
          { key: index },
          React.createElement(
            "span",
            {
              style: {
                textDecoration: task.completed ? "line-through" : "none",
              },
            },
            task.name
          ),
          React.createElement(
            "button",
            { onClick: () => toggleTaskCompletion(index) },
            task.completed ? "Desfazer" : "Concluir"
          ),
          React.createElement(
            "button",
            { onClick: () => deleteTask(index) },
            "Excluir"
          )
        )
      )
    )
  );
}

module.exports = TaskList;
