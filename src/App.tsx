import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MessageShowcasePage from "./pages/message-showcase-page";

import "./App.css";
import HomePage from "./pages/home";
import ButtonShowcasePage from "./pages/button-showcase-page";
import InputShowcasePage from "./pages/input-showcase-page";
import RadioShowcasePage from "./pages/radio-showcase-page";
import SelectShowcasePage from "./pages/select-showcase-page";
import SwitchShowcasePage from "./pages/switch-showcase-page";
import CardShowcasePage from "./pages/card-showcase-page";
import FormShowcasePage from "./pages/form-showcase-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/message" element={<MessageShowcasePage />} />
        <Route path="/button" element={<ButtonShowcasePage />} />
        <Route path="/input" element={<InputShowcasePage />} />
        <Route path="/radio" element={<RadioShowcasePage />} />
        <Route path="/select" element={<SelectShowcasePage />} />
        <Route path="/switch" element={<SwitchShowcasePage />} />
        <Route path="/card" element={<CardShowcasePage />} />
        <Route path="/form" element={<FormShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
