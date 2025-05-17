// src/main.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import store from "./redux/Store";
import { connectSocket } from "./sockets/socket";
connectSocket("fake-test-token");

// Define Root properly (not anonymous or default exported inline)
const RootComponent = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?._id && user?.token) {
      console.log("Connecting socket with token:", user.token); // 🔍
      connectSocket(user.token); // ✅ Pass the token to connect the socket
    }
  }, [user?._id, user?.token]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RootComponent />
  </Provider>
);
