import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import serviceReducer from "./Slices/ServiceSlice";
import bookingReducer from "./Slices/bookingSlice";
import reviewReducer from "./Slices/reviewSlice";
import invoiceReducer from "./Slices/invoiceSlice";
import adminReducer from "./Slices/adminSlice";
import paymentReducer from "./Slices/paymentSlice";
import socketReducer, { setSocketConnected } from "./Slices/socketSlice";
import { getSocket } from "../sockets/socket"; // ✅ use named import

const store = configureStore({
  reducer: {
    user: userReducer,
    services: serviceReducer,
    bookings: bookingReducer,
    reviews: reviewReducer,
    invoices: invoiceReducer,
    socket: socketReducer,
    admin: adminReducer,
    payment: paymentReducer,
  },
});

// Access socket instance and listen for events (after connectSocket() is called)
const socket = getSocket();

if (socket) {
  socket.on("connect", () => {
    store.dispatch(setSocketConnected(true));
  });

  socket.on("paymentSuccess", () => {
    // You need to define `setPaymentSuccess` in your paymentSlice if not done yet
    store.dispatch(setPaymentSuccess());
  });
}

export default store;
