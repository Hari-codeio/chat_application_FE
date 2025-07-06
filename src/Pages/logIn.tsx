import  { useState } from 'react';
import { handleLogIn } from '../Handlers/handler';
import { useNavigate } from 'react-router-dom';
export const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <form onSubmit={(e) => handleLogIn(e, username, password, navigate)}>
        <h2>Login</h2>
        <label>Username:
        <input className="login-input" 
        type="text" 
        placeholder="Username"
        value={username}  
        onChange={(e) => setUsername(e.target.value)}
        required
        />
        </label>
        <br />
        <label>Password:
        <input className="login-input" 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        /> 
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
};