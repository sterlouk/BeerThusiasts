import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { upsertPubHasBeerAdmin, fetchPubsNeedsRestock, fetchBeers } from "../api/beer";
import PlaceOrder from "./PlaceOrder";
import AdminSupplierOrders from "./AdminSupplierOrders";
import Employees from "./Employees";

// Restock Alert Component
function RestockAlert({ onNavigateToRestock }) {
  const [restockCount, setRestockCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const checkRestock = useCallback(async () => {
    try {
      const data = await fetchPubsNeedsRestock();
      const count = data ? data.length : 0;
      setRestockCount(count);
      setShowAlert(count > 0);
    } catch (err) {
      console.error('Failed to check restock status', err);
    }
  }, []);

  useEffect(() => {
    // Check immediately
    checkRestock();
    
    // Check every 30 seconds
    const interval = setInterval(checkRestock, 30000);
    
    return () => clearInterval(interval);
  }, [checkRestock]);

  if (!showAlert) return null;

  return (
    <>
      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
        color: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
        cursor: 'pointer',
        zIndex: 1000,
        animation: 'slideInRight 0.5s ease-out',
        maxWidth: '300px',
        transition: 'all 0.2s ease'
      }}
      onClick={() => {
        setShowAlert(false);
        onNavigateToRestock();
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.5)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.4)';
      }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{ fontSize: '1.5rem' }}>⚠️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>Restock Alert!</div>
            <div style={{ fontSize: '0.9rem', marginTop: '2px' }}>
              {restockCount} item{restockCount !== 1 ? 's' : ''} need{restockCount === 1 ? 's' : ''} restocking
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '8px', opacity: 0.9 }}>
              Click to manage restock →
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAlert(false);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.2rem',
              padding: '0',
              opacity: 0.7,
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.target.style.opacity = '1'}
            onMouseOut={(e) => e.target.style.opacity = '0.7'}
            title="Dismiss alert"
          >
            ×
          </button>
        </div>
        <div
          style={{
            width: '100%',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px',
            marginTop: '10px',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
          onClick={() => {
            setShowAlert(false);
            onNavigateToRestock();
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'white',
              borderRadius: '2px',
              animation: 'progressBar 30s linear infinite'
            }}
          />
        </div>
        <style>
          {`
            @keyframes progressBar {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}
        </style>
      </div>
    </>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    localStorage.removeItem("role");
    navigate("/");
  }, [navigate]);

  const role = localStorage.getItem("role");
  const [active, setActive] = useState("menu");

  const handleNavigateToRestock = useCallback(() => {
    setActive('restock');
  }, []);

  if (role !== "admin") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", padding: "20px" }}>
        <div style={{ background: "rgba(255, 255, 255, 0.95)", padding: "40px", borderRadius: "15px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)", textAlign: "center", maxWidth: "400px" }}>
          <h2 style={{ color: "#e74c3c", marginBottom: "20px" }}>🚫 Access Denied</h2>
          <p style={{ color: "#7f8c8d", marginBottom: "30px" }}>You must enter as Admin to view this page.</p>
          <button onClick={() => navigate("/")} style={{ padding: "12px 25px", background: "linear-gradient(45deg, #3498db, #2980b9)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem", boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)" }}>Go to Home</button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (active === 'beers') return (
      <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "15px", padding: "30px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
        <button onClick={() => setActive('menu')} style={{ padding: "8px 15px", background: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}>← Back to Menu</button>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>🍺 Manage Beers</h2>
        <BeersList />
      </div>
    );

    if (active === 'orders') return (
      <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "15px", padding: "30px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
        <button onClick={() => setActive('menu')} style={{ padding: "8px 15px", background: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}>← Back to Menu</button>
        <PlaceOrder />
      </div>
    );

    if (active === 'inventory') return (
      <div style={{ background: "rgba(255, 255, 255, 0.95)", borderRadius: "15px", padding: "30px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
        <button onClick={() => setActive('menu')} style={{ padding: "8px 15px", background: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}>← Back to Menu</button>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>📦 Update Pub Inventory</h2>
        <PubHasBeerForm />
      </div>
    );

    if (active === 'restock') return (
      <div style={{ background: "rgba(255, 255, 255, 0.95)", borderRadius: "15px", padding: "30px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
        <button onClick={() => setActive('menu')} style={{ padding: "8px 15px", background: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}>← Back to Menu</button>
        <h2 style={{ color: "#2c3e50", marginBottom: "20px", textAlign: "center" }}>🔄 Restock Management</h2>
        <RestockPanel />
      </div>
    );

    if (active === 'employees') return (
      <div style={{ background: "rgba(255, 255, 255, 0.95)", borderRadius: "15px", padding: "30px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
        <button onClick={() => setActive('menu')} style={{ padding: "8px 15px", background: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}>← Back to Menu</button>
        <Employees />
      </div>
    );
    if (active === 'supplier-orders') return (
      <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "15px", padding: "30px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)" }}>
        <button onClick={() => setActive('menu')} style={{ padding: "8px 15px", background: "#95a5a6", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }}>← Back to Menu</button>
        <AdminSupplierOrders />
      </div>
    );
    return (
      <div style={{ background: "rgba(255, 255, 255, 0.95)", borderRadius: "15px", padding: "40px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h1 style={{ color: "#2c3e50", marginBottom: "10px", fontSize: "2.5rem" }}>⚙️ Admin Panel</h1>
        <p style={{ color: "#7f8c8d", marginBottom: "40px", fontSize: "1.1rem" }}>Choose an admin tool to manage your beer inventory</p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate('/admin/beers')} style={{ padding: "20px 30px", background: "linear-gradient(45deg, #f39c12, #e67e22)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", minWidth: "200px" }}>🍺 Manage Beers</button>
          <button onClick={() => navigate('/beers/new')} style={{ padding: "20px 30px", background: "linear-gradient(45deg, #27ae60, #229954)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", minWidth: "200px" }}>➕ Add New Beer</button>
          <button onClick={() => setActive('inventory')} style={{ padding: "20px 30px", background: "linear-gradient(45deg, #3498db, #2980b9)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", minWidth: "200px" }}>📦 Update Inventory</button>
          <button onClick={() => setActive('restock')} style={{ padding: "20px 30px", background: "linear-gradient(45deg, #e67e22, #d35400)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", minWidth: "200px" }}>🔄 Check Restock</button>
          <button onClick={() => setActive('employees')} style={{ padding: "20px 30px", background: "linear-gradient(45deg, #9b59b6, #8e44ad)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", minWidth: "200px" }}>👥 Company Records</button>
          <button onClick={() => setActive('orders')} style={{ padding: "20px 30px", background: "linear-gradient(45deg, #34495e, #2c3e50)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", minWidth: "200px" }}>📦 Place Order</button>
          <button onClick={() => setActive('supplier-orders')} style={{ padding: "20px 30px", background: "linear-gradient(45deg, #16a085, #1abc9c)", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", minWidth: "200px" }}>📋 Supplier Orders</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
      <RestockAlert onNavigateToRestock={handleNavigateToRestock} />
      {renderContent()}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button onClick={logout} style={{ padding: "12px 25px", background: "linear-gradient(45deg, #e74c3c, #c0392b)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}>🚪 Logout</button>
      </div>
    </div>
  );
}

function BeersList() {
  const navigate = useNavigate();
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchBeers();
      setBeers(data || []);
    } catch (err) {
      console.error('Failed to fetch beers', err);
      alert('❌ Failed to fetch beers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button onClick={load} disabled={loading} style={{ padding: "10px 20px", background: loading ? "#95a5a6" : "linear-gradient(45deg, #3498db, #2980b9)", color: "white", border: "none", borderRadius: "8px" }}>{loading ? "🔄 Loading..." : "🔄 Refresh List"}</button>
      </div>

      {beers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#7f8c8d", background: "#f8f9fa", borderRadius: "10px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🍺</div>
          <h3>No beers found</h3>
          <p>Add some beers to get started.</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#2c3e50", color: "white" }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: "bold", borderRight: "1px solid #34495e" }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: "bold", borderRight: "1px solid #34495e" }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: "bold", borderRight: "1px solid #34495e" }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: "bold", borderRight: "1px solid #34495e" }}>Kind</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: "bold" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {beers.map((beer, idx) => (
                <tr key={beer.beer_id} style={{ background: idx % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={{ padding: '12px', borderRight: "1px solid #ecf0f1" }}>{beer.beer_id}</td>
                  <td style={{ padding: '12px', borderRight: "1px solid #ecf0f1" }}>{beer.name}</td>
                  <td style={{ padding: '12px', textAlign: 'right', borderRight: "1px solid #ecf0f1" }}>€{beer.price}</td>
                  <td style={{ padding: '12px', borderRight: "1px solid #ecf0f1" }}>{beer.beer_kind}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button onClick={() => navigate(`/beers/${beer.beer_id}`)} style={{ padding: "6px 12px", background: "#3498db", color: "white", border: "none", borderRadius: "5px" }}>Edit</button>
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
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", maxWidth: "500px", margin: "0 auto" }}>
      <div>
        <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50", fontWeight: "bold" }}>🏪 Pub ID *</label>
        <input name="pub_id" type="number" placeholder="Enter pub ID" value={form.pub_id} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "8px", fontSize: "1rem" }} required />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50", fontWeight: "bold" }}>🍺 Beer ID *</label>
        <input name="beer_id" type="number" placeholder="Enter beer ID" value={form.beer_id} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "8px", fontSize: "1rem" }} required />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50", fontWeight: "bold" }}>📦 Quantity Available</label>
        <input name="quantity_available" type="number" min="0" placeholder="0" value={form.quantity_available} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "8px", fontSize: "1rem" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50", fontWeight: "bold" }}>🔄 Reorder Threshold</label>
        <input name="reorder_threshold" type="number" min="0" placeholder="Minimum stock level" value={form.reorder_threshold} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "8px", fontSize: "1rem" }} />
      </div>
      <div>
        <label style={{ display: "block", marginBottom: "5px", color: "#2c3e50", fontWeight: "bold" }}>📍 Storage Location</label>
        <input name="storage_location" placeholder="e.g., Fridge A, Shelf 3" value={form.storage_location} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "2px solid #ecf0f1", borderRadius: "8px", fontSize: "1rem" }} />
      </div>
      <button type="submit" disabled={loading} style={{ padding: "15px 30px", background: loading ? "#95a5a6" : "linear-gradient(45deg, #3498db, #2980b9)", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}> {loading ? "🔄 Updating Inventory..." : "📦 Update Inventory"} </button>
    </form>
  );
}

function RestockPanel() {
  const navigate = useNavigate();
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

  const handleSetQuantity = useCallback((pub_id, beer_id) => {
    navigate(`/place-order?pub_id=${pub_id}&beer_id=${beer_id}`);
  }, [navigate]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button onClick={load} disabled={loading} style={{ padding: "10px 20px", background: loading ? "#95a5a6" : "linear-gradient(45deg, #3498db, #2980b9)", color: "white", border: "none", borderRadius: "8px" }}>{loading ? "🔄 Loading..." : "🔄 Refresh List"}</button>
      </div>

      {rows.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#7f8c8d", background: "#f8f9fa", borderRadius: "10px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✅</div>
          <h3>All stocked up!</h3>
          <p>No items need restocking at this time.</p>
        </div>
      ) : (
        <div style={{ background: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#2c3e50", color: "white" }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: "bold", borderRight: "1px solid #34495e" }}>🏪 Pub</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: "bold", borderRight: "1px solid #34495e" }}>🍺 Beer</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: "bold", borderRight: "1px solid #34495e" }}>📦 Current Qty</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: "bold", borderRight: "1px solid #34495e" }}>🎯 Reorder At</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: "bold" }}>⚡ Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={`${r.pub_id}-${r.beer_id}-${idx}`} style={{ background: idx % 2 === 0 ? "#f8f9fa" : "white" }}>
                  <td style={{ padding: '12px', borderRight: "1px solid #ecf0f1" }}>{r.pub_name || `Pub ${r.pub_id}`}</td>
                  <td style={{ padding: '12px', borderRight: "1px solid #ecf0f1" }}>{r.beer_name || `Beer ${r.beer_id}`}</td>
                  <td style={{ padding: '12px', textAlign: 'right', borderRight: "1px solid #ecf0f1", fontWeight: "bold", color: r.quantity_available <= (r.reorder_threshold || 0) ? "#e74c3c" : "#27ae60" }}>{r.quantity_available ?? '—'}</td>
                  <td style={{ padding: '12px', textAlign: 'right', borderRight: "1px solid #ecf0f1" }}>{r.reorder_threshold ?? '—'}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button onClick={() => handleSetQuantity(r.pub_id, r.beer_id)} style={{ padding: "6px 12px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px" }}>Order Now</button>
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
