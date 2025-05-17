import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { processPayment, resetPaymentState } from "../redux/Slices/paymentSlice";
import { Alert, Button, CircularProgress, TextField, MenuItem, Snackbar } from "@mui/material";

const PaymentForm = ({ bookingId, amount }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, paymentStatus, error } = useSelector((state) => state.payment);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    // Effect when paymentStatus changes
    useEffect(() => {
        if (paymentStatus?.url) {
            // Redirect to Stripe checkout
            setSnackbar({ open: true, message: "✅ Redirecting to payment...", severity: "success" });
            setTimeout(() => {
                window.location.href = paymentStatus.url; // Redirect to Stripe Checkout
            }, 1500);
        } else if (paymentStatus?.success) {
            setSnackbar({ open: true, message: "✅ Payment successful! Invoice sent.", severity: "success" });
            dispatch(resetPaymentState());
            setTimeout(() => navigate("/customer-dashboard"), 2000);
        }
    }, [paymentStatus, dispatch, navigate]);

    // Handle payment initiation
    const handlePayment = async () => {
        if (!bookingId || !amount || !paymentMethod) {
            setSnackbar({ open: true, message: "❌ Booking ID, amount, and payment method are required!", severity: "error" });
            return;
        }

        try {
            const response = await dispatch(processPayment({ bookingId, amount, paymentMethod }));
            if (!response.payload?.url && !response.payload?.success) {
                setSnackbar({ open: true, message: "❌ Payment initiation failed. Try again.", severity: "error" });
            }
        } catch (err) {
            setSnackbar({ open: true, message: "❌ Payment failed! Check console for errors.", severity: "error" });
            console.error("❌ Payment Error:", err);
        }
    };

    return (
        <div>
            <h3>💳 Make a Payment</h3>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                label="Payment Method"
                select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                fullWidth
                margin="normal"
            >
                <MenuItem value="card">Credit/Debit Card</MenuItem>
                {/* Add more payment options if needed */}
            </TextField>

            <Button
                variant="contained"
                color="primary"
                onClick={handlePayment}
                disabled={loading}
                fullWidth
                style={{ marginTop: "10px" }}
            >
                {loading ? <CircularProgress size={24} /> : "Pay Now"}
            </Button>

            {/* Snackbar for showing success/error messages */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </div>
    );
};

export default PaymentForm;
