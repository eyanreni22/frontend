// src/sockets/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
    console.log("🛑 Initializing socket with token:", token);  // Log token for debugging
    socket = io("http://localhost:5000", {
      withCredentials: true,
      auth: { token },
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected due to:", reason);  // Log reason for disconnect
    });
  }
};

export const getSocket = () => socket;
