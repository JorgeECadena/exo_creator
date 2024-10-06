import { React, useState, setState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post, get } from 'aws-amplify/api';
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

    /*async function sendData(data) {
        if(password !== passwordConfirmation) {
            alert("Passwords do not match!");
            return;
        }

        const apiName = "api";
        const path = '/barbo';
        const myInit = {
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await post(apiName, path, myInit);
            console.log("POST was successful: ", response);
        } catch (error) {
            console.log("Error while POST: ", error);
        }

    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://btfccxhaig.execute-api.us-east-2.amazonaws.com/dev/barbo/userData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            }),
        });
        const data = await response.json();
        console.log(data);
       } catch (error) {
           console.error('Error on POST:', error);
       } 
    };

    return (

        <form onSubmit={handleSubmit} className='SignUp'>
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
            <button type="submit">SignUp</button>
        </form>

    );
};

export default SignUp;