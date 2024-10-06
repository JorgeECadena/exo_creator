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
      <h1>Exoplanets</h1>
      <p>
      The planets beyond our solar system are called “exoplanets,” and they come in a wide variety of sizes, from gas giants larger than Jupiter to small, rocky planets about as big around as Earth or Mars. They can be hot enough to boil metal or locked in deep freeze. They can orbit their stars so tightly that a “year” lasts only a few days; they can orbit two suns at once. Some exoplanets are sunless rogues, wandering through the galaxy in permanent darkness.
      </p>
      <button className="NexButtont" onClick={handleNext}>Next</button>

      </div>
    </div>
  )
}

export default Lesson