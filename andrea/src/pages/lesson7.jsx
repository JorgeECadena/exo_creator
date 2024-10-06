import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//pulsar.jpeg';

function Lesson7() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/quizz1');
    };

    return (
        <div className='page'>
          <div className="card">
            <h1>Pulsar Timing</h1>  
          <p>
          If a planet orbits a pulsar, it will cause slight variations in the timing of the pulses. By measuring these changes, the planet’s mass and orbit can be determined. It is extremely precise and can detect very small planets.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Take a quiz!</button>
    
          </div>
        </div>
      )
    }
export default Lesson7