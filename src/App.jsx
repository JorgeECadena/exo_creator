// /src/components/Home.js
import React from 'react';
import './App.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>ExoCreator</h1>
        <div>
          <button class="transparent-button">Home</button>
          <button class="transparent-button">About</button>
          <button class="button1">SignIn</button>
          <button class="button2">SignUp</button>
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
