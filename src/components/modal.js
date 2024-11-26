const React = require("react");

function Modal({ settings, onClose, onSave }) {
  const [newSettings, setNewSettings] = React.useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSettings({ ...newSettings, [name]: parseInt(value) });
  };

  const handleSave = () => {
    onSave(newSettings);
  };

  return React.createElement(
    "div",
    { className: "modal" },
    React.createElement(
      "div",
      { className: "modal-content" },
      React.createElement("span", { className: "close", onClick: onClose }, "×"),
      React.createElement("h2", null, "Configurações"),
      ["pomodoro", "shortBreak", "longBreak", "interval"].map((field) =>
        React.createElement(
          "label",
          { key: field },
          `${field}:`,
          React.createElement("input", {
            type: "number",
            name: field,
            value: newSettings[field],
            onChange: handleChange,
          })
        )
      ),
      React.createElement("button", { onClick: handleSave }, "Salvar")
    )
  );
}

module.exports = Modal;
