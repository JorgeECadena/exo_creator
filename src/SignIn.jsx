import { useState } from 'react';
import './App.css';
import background from './assets/background1.jpg'; // Fondo del universo
import logo from './assets/logo.png';

function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                alignItems: 'center'
            }}
        >
            <div className="logo-container">
                <img src={logo} alt="App Logo" className="app-logo" />
            </div>

            {/* Tarjeta de sign-in */}
            <div className="sign-in-card">
                <h2>Sign In</h2>
                <form className='SignIn'>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </label>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;