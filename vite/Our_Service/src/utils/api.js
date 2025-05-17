import axios from "axios"


/// General Axios instance
const api = axios.create({
  baseURL:  'http://localhost:5000/api',
  headers: { "Content-Type": "application/json" },
});

// Attach user/provider token to general requests
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token"); // For user/service provider
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Intercept responses for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a CORS issue or network error
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Response Error:', error.response);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened while setting up the request
      console.error('Axios error setup:', error.message);
    }
    return Promise.reject(error);
  }
);

// ✅ Auth APIs
export const registerUser = (formData) => api.post("/users/register", formData);
export const loginUser = (data) => api.post("/users/login", data);
export const registerAdmin = (formData) => api.post("/admins/register", formData);
export const loginAdmin = (data) => api.post("/admins/login", data);

// Customer creates a new booking
export const createBooking = (data) => api.post("/bookings", data);

// Customer gets their own bookings
export const getCustomerBookings = () => api.get("/bookings/customer");

// Provider/Admin gets bookings
export const getProviderBookings = () => api.get("/bookings/provider");

// Provider/Admin updates booking status
export const updateBookingStatus = (id, status) =>
  api.put(`/bookings/status/${id}`, { status });

// Provider/Admin updates payment status
export const updatePaymentStatus = (id, paymentStatus) =>
  api.put(`/bookings/payment/${id}`, { paymentStatus });

export default api;
