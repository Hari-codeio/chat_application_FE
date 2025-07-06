import { handleSignUp } from "../Handlers/handler";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  return (
    <div className="login-container">
      <h1>Sign Up</h1>
      <form onSubmit={(e) => handleSignUp(e, username, password, confirmPassword, navigate)}>
        <label>
          Username:
          <input type="text" 
          name="username" 
          className="login-input" 
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
        </label>
        <br />
        <label>
          Password:
          <input type="password" 
          name="password" 
          className="login-input" 
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </label>
        <br />
        <label>
          Password:
          <input type="password" 
          name="password" 
          className="login-input"
          placeholder="Confirm Password"
            value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}