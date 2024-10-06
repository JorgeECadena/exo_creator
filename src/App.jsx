// /src/components/Home.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file
import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Planets from './Planet';
import PlanetSimulator from './PlanetSimulator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Exo-Planet" element={<PlanetSimulator />} />
        <Route path="/Exo-Planet/your-planets" element={<Planets />} />
      </Routes>
    </Router>
  );
};

export default App;