import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, getSocket } from "../sockets/socket"; // ✅ Import connectSocket
import { fetchProviderBookingsThunk } from "../redux/Slices/bookingSlice"; // ✅ Corrected import
import { toast } from "react-toastify";

const BookingListener = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (!user || user.role !== "provider") {
      console.log("🛑 Not a provider or missing user");
      return;
    }

    // ✅ Ensure socket is connected
    let socket = getSocket();  // Get the socket object if it's already initialized

    // If the socket is not initialized, initialize it
    if (!socket) {
      console.log("🛑 Socket not initialized, initializing now...");
      socket = connectSocket(user.token); // Initialize socket with the token
    }

    if (!socket) {
      console.log("🛑 Socket still not initialized");
      return;
    }

    console.log("👤 BookingListener active for:", user);

    // Emit joinRoom for provider-specific room
    socket.emit("joinRoom", user._id || user.id); // Make sure this matches your backend setup

    // Initial fetch of bookings
    dispatch(fetchProviderBookingsThunk()); // ✅ Use the correct thunk

    // Handle new booking event
    const handleNewBooking = (booking) => {
      toast.info("📥 New service request received!");
      dispatch(fetchProviderBookingsThunk()); // ✅ Use the correct thunk
    };

    // Handle booking updated event
    const handleBookingUpdated = () => {
      dispatch(fetchProviderBookingsThunk()); // ✅ Use the correct thunk
    };

    // Listen for new bookings and booking updates
    socket.on("newBooking", handleNewBooking);
    socket.on("bookingUpdated", handleBookingUpdated);

    // Cleanup when component unmounts or when user changes
    return () => {
      socket.off("newBooking", handleNewBooking);
      socket.off("bookingUpdated", handleBookingUpdated);
    };
  }, [dispatch, user]);

  return null; // No UI rendered, just background listener
};

export default BookingListener;
