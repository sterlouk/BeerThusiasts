import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBeerAdmin, upsertPubHasBeerAdmin, fetchEnum, fetchPubsNeedsRestock } from "../api/beer";
import Employees from "./Employees";

export default function Admin() {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem("role");
    navigate("/");
  }, [navigate]);

  const role = localStorage.getItem("role");
  const [active, setActive] = useState("menu");

  if (role !== "admin") {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px"
      }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "400px"
        }}>
          <h2 style={{ color: "#e74c3c", marginBottom: "20px" }}>🚫 Access Denied</h2>
          <p style={{ color: "#7f8c8d", marginBottom: "30px" }}>
            You must enter as Admin to view this page.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 25px",
              background: "linear-gradient(45deg, #3498db, #2980b9)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (active === "add") return (
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
      }}>
        <button
          onClick={() => setActive('menu')}
          style={{
            padding: "8px 15px",
            background: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.target.style.background = "#7f8c8d"}
          onMouseOut={(e) => e.target.style.background = "#95a5a6"}
        >
          ← Back to Menu
        </button>
        <h2 style={{
          color: "#2c3e50",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          🍺 Add New Beer
        </h2>
        <AddBeerForm />
      </div>
    );
    if (active === "inventory") return (
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
      }}>
        <button
          onClick={() => setActive('menu')}
          style={{
            padding: "8px 15px",
            background: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.target.style.background = "#7f8c8d"}
          onMouseOut={(e) => e.target.style.background = "#95a5a6"}
        >
          ← Back to Menu
        </button>
        <h2 style={{
          color: "#2c3e50",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          📦 Update Pub Inventory
        </h2>
        <PubHasBeerForm />
      </div>
    );
    if (active === "restock") return (
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
      }}>
        <button
          onClick={() => setActive('menu')}
          style={{
            padding: "8px 15px",
            background: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.target.style.background = "#7f8c8d"}
          onMouseOut={(e) => e.target.style.background = "#95a5a6"}
        >
          ← Back to Menu
        </button>
        <h2 style={{
          color: "#2c3e50",
          marginBottom: "20px",
          textAlign: "center"
        }}>
          🔄 Restock Management
        </h2>
        <RestockPanel />
      </div>
    );
    if (active === "employees") return (
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
      }}>
        <button
          onClick={() => setActive('menu')}
          style={{
            padding: "8px 15px",
            background: "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px",
            transition: "background 0.2s"
          }}
          onMouseOver={(e) => e.target.style.background = "#7f8c8d"}
          onMouseOut={(e) => e.target.style.background = "#95a5a6"}
        >
          ← Back to Menu
        </button>
        <Employees />
      </div>
    );

    return (
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "40px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <h1 style={{
          color: "#2c3e50",
          marginBottom: "10px",
          fontSize: "2.5rem",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
        }}>
          ⚙️ Admin Panel
        </h1>
        <p style={{
          color: "#7f8c8d",
          marginBottom: "40px",
          fontSize: "1.1rem"
        }}>
          Choose an admin tool to manage your beer inventory
        </p>
        <div style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button
            onClick={() => setActive('add')}
            style={{
              padding: "20px 30px",
              background: "linear-gradient(45deg, #27ae60, #229954)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(39, 174, 96, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
              minWidth: "200px"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 6px 20px rgba(39, 174, 96, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(39, 174, 96, 0.3)";
            }}
          >
            ➕ Add New Beer
          </button>

          <button
            onClick={() => setActive('inventory')}
            style={{
              padding: "20px 30px",
              background: "linear-gradient(45deg, #3498db, #2980b9)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
              minWidth: "200px"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 6px 20px rgba(52, 152, 219, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.3)";
            }}
          >
            📦 Update Inventory
          </button>

          <button
            onClick={() => setActive('restock')}
            style={{
              padding: "20px 30px",
              background: "linear-gradient(45deg, #e67e22, #d35400)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(230, 126, 34, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
              minWidth: "200px"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 6px 20px rgba(230, 126, 34, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(230, 126, 34, 0.3)";
            }}
          >
            🔄 Check Restock
          </button>

          <button
            onClick={() => setActive('employees')}
            style={{
              padding: "20px 30px",
              background: "linear-gradient(45deg, #9b59b6, #8e44ad)",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "1.1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(155, 89, 182, 0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
              minWidth: "200px"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 6px 20px rgba(155, 89, 182, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(155, 89, 182, 0.3)";
            }}
          >
            👥 Company Records
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh"
    }}>
      {renderContent()}
      <div style={{
        textAlign: "center",
        marginTop: "30px"
      }}>
        <button
          onClick={logout}
          style={{
            padding: "12px 25px",
            background: "linear-gradient(45deg, #e74c3c, #c0392b)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(231, 76, 60, 0.3)",
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

function AddBeerForm() {
  const [form, setForm] = useState({ name: "", price: "", beer_kind: "", alcohol_content: "", container_kind: "", volume_liters: "", brand_id: "" });
  const [loading, setLoading] = useState(false);
  const [containerOptions, setContainerOptions] = useState([]);

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || form.price === "") return alert("Name and price required");
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        beer_kind: form.beer_kind || null,
        alcohol_content: form.alcohol_content ? Number(form.alcohol_content) : null,
        container_kind: form.container_kind || null,
        volume_liters: form.volume_liters ? Number(form.volume_liters) : null,
        brand_id: form.brand_id ? Number(form.brand_id) : null,
      };
      const res = await createBeerAdmin(payload);
      alert(`✅ Beer created successfully! ID: ${res.beer_id}`);
      setForm({ name: "", price: "", beer_kind: "", alcohol_content: "", container_kind: "", volume_liters: "", brand_id: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Error creating beer: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetchEnum('beer', 'container_kind');
        if (mounted && res && res.values) setContainerOptions(res.values);
      } catch (e) {
        // ignore
      }
    })();
    return () => (mounted = false);
  }, []);

  return (
    <form onSubmit={handleSubmit} style={{
      display: "grid",
      gap: "15px",
      maxWidth: "500px",
      margin: "0 auto"
    }}>
      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          🍺 Beer Name *
        </label>
        <input
          name="name"
          placeholder="Enter beer name"
          value={form.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
          required
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          💰 Price (€) *
        </label>
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={form.price}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
          required
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          🍻 Beer Type
        </label>
        <input
          name="beer_kind"
          placeholder="e.g., lager, ale, stout"
          value={form.beer_kind}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          🍺 Alcohol Content (%)
        </label>
        <input
          name="alcohol_content"
          type="number"
          step="0.1"
          placeholder="0.0"
          value={form.alcohol_content}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          📦 Container Type
        </label>
        {Array.isArray(containerOptions) && containerOptions.length > 0 ? (
          <select
            name="container_kind"
            value={form.container_kind}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ecf0f1",
              borderRadius: "8px",
              fontSize: "1rem",
              background: "white",
              cursor: "pointer"
            }}
          >
            <option value="">Select container type</option>
            {containerOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ) : (
          <input
            name="container_kind"
            placeholder="e.g., bottle, can"
            value={form.container_kind}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "2px solid #ecf0f1",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#3498db"}
            onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
          />
        )}
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          📏 Volume (liters)
        </label>
        <input
          name="volume_liters"
          type="number"
          step="0.1"
          placeholder="0.0"
          value={form.volume_liters}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          🏷️ Brand ID
        </label>
        <input
          name="brand_id"
          placeholder="Enter brand ID"
          value={form.brand_id}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "15px 30px",
          background: loading ? "#95a5a6" : "linear-gradient(45deg, #27ae60, #229954)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 15px rgba(39, 174, 96, 0.3)",
          transition: "transform 0.2s",
          marginTop: "10px"
        }}
        onMouseOver={(e) => {
          if (!loading) e.target.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          if (!loading) e.target.style.transform = "translateY(0)";
        }}
      >
        {loading ? "🔄 Creating Beer..." : "🍺 Create Beer"}
      </button>
    </form>
  );
}

function PubHasBeerForm() {
  const [form, setForm] = useState({ pub_id: "", beer_id: "", quantity_available: "", reorder_threshold: "", storage_location: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        pub_id: Number(form.pub_id),
        beer_id: Number(form.beer_id),
        quantity_available: form.quantity_available === "" ? 0 : Number(form.quantity_available),
        reorder_threshold: form.reorder_threshold === "" ? null : Number(form.reorder_threshold),
        storage_location: form.storage_location || null,
      };
      await upsertPubHasBeerAdmin(payload);
      alert("✅ Inventory updated successfully!");
      setForm({ pub_id: "", beer_id: "", quantity_available: "", reorder_threshold: "", storage_location: "" });
    } catch (err) {
      console.error(err);
      alert("❌ Error updating inventory: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: "grid",
      gap: "15px",
      maxWidth: "500px",
      margin: "0 auto"
    }}>
      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          🏪 Pub ID *
        </label>
        <input
          name="pub_id"
          type="number"
          placeholder="Enter pub ID"
          value={form.pub_id}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
          required
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          🍺 Beer ID *
        </label>
        <input
          name="beer_id"
          type="number"
          placeholder="Enter beer ID"
          value={form.beer_id}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
          required
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          📦 Quantity Available
        </label>
        <input
          name="quantity_available"
          type="number"
          min="0"
          placeholder="0"
          value={form.quantity_available}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          🔄 Reorder Threshold
        </label>
        <input
          name="reorder_threshold"
          type="number"
          min="0"
          placeholder="Minimum stock level"
          value={form.reorder_threshold}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
        />
      </div>

      <div>
        <label style={{
          display: "block",
          marginBottom: "5px",
          color: "#2c3e50",
          fontWeight: "bold"
        }}>
          📍 Storage Location
        </label>
        <input
          name="storage_location"
          placeholder="e.g., Fridge A, Shelf 3"
          value={form.storage_location}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "2px solid #ecf0f1",
            borderRadius: "8px",
            fontSize: "1rem",
            transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "#3498db"}
          onBlur={(e) => e.target.style.borderColor = "#ecf0f1"}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "15px 30px",
          background: loading ? "#95a5a6" : "linear-gradient(45deg, #3498db, #2980b9)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
          transition: "transform 0.2s",
          marginTop: "10px"
        }}
        onMouseOver={(e) => {
          if (!loading) e.target.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          if (!loading) e.target.style.transform = "translateY(0)";
        }}
      >
        {loading ? "🔄 Updating Inventory..." : "📦 Update Inventory"}
      </button>
    </form>
  );
}

function RestockPanel() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPubsNeedsRestock();
      setRows(data || []);
    } catch (err) {
      console.error('Failed to fetch restock rows', err);
      alert('❌ Failed to fetch restock list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleSetQuantity = async (pub_id, beer_id) => {
    const val = prompt('Set new quantity for pub ' + pub_id + ', beer ' + beer_id + ':');
    if (val === null) return;
    const qty = Number(val);
    if (Number.isNaN(qty)) return alert('❌ Invalid number');
    try {
      await upsertPubHasBeerAdmin({ pub_id, beer_id, quantity_available: qty });
      alert('✅ Quantity updated successfully!');
      load();
    } catch (e) {
      console.error(e);
      alert('❌ Failed to update quantity');
    }
  };

  const handleMarkOrdered = async (pub_id, beer_id) => {
    const val = prompt('Enter days until reorder arrives (integer), or 0 to clear:');
    if (val === null) return;
    const days = Number(val);
    if (Number.isNaN(days)) return alert('❌ Invalid number');
    try {
      await upsertPubHasBeerAdmin({ pub_id, beer_id, remaining_until_reorder: days });
      alert('✅ Marked as ordered!');
      load();
    } catch (e) {
      console.error(e);
      alert('❌ Failed to mark ordered');
    }
  };

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px"
      }}>
        <button
          onClick={load}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: loading ? "#95a5a6" : "linear-gradient(45deg, #3498db, #2980b9)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "1rem",
            boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => {
            if (!loading) e.target.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            if (!loading) e.target.style.transform = "translateY(0)";
          }}
        >
          {loading ? "🔄 Loading..." : "🔄 Refresh List"}
        </button>
      </div>

      {rows.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px",
          color: "#7f8c8d",
          background: "#f8f9fa",
          borderRadius: "10px"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✅</div>
          <h3>All stocked up!</h3>
          <p>No items need restocking at this time.</p>
        </div>
      ) : (
        <div style={{
          background: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: "0.9rem"
          }}>
            <thead>
              <tr style={{ background: "#2c3e50", color: "white" }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: "bold",
                  borderRight: "1px solid #34495e"
                }}>
                  🏪 Pub
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: "bold",
                  borderRight: "1px solid #34495e"
                }}>
                  🍺 Beer
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontWeight: "bold",
                  borderRight: "1px solid #34495e"
                }}>
                  📦 Current Qty
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontWeight: "bold",
                  borderRight: "1px solid #34495e"
                }}>
                  🎯 Reorder At
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontWeight: "bold",
                  borderRight: "1px solid #34495e"
                }}>
                  ⏰ Days Left
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'center',
                  fontWeight: "bold"
                }}>
                  ⚡ Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={`${r.pub_id}-${r.beer_id}-${idx}`} style={{
                  background: idx % 2 === 0 ? "#f8f9fa" : "white",
                  transition: "background 0.2s"
                }}
                onMouseOver={(e) => e.target.closest('tr').style.background = "#ecf0f1"}
                onMouseOut={(e) => e.target.closest('tr').style.background = idx % 2 === 0 ? "#f8f9fa" : "white"}
                >
                  <td style={{ padding: '12px', borderRight: "1px solid #ecf0f1" }}>
                    {r.pub_name || `Pub ${r.pub_id}`}
                  </td>
                  <td style={{ padding: '12px', borderRight: "1px solid #ecf0f1" }}>
                    {r.beer_name || `Beer ${r.beer_id}`}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderRight: "1px solid #ecf0f1",
                    fontWeight: "bold",
                    color: r.quantity_available <= (r.reorder_threshold || 0) ? "#e74c3c" : "#27ae60"
                  }}>
                    {r.quantity_available ?? '—'}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderRight: "1px solid #ecf0f1"
                  }}>
                    {r.reorder_threshold ?? '—'}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'right',
                    borderRight: "1px solid #ecf0f1",
                    fontWeight: "bold",
                    color: (r.remaining_until_reorder || 0) <= 1 ? "#e74c3c" : "#f39c12"
                  }}>
                    {r.remaining_until_reorder ?? '—'}
                  </td>
                  <td style={{
                    padding: '12px',
                    textAlign: 'center'
                  }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button
                        onClick={() => handleSetQuantity(r.pub_id, r.beer_id)}
                        style={{
                          padding: "6px 12px",
                          background: "#3498db",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          transition: "background 0.2s"
                        }}
                        onMouseOver={(e) => e.target.style.background = "#2980b9"}
                        onMouseOut={(e) => e.target.style.background = "#3498db"}
                      >
                        Set Qty
                      </button>
                      <button
                        onClick={() => handleMarkOrdered(r.pub_id, r.beer_id)}
                        style={{
                          padding: "6px 12px",
                          background: "#e67e22",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          transition: "background 0.2s"
                        }}
                        onMouseOver={(e) => e.target.style.background = "#d35400"}
                        onMouseOut={(e) => e.target.style.background = "#e67e22"}
                      >
                        Mark Ordered
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
