import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//direct.jpeg';

function BLesson4() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/Blesson5');
    };

    return (
        <div className='pageB'>
          <div className="cardB">
            <h1>Direct Imaging </h1>
          <p>
          Advanced techniques like coronagraphs or starshades block the star’s light, allowing the much fainter planet to be visible. It allows direct observation of the planet’s atmosphere and composition.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtontB" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default BLesson4