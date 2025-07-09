import  { useState } from 'react';
import { handleLogIn } from '../Handlers/handler';
import { useNavigate } from 'react-router-dom';
export const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <form onSubmit={(event) => handleLogIn(event, username, password, navigate)}>
        <h2>Login</h2>
        <label>Username:
        <input className="login-input" 
        type="text" 
        placeholder="Username"
        value={username}  
        onChange={(event) => setUsername(event.target.value)}
        required
        />
        </label>
        <br />
        <label>Password:
        <input className="login-input" 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        /> 
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
};