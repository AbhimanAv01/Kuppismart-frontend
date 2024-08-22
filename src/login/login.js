import React, { useState } from 'react'; // Import useState from React
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios'; // Import axios for making API requests
import { toast } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import '../CSS/Login.css'

function Login() {

    const [Email,setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const logdata = {
            user_email_id: Email,
            password: Password
        };
    
        try {
            const res = await axios.post("http://localhost:3000/api/login", logdata);
            const { success, message, token } = res.data;
    
            if (success && token) {
                console.log(token);
    
               
                localStorage.setItem('accessToken', token);
    
                
                toast.success("Login Successful");
    
              
                navigate('/expenses'); 
            } else {
                toast.error(message || "Login failed");
                navigate('/login'); 
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed';
            toast.error(errorMsg);
    
           
            navigate('/login'); 
        }
    };
    
    
  return (
      <div className="container">
      
      <form onSubmit={handleLogin}>
        <div className="mb-3">
        <h2>Login</h2>
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={Email}
            placeholder='Email'
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
            value={Password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* {error && <div className="alert alert-danger">{error}</div>} */}
        <button type="submit" className="btn">Login</button>
        <h6 class="login-text">New User? <a href="/signup" class="login-link">Signup</a></h6>
      </form>
    </div>
  );
};


export default Login
