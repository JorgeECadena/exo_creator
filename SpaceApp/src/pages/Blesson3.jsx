import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//radial.jpeg';

function BLesson3() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/Blesson4');
    };

    return (
        <div className='pageB'>
          <div className="cardB">
            <h1>Radial Velocity (Doppler) Method</h1> 
          <p>
          A planet’s gravity causes its star to move in a small orbit or wobble. This wobble can be detected by observing shifts in the star’s light spectrum due to the Doppler effect (the star moves slightly towards or away from Earth).
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtontB" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default BLesson3