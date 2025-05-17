import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import { submitReview, fetchBookingReview } from "../redux/Slices/reviewSlice";
import { FaStar } from "react-icons/fa";

const FormContainer = styled.div`
  max-width: 500px;
  background: #f2f2f2;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-height: 100px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
`;

const StarsWrapper = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const Star = styled(FaStar)`
  font-size: 24px;
  color: ${({ filled }) => (filled ? "#ffc107" : "#ccc")};
  transition: color 0.2s ease;
`;

const ReviewForm = ({ bookingId, onClose }) => {
  const dispatch = useDispatch();
  const { bookingReview } = useSelector((state) => state.reviews);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  // ✅ Guard: Only dispatch fetch if bookingId exists
  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingReview(bookingId));
    }
  }, [dispatch, bookingId]);

  // Prefill form if review already exists
  useEffect(() => {
    if (bookingReview) {
      setRating(bookingReview.rating);
      setComment(bookingReview.comment);
    }
  }, [bookingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.warn("Please enter a comment.");
      return;
    }

    try {
      await dispatch(submitReview({ bookingId, rating, comment })).unwrap();

      toast.success("Review submitted successfully!");
      localStorage.setItem(
        "reviewedBookings",
        JSON.stringify([
          ...(JSON.parse(localStorage.getItem("reviewedBookings")) || []),
          bookingId,
        ])
      );
      onClose();
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  };

  // Optional: Don't render if no bookingId (just defensive UI)
  if (!bookingId) return null;

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Field>
          <Label>Rating</Label>
          <StarsWrapper>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= (hoverRating || rating)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </StarsWrapper>
        </Field>

        <Field>
          <Label htmlFor="comment">Comment</Label>
          <TextArea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here..."
            required
          />
        </Field>

        <Button type="submit">Submit Review</Button>
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>
      </form>
    </FormContainer>
  );
};

export default ReviewForm;
