import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//superImage.png';

function Lesson5() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/lesson6');
    };

    return (
        <div className='page'>
          <div className="card">
          <p>
          Super-Earths a class of planets unlike any in our solar system are more massive than Earth yet lighter than ice giants like Neptune and Uranus, and can be made of gas, rock or a combination of both. They are between twice the size of Earth and up to 10 times its mass.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default Lesson5