import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//type.png';

function Lesson3() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/lesson4');
    };

    return (
        <div className='page'>
          <div className="card">
            <h1>Types</h1> 
          <p>
          A gas giant is a large planet mostly composed of helium and/or hydrogen. These planets, like Jupiter and Saturn in our solar system, don’t have hard surfaces and instead have swirling gases above a solid core. Gas giant exoplanets can be much larger than Jupiter, and much closer to their stars than anything found in our solar system.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default Lesson3