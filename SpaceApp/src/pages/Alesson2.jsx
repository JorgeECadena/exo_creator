import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//deHecho.png';

function Lesson2() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/Alesson3');
    };

    return (
        <div className='page'>
          <div className="card">
          <p>
          Size and mass play a crucial role in determining planet types. There are also varieties within the size/mass classifications. So far scientists have categorized exoplanets into the following types: Gas giant, Neptunian, super-Earth and terrestrial with subcategories like mini-Neptunes within those groups.
          Check out the next info to learn more about the different types of exoplanets.
            </p>
            <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default Lesson2