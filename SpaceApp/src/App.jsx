import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Lesson from "./pages/Alesson";
import Lesson2 from "./pages/Alesson2";
import Lesson3 from "./pages/Alesson3";  
import Lesson4 from "./pages/Alesson4";
import Lesson5 from "./pages/Alesson5";
import Lesson6 from "./pages/Alesson6";
import Quizz1 from "./pages/Aquizz1";
import Quizz2 from "./pages/Aquizz2";
import Quizz3 from "./pages/Aquizz3";
import Quizz4 from "./pages/Aquizz4";
import Quizz5 from "./pages/Aquizz5";
import Menu from "./pages/Menu";

import BLesson from "./pages/Blesson";
import BLesson2 from "./pages/Blesson2";
import BLesson3 from "./pages/Blesson3";  
import BLesson4 from "./pages/Blesson4";
import BLesson5 from "./pages/Blesson5";
import BLesson6 from "./pages/Blesson6";
import BLesson7 from "./pages/Blesson7";
import BQuizz1 from "./pages/Bquizz1";
import BQuizz2 from "./pages/Bquizz2";
import BQuizz3 from "./pages/Bquizz3";
import BQuizz4 from "./pages/Bquizz4";
import BQuizz5 from "./pages/Bquizz5";
import './App.css';
import { ScoreProvider } from './Score';

function App() {
  return (
    <ScoreProvider>
  <Router>
      <Routes>
        <Route path="/" element={<Menu/>} />
        <Route path="/Alesson1" element={<Lesson />} />
        <Route path="/Alesson2" element={<Lesson2 />} />
        <Route path="/Alesson3" element={<Lesson3 />} />
        <Route path="/Alesson4" element={<Lesson4 />} />
        <Route path="/Alesson5" element={<Lesson5 />} />
        <Route path="/Alesson6" element={<Lesson6 />} />
        <Route path="/Aquizz1" element={<Quizz1 />} />
        <Route path="/Aquizz2" element={<Quizz2 />} />
        <Route path="/Aquizz3" element={<Quizz3 />} />
        <Route path="/Aquizz4" element={<Quizz4 />} />
        <Route path="/Aquizz5" element={<Quizz5 />} />

        <Route path="/Blesson1" element={<BLesson />} />
        <Route path="/Blesson2" element={<BLesson2 />} />
        <Route path="/Blesson3" element={<BLesson3 />} />
        <Route path="/Blesson4" element={<BLesson4 />} />
        <Route path="/Blesson5" element={<BLesson5 />} />
        <Route path="/Blesson6" element={<BLesson6 />} />
        <Route path="/Blesson7" element={<BLesson7 />} />
        <Route path="/Bquizz1" element={<BQuizz1 />} />
        <Route path="/Bquizz2" element={<BQuizz2 />} />
        <Route path="/Bquizz3" element={<BQuizz3 />} />
        <Route path="/Bquizz4" element={<BQuizz4 />} />
        <Route path="/Bquizz5" element={<BQuizz5 />} />
        
      </Routes>
    </Router>
    </ScoreProvider>
  );
}

export default App;