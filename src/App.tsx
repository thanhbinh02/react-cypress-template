import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MessageShowcasePage from "./pages/message-showcase-page";

import "./App.css";
import HomePage from "./pages/home";
import ButtonShowcasePage from "./pages/button-showcase-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/message" element={<MessageShowcasePage />} />
        <Route path="/button" element={<ButtonShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
