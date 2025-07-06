import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import "../App.css";

const BASE_URL = "http://localhost:3001/api";
const SOCKET_URL = "http://localhost:3001";

export const Users = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    { sender: string; message: string; timestamp: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const username = localStorage.getItem("username")!;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/user/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      });
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

  const sendMessage = () => {
    if (socketRef.current && newMessage.trim() && selectedUser) {
      const payload = {
        toUserId: selectedUser,
        fromUserId: username,
        message: newMessage,
      };

      socketRef.current.emit("privateMessage", payload);

      setMessages((prev) => [
        ...prev,
        { sender: username, message: newMessage, timestamp: new Date().toISOString() },
      ]);

      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Chat Masala</h3>
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
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to chat with.</p>
        )}
      </div>
    </div>
  );
};
