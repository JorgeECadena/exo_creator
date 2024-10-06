// /src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

const Home = () => {
  const navigate = useNavigate();

  const goToSignIn = () => {
    navigate('/SignIn');
  };

  const goToSignUp = () => {
    navigate('/SignUp');
  };
  
  return (
    <div className="container">
      <header className="header">
        <h1>ExoCreator</h1>
        <div>
          <button className="transparent-button">Create you EXO</button>
          <button className="transparent-button">Lessons</button>

          <button onClick={() => goToSignIn()} className="button1">SignIn</button>
          <button onClick={() => goToSignUp()} className="button2">SignUp</button>
        </div>
      </header>

      <section className="section">
        <h2>What’s ExoCreate?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum nulla nec nisi pellentesque tempor...</p>

        <h2>How to create?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum nulla nec nisi pellentesque tempor...</p>
        <button>Create now!</button>

        <h2>What’s our purpose?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum nulla nec nisi pellentesque tempor...</p>
      </section>

      <footer className="footer">
        <p>© [YEAR][COMPANY NAME]. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;