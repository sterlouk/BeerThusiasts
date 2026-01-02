import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postReview } from "../api/beer";

export default function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId || !rating) return alert("Please provide customer id and rating");
    setLoading(true);
    try {
      await postReview(id, { customer_id: Number(customerId), rating: Number(rating), comment });
      alert("Review posted");
      navigate(`/beers/${id}`);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to post review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        </label>
        <br />
        <label>
          Rating (1-5):
          <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <br />
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <br />
        <button type="submit" disabled={loading}>{loading ? "Posting..." : "Post Review"}</button>
        <button type="button" onClick={() => navigate(-1)} style={{ marginLeft: 8 }}>Cancel</button>
      </form>
    </div>
  );
}
