import { React, useState, setState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import background from './assets/background1.jpg'; // Fondo del universo
import logo from './assets/logo.png'; // Asegúrate de tener el logo correcto


const SignUp = () => {
    const navigate = useNavigate();

    // Input values
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const goToHome = () => {
        navigate('/');
    };

    const submitForm = (e) => {
        e.preventDefault();

        if(password !== passwordConfirmation) {
            alert("Passwords do not match!");
            return;
        }
    };

    return (
        <div  
        className="app"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            {/* Contenedor del logo */}
            <div className="logo-container">
            <img src={logo} alt="App Logo" className="app-logo" />
            </div>
            
            <div className = "sign-in-card">
                <form onSubmit={submitForm} className='SignUp'>
                    <h1>SignUp</h1>
                    <p>First name:</p>
                    <input 
                        type="text" 
                        placeholder="Place your first name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />

                    <p>Last name:</p>
                    <input 
                        type="text" 
                        placeholder="Place your last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />

                    <p>Email:</p>
                    <input 
                        type="email" 
                        placeholder="Place your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <p>Password:</p>
                    <input 
                        type="password" 
                        placeholder="Place your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <p>Confirm password:</p>
                    <input 
                        type="password" 
                        placeholder="Place your password" 
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        required
                    />

                    <a href="#">Already have an account? Sign in here.</a>

                    <div className="button-container">
                        <button onClick={() => goToHome()}>Go home</button>
                        <button type="submit">SignUp</button>
                    </div>
                </form>

            </div>
        </div>

    );
};

export default SignUp;