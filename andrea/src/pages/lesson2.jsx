import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//transit.jpeg';

function Lesson2() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/lesson3');
    };

    return (
        <div className='page'>
          <div className="card">
            <h1>Transit Method</h1>
          <p>
          When a planet passes in front of its host star as viewed from Earth, it causes a small, temporary dimming of the star's light. This dimming, or "transit," happens periodically as the planet orbits the star. By measuring the frequency and amount of dimming, astronomers can infer the planet's size, orbit, and sometimes even its atmosphere.
            </p>
            <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default Lesson2