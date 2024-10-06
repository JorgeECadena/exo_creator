import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { useScore } from '../Score';

function Quizz4() {
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
        navigate('/quizz5');
    };

  return (
    <div className='page2'>
      <div className="card2">
      <h1>Question 4</h1>
      <p> <strong>
      What makes a super-Earth different from planets in our solar system?
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
          a) They are more massive than ice giants like Neptune
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
          b) They are more massive than Earth but lighter than ice giants
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
          c) They are composed entirely of gas
          </label>
        </div>
        <p></p>

        <button className="NextButton" onClick={handleSubmit} disabled={isSubmitted}>
          Submit
        </button>


        {isCorrect === true && <p style={{ color: 'black' }}> <strong>Correct!</strong></p>}
        {isCorrect === false && <p style={{ color: 'black' }}><strong>Incorrect! The correct answer is b.</strong></p>}

        <p>Your score: {score}</p>

        <button className="NexButtont" onClick={handleNext}>Next</button>
      </div>
    </div>
      
  );
}

export default Quizz4