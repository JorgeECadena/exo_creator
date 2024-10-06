import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//neptunianImage.jpeg';

function Lesson4() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/lesson5');
    };

    return (
        <div className='page'>
          <div className="card">
          <p>
          Neptunian exoplanets are similar in size to Neptune or Uranus in our solar system. Neptunian planets typically have hydrogen and helium-dominated atmospheres with cores of rock and heavier metals. Neptunian exoplanets may have a mixture of interiors though all would be rocky with heavier metals at their cores. Neptunian planets typically have hydrogen- and helium-dominated atmospheres. 
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Next</button>
    
          </div>
        </div>
      )
    }
export default Lesson4