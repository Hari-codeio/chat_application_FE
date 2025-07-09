import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>Welcome to Chat</h1>
      <h4>New user ?</h4>
      <button onClick={() => navigate('/login')}>Log In</button>
      <h4>Existing user ?</h4>
      <button onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  );
}