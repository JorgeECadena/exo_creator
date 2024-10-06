import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//Astrometry.jpeg';

function BLesson6() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/Blesson7');
    };

    return (
        <div className='pageB'>
          <div className="cardB">
            <h1>Astrometry</h1>  
          <p>
          If a star has a planet, its position will appear to shift in a small, predictable way as the planet pulls it. This method looks for those minute shifts. It can detect the masses of planets and is good for finding larger planets, but it's very hard to measure such small shifts in a star's position from Earth.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtontB" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default BLesson6