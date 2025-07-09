import { useEffect, useState, useRef } from "react";
import {axiosInstance} from "../API/apiInstance"; 
import { io, Socket } from "socket.io-client";
import "../App.css";
import { sendMessageHandler } from "../Handlers/handler";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const fetchUsers = async (token: string | null, setUsers: (users: string[]) => void) => {
  try {
    const response = await axiosInstance.get("/user/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(response.data.data);
  } catch (err) {
    console.error("Failed to fetch users:", err);
  }
};

export const Users = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ sender: string; message: string; timestamp: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const username = localStorage.getItem("username")!;
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers(token, setUsers);
  }, [token]);

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("register", username);
    });

    socket.on("receivePrivateMessage", (data: { sender: string; message: string; timestamp: string }) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Chat Users</h3>
        <ul className="user-list">
          {users
            .filter((user) => user !== username)
            .map((user, idx) => (
              <li key={idx}>
                <button
                  className={`user-button ${selectedUser === user ? "active" : ""}`}
                  onClick={() => {
                    setSelectedUser(user);
                    setMessages([]);
                  }}
                >
                  {user}
                </button>
              </li>
            ))}
        </ul>
      </div>

      <div className="chat-box">
        {selectedUser ? (
          <>
            <h4>Chatting with {selectedUser}</h4>
            <div className="messages">
              {messages.map((msg, idx) => (
                <p key={idx}>
                  <strong>{msg.sender}</strong>: {msg.message}
                </p>
              ))}
            </div>
            <div className="input-area">
              <input
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={() =>
                sendMessageHandler(
                  socketRef.current,
                  newMessage,
                  selectedUser,
                  username,
                  setMessages,
                  setNewMessage
                )
              }>
                Send
              </button>
            </div>
          </>
        ) : (
          <p>Select a user to chat with.</p>
        )}
      </div>
    </div>
  );
};
