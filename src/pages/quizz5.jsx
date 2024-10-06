import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { useScore } from '../Score';

function Quizz5() {
    const navigate = useNavigate();
    const { score, incrementScore, resetScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const correctAnswer = 'c';

    const handleAnswerChange = (event) => {
        setSelectedAnswer(event.target.value);
    };

    const handleSubmit = () => {
        if (isSubmitted) return; 
    
        if (selectedAnswer === correctAnswer) {
          setIsCorrect(true); 
          incrementScore(); 
        } else {
          setIsCorrect(false); 
        }
    
        setIsSubmitted(true); 
      };
  
    const handleNext = () => {
        resetScore();
        navigate('/');
    };

  return (
    <div className='page2'>
      <div className="card2">
      <h1>Question 5</h1>
      <p> <strong>
      Which planets are considered terrestrial?
      </strong>
      </p>
      
      <div>
      <label className="square-radio">
          <input 
            type="radio" 
            value="a" 
            checked={selectedAnswer === 'a'} 
            onChange={handleAnswerChange}
            disabled={isSubmitted} 
          />
          a) Planets larger than Jupiter
          </label>
        </div>
        <div>
        <label className="square-radio">
          <input 
            type="radio" 
            value="b" 
            checked={selectedAnswer === 'b'} 
            onChange={handleAnswerChange} 
            disabled={isSubmitted} 
          />
          b) Planets made of helium
          </label>
        </div>
        <div>
        <label className="square-radio">
          <input 
            type="radio" 
            value="c" 
            checked={selectedAnswer === 'c'} 
            onChange={handleAnswerChange} 
            disabled={isSubmitted} 
          />
          c) Planets composed of rock, silicate, water, and/or carbon
          </label>
        </div>
        <p></p>

        <button className="NextButton" onClick={handleSubmit} disabled={isSubmitted}>
          Submit
        </button>


        {isCorrect === true && <p style={{ color: 'black' }}> <strong>Correct!</strong></p>}
        {isCorrect === false && <p style={{ color: 'black' }}><strong>Incorrect! The correct answer is b.</strong></p>}

        <p>Your score: {score}</p>

        <button className="NexButtont" onClick={handleNext}>Finish</button>
      </div>
    </div>
      
  );
}

export default Quizz5