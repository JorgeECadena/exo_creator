import { useNavigate } from 'react-router-dom';
import React from 'react';

function BLesson() {

  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/Blesson2');
  };

  return (
    <div className='pageB'>
      <div className="cardB">
      <h1>How Do We Find Exoplanets?</h1>
      <p>
      Finding exoplanets (planets outside our solar system) is a challenging task because they are small, distant, and do not emit light like stars. Astronomers have developed several methods to detect exoplanets indirectly. The main methods include:
      </p>
      <button className="NexButtontB" onClick={handleNext}>Next</button>

      </div>
    </div>
  )
}

export default BLesson