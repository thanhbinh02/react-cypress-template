import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MessageShowcasePage from './pages/message-showcase-page';

import './App.css';
import HomePage from './pages/home';
import ButtonShowcasePage from './pages/button-showcase-page';
import TooltipShowcasePage from './pages/tooltip-showcase-page';
import TagShowcasePage from './pages/tag-showcase-page';
import InputShowcasePage from './pages/input-showcase-page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/message' element={<MessageShowcasePage />} />
        <Route path='/button' element={<ButtonShowcasePage />} />
        <Route path='/input' element={<InputShowcasePage />} />
        <Route path='/tooltip' element={<TooltipShowcasePage />} />
        <Route path='/tag' element={<TagShowcasePage />} />
      </Routes>
    </Router>
  );
}

export default App;
