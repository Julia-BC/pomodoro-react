const React = require("react");
const ReactDOM = require("react-dom/client");
const App = require("./app");
require("./styles.css");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));

