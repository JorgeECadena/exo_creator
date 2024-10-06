import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//gravitational.png';

function BLesson5() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/Blesson6');
    };

    return (
        <div className='pageB'>
          <div className="cardB">
            <h1>Gravitational Microlensing</h1>
          <p>
          When a star passes in front of a more distant star, its gravity bends and magnifies the distant star's light. If the star has a planet, the planet’s gravity adds a small, additional lensing effect.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtontB" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default BLesson5