import { useNavigate } from 'react-router-dom';
import React from 'react';
import typeImage from '..//terrestialImage.png';

function Lesson6() {

    const navigate = useNavigate();
  
    const handleNext = () => {
        navigate('/quizz1');
    };

    return (
        <div className='page'>
          <div className="card">
          <p>
          In our solar system, Earth, Mars, Mercury and Venus are terrestrial, or rocky, planets. For planets outside our solar system, those between half of Earth’s size to twice its radius are considered terrestrial and others may be even smaller. Terrestrial planets (Earth sized and smaller) are rocky worlds, composed of rock, silicate, water and/or carbon.
          </p>
          <img src={typeImage} alt="Type" className="image-style" ></img>
          <button className="NexButtont" onClick={handleNext}>Take a quiz!</button>
    
          </div>
        </div>
      )
    }
export default Lesson6