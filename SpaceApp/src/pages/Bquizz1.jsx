import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { useScore } from '../Score';

function BQuizz1() {
    const navigate = useNavigate();
    const { score, incrementScore } = useScore();
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const correctAnswer = 'b';

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
        navigate('/Bquizz2');
    };

  return (
    <div className='page2B'>
      <div className="card2B">
      <h1>Question 1</h1>
      <p> <strong>
      What is one reason why finding exoplanets is difficult?
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
          a) Exoplanets are very large compared to stars.
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
          b) Exoplanets are small, distant, and do not emit their own light.
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
          c) Exoplanets can be easily seen from Earth with a telescope.
          </label>
        </div>
        <p></p>
        <button className="NextButton" onClick={handleSubmit} disabled={isSubmitted}>
          Submit
        </button>


        {isCorrect === true && <p style={{ color: 'black' }}> <strong>Correct!</strong></p>}
        {isCorrect === false && <p style={{ color: 'black' }}><strong>Incorrect! The correct answer is b.</strong></p>}

        <p>Your score: {score}</p>

        <button className="NexButtontB" onClick={handleNext}>Next</button>
      </div>
    </div>
      
  );
}

export default BQuizz1