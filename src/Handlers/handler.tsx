import type { NavigateFunction } from "react-router-dom";
import axios from "axios";
const BASE_URL = 'http://localhost:3001/api';

export const handleLogIn = async (event: React.FormEvent<HTMLFormElement>, username: string, password: string, navigate: NavigateFunction) => {
  event.preventDefault();

    const response = await axios.post(`${BASE_URL}/auth/login`, {
      userName: username,
      password
    });
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('username', username);
      alert("Login successful");
      navigate('/users');
    } else {
      alert("User already exists");
    }
  

  
    navigate('/users');
  
}


export const handleSignUp = async (event: React.FormEvent<HTMLFormElement>, username: string, password: string, confirmPassword: string, navigate: NavigateFunction) => {
  event.preventDefault();

  if (password === confirmPassword) {
    const response = await axios.post(`${BASE_URL}/auth/signUp`, {
      userName: username,
      password
    });
    console.log(response);
    if (response.status === 200) {
      navigate('/login');
    } else {
      alert("User already exists");
    }
  } else {
    alert("Passwords mismatch!");
  }
}




