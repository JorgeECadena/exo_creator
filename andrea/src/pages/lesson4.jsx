import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//direct.jpeg';

function Lesson4() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/lesson5');
    };

    return (
        <div className='page'>
          <div className="card">
            <h1>Direct Imaging </h1>
          <p>
          Advanced techniques like coronagraphs or starshades block the star’s light, allowing the much fainter planet to be visible. It allows direct observation of the planet’s atmosphere and composition.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default Lesson4