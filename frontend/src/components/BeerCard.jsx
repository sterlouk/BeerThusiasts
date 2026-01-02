import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function BeerCard({ beer }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    add(beer, qty);
    // Optional: Show success feedback
    const button = document.activeElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = "✅ Added!";
      button.style.background = "#27ae60";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "linear-gradient(45deg, #3498db, #2980b9)";
      }, 1000);
    }
  };

  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      transition: "all 0.3s ease",
      border: "1px solid #ecf0f1",
      height: "fit-content"
    }}
    onMouseOver={(e) => {
      e.target.closest('.beer-card-container').style.transform = "translateY(-5px)";
      e.target.closest('.beer-card-container').style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    }}
    onMouseOut={(e) => {
      e.target.closest('.beer-card-container').style.transform = "translateY(0)";
      e.target.closest('.beer-card-container').style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
    }}
    className="beer-card-container"
    >
      {/* Beer Image/Icon */}
      <div style={{
        textAlign: "center",
        marginBottom: "15px",
        fontSize: "3rem"
      }}>
        🍺
      </div>

      {/* Beer Info */}
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{
          margin: "0 0 8px 0",
          color: "#2c3e50",
          fontSize: "1.3rem",
          fontWeight: "bold"
        }}>
          {beer.beer_name}
        </h3>
        <div style={{
          color: "#7f8c8d",
          fontSize: "0.9rem",
          marginBottom: "5px"
        }}>
          <span style={{ fontWeight: "bold" }}>Type:</span> {beer.kind || "N/A"}
        </div>
        <div style={{
          color: "#7f8c8d",
          fontSize: "0.9rem",
          marginBottom: "5px"
        }}>
          <span style={{ fontWeight: "bold" }}>Brand:</span> {beer.brand_name || "N/A"}
        </div>
        <div style={{
          color: "#7f8c8d",
          fontSize: "0.9rem"
        }}>
          <span style={{ fontWeight: "bold" }}>Country:</span> {beer.country || "N/A"}
        </div>
      </div>

      {/* Price */}
      <div style={{
        textAlign: "center",
        marginBottom: "15px"
      }}>
        <div style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#e74c3c"
        }}>
          €{Number(beer.price).toFixed(2)}
        </div>
      </div>

      {/* Quantity Selector */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "15px",
        gap: "10px"
      }}>
        <label style={{
          fontSize: "0.9rem",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          Qty:
        </label>
        <input
          type="number"
          min="1"
          max="99"
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
          style={{
            width: "60px",
            padding: "5px 8px",
            border: "1px solid #bdc3c7",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: "0.9rem"
          }}
        />
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        <button
          onClick={handleAddToCart}
          style={{
            padding: "10px 15px",
            background: "linear-gradient(45deg, #3498db, #2980b9)",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s",
            fontSize: "0.9rem"
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 10px rgba(52, 152, 219, 0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          🛒 Add to Cart
        </button>

        <button
          onClick={() => navigate(`/beers/${beer.beer_id}`)}
          style={{
            padding: "8px 15px",
            background: "#ecf0f1",
            color: "#2c3e50",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s",
            fontSize: "0.9rem"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "#3498db";
            e.target.style.color = "white";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "#ecf0f1";
            e.target.style.color = "#2c3e50";
            e.target.style.transform = "translateY(0)";
          }}
        >
          📋 View Details
        </button>
      </div>
    </div>
  );
}
