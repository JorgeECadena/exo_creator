import { useNavigate } from 'react-router-dom';
import React from 'react';

function Lesson() {

  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/lesson2');
  };

  return (
    <div className='page'>
      <div className="card">
      <h1>How Do We Find Exoplanets?</h1>
      <p>
      Finding exoplanets (planets outside our solar system) is a challenging task because they are small, distant, and do not emit light like stars. Astronomers have developed several methods to detect exoplanets indirectly. The main methods include:
      </p>
      <button className="NexButtont" onClick={handleNext}>Next</button>

      </div>
    </div>
  )
}

export default Lesson