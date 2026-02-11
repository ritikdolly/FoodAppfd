import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Rating,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { createCustomerReview } from "../../api/customerReview";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";

export const AddCustomerReviewModal = ({ open, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please provide a rating");
      return;
    }

    setIsLoading(true);
    try {
      await createCustomerReview({ rating, comment });
      toast.success("Review submitted successfully!");
      onClose();
      setRating(0);
      setComment("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data); // Should show "You have already submitted a review..."
      } else {
        toast.error("Failed to submit review");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="p-4 relative">
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          Rate Your Experience
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col items-center gap-4 py-4">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
            <TextField
              label="Share your thoughts"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={isLoading}
              sx={{
                mt: 2,
                bgcolor: "#FF4B2B",
                "&:hover": { bgcolor: "#e04020" },
              }}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};
