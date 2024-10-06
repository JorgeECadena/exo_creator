import { useNavigate } from 'react-router-dom';
import React from 'react';

function Menu() {

    const navigate = useNavigate();
  
    const handleNext1 = () => {
        navigate('/Alesson1');
    };
    const handleNext2 = () => {
        navigate('/Blesson1');
    };

    return (
        <div className='page'>
          <div className="card">
          <p>
          Which lesson would you like to take?
    
            </p>
          <button className="Lesson 1" onClick={handleNext1}>Lesson1</button>
          <p></p>
          <p></p>

          <button className="Lesson 2" onClick={handleNext2}>Lesson2</button>

    
          </div>
        </div>
      )
    }
export default Menu