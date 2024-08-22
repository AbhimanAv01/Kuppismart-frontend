import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {
    const [Email, setEmail] = useState("");
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
const handleSignup = (event) => {
    
    
    if (!Email || !Username || !password) {
        toast.error('Please fill out all fields');
        return;
    }

    const data = {
        username: Username,
        user_email_id: Email,
        password: password
    }

    axios.post("http://localhost:3000/api/signup", data).then(res => {
        toast.success('Sigup Successful');

    }).catch((err) => {
        const errorMsg = err.response?.data?.message || 'An error occurred during signup';
        toast.error(errorMsg);

    })
};
    return (
        <div className="container">
            
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                <h2>Create account</h2>
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Sign up</button>
                <h6 class="login-text">Already have an account? <a href="/" class="login-link">Log in</a></h6>

            </form>
        </div>
    );
}

export default Signup;