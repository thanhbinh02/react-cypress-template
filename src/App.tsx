import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MessageShowcasePage from "./pages/message-showcase-page";

import "./App.css";
import HomePage from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/message" element={<MessageShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
