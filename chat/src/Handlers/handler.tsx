import type { NavigateFunction } from "react-router-dom";
import { axiosInstance } from "../API/apiInstance";
import { Socket } from "socket.io-client";


export const handleLogIn = async (event: React.FormEvent<HTMLFormElement>, username: string, password: string, navigate: NavigateFunction) => {
  event.preventDefault();

  const response = await axiosInstance.post(`/auth/login`, {
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
    const response = await axiosInstance.post(`/auth/signUp`, {
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

export interface MessagePayload {
  toUserId: string;
  fromUserId: string;
  message: string;
}

export const sendMessageHandler = (
  socket: Socket | null,
  newMessage: string,
  selectedUser: string | null,
  username: string,
  setMessages: React.Dispatch<React.SetStateAction<{ sender: string; message: string; timestamp: string }[]>>,
  setNewMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (socket && newMessage.trim() && selectedUser) {
    const payload: MessagePayload = {
      toUserId: selectedUser,
      fromUserId: username,
      message: newMessage,
    };

    socket.emit("privateMessage", payload);

    setMessages((prev) => [
      ...prev,
      { sender: username, message: newMessage, timestamp: new Date().toISOString() },
    ]);

    setNewMessage("");
  }
};


