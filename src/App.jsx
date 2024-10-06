import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Lesson from "./pages/lesson";
import Lesson2 from "./pages/lesson2";
import Lesson3 from "./pages/lesson3";  
import Lesson4 from "./pages/lesson4";
import Lesson5 from "./pages/lesson5";
import Lesson6 from "./pages/lesson6";
import Quizz1 from "./pages/quizz1";
import Quizz2 from "./pages/quizz2";
import Quizz3 from "./pages/quizz3";
import Quizz4 from "./pages/quizz4";
import Quizz5 from "./pages/quizz5";
import './App.css';
import { ScoreProvider } from './Score';

function App() {
  return (
    <ScoreProvider>
  <Router>
      <Routes>
        <Route path="/" element={<Lesson/>} />
        <Route path="/lesson2" element={<Lesson2 />} />
        <Route path="/lesson3" element={<Lesson3 />} />
        <Route path="/lesson4" element={<Lesson4 />} />
        <Route path="/lesson5" element={<Lesson5 />} />
        <Route path="/lesson6" element={<Lesson6 />} />
        <Route path="/quizz1" element={<Quizz1 />} />
        <Route path="/quizz2" element={<Quizz2 />} />
        <Route path="/quizz3" element={<Quizz3 />} />
        <Route path="/quizz4" element={<Quizz4 />} />
        <Route path="/quizz5" element={<Quizz5 />} />
      </Routes>
    </Router>
    </ScoreProvider>
  );
}

export default App;