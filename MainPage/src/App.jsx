import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanetSimulator from './components/PlanetSimulator';
import Planets from './components/Planets';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PlanetSimulator />} />
          <Route path="/Planets" element={<Planets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

