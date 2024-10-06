import { React, useState, setState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

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
            console.log("barbo");
            alert("Passwords do not match!");
            return;
        }
    };

    return (

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

            <button onClick={() => goToHome()}>Go home</button>
            <button onClick={submitForm}>Dummy</button>
            <button type="submit">SignUp</button>
        </form>

    );
};

export default SignUp;