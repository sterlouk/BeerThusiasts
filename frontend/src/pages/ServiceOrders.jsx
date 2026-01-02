import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders, patchOrderStatus } from "../api/beer";

const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { background: "#27ae60", color: "white", text: "✅ Completed" };
      case "cancelled":
        return { background: "#e74c3c", color: "white", text: "❌ Cancelled" };
      case "pending":
      default:
        return { background: "#f39c12", color: "white", text: "⏳ Pending" };
    }
  };

  const style = getStatusStyle(status);
  return (
    <span style={{
      background: style.background,
      color: style.color,
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "0.8rem",
      fontWeight: "bold"
    }}>
      {style.text}
    </span>
  );
};

export default function ServiceOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load orders: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (orderId, status) => {
    try {
      await patchOrderStatus(orderId, status);
      setOrders((prev) => prev.map((o) => (o.order_id === orderId ? { ...o, status } : o)));
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update status: " + err.message);
    }
  };

  if (loading) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
      fontSize: "1.2rem",
      color: "#7f8c8d"
    }}>
      🚚 Loading orders...
    </div>
  );

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh"
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.95)",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "30px",
          fontSize: "2.5rem",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
        }}>
          🚚 Service Orders Management
        </h1>

        {orders.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#7f8c8d"
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>📦</div>
            <h3>No orders found</h3>
            <p>All orders are currently processed!</p>
          </div>
        ) : (
          <div style={{
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
          }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem"
            }}>
              <thead>
                <tr style={{ background: "#2c3e50", color: "white" }}>
                  <th style={{
                    padding: "15px 12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRight: "1px solid #34495e"
                  }}>
                    🆔 Order ID
                  </th>
                  <th style={{
                    padding: "15px 12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRight: "1px solid #34495e"
                  }}>
                    👤 Customer
                  </th>
                  <th style={{
                    padding: "15px 12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRight: "1px solid #34495e"
                  }}>
                    🏪 Pub
                  </th>
                  <th style={{
                    padding: "15px 12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRight: "1px solid #34495e"
                  }}>
                    📅 Date
                  </th>
                  <th style={{
                    padding: "15px 12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRight: "1px solid #34495e"
                  }}>
                    💰 Total
                  </th>
                  <th style={{
                    padding: "15px 12px",
                    textAlign: "center",
                    fontWeight: "bold",
                    borderRight: "1px solid #34495e"
                  }}>
                    📊 Status
                  </th>
                  <th style={{
                    padding: "15px 12px",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}>
                    ⚡ Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, idx) => (
                  <tr key={o.order_id} style={{
                    background: idx % 2 === 0 ? "#f8f9fa" : "white",
                    transition: "background 0.2s"
                  }}
                  onMouseOver={(e) => e.target.closest('tr').style.background = "#ecf0f1"}
                  onMouseOut={(e) => e.target.closest('tr').style.background = idx % 2 === 0 ? "#f8f9fa" : "white"}
                  >
                    <td style={{
                      padding: "12px",
                      textAlign: "center",
                      borderRight: "1px solid #ecf0f1",
                      fontWeight: "bold",
                      color: "#2c3e50"
                    }}>
                      #{o.order_id}
                    </td>
                    <td style={{
                      padding: "12px",
                      textAlign: "center",
                      borderRight: "1px solid #ecf0f1"
                    }}>
                      Customer {o.customer_id}
                    </td>
                    <td style={{
                      padding: "12px",
                      textAlign: "center",
                      borderRight: "1px solid #ecf0f1",
                      fontWeight: "bold",
                      color: o.pub_id ? "#27ae60" : "#7f8c8d"
                    }}>
                      {o.pub_id ? `Pub ${o.pub_id}` : "N/A"}
                    </td>
                    <td style={{
                      padding: "12px",
                      textAlign: "center",
                      borderRight: "1px solid #ecf0f1"
                    }}>
                      {new Date(o.order_date).toLocaleDateString()}<br />
                      <small style={{ color: "#7f8c8d" }}>
                        {new Date(o.order_date).toLocaleTimeString()}
                      </small>
                    </td>
                    <td style={{
                      padding: "12px",
                      textAlign: "center",
                      borderRight: "1px solid #ecf0f1",
                      fontWeight: "bold",
                      color: "#e74c3c"
                    }}>
                      €{Number(o.total_amount || 0).toFixed(2)}
                    </td>
                    <td style={{
                      padding: "12px",
                      textAlign: "center",
                      borderRight: "1px solid #ecf0f1"
                    }}>
                      <StatusBadge status={o.status} />
                    </td>
                    <td style={{
                      padding: "12px",
                      textAlign: "center"
                    }}>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        alignItems: "center"
                      }}>
                        <button
                          onClick={() => navigate(`/service/order/${o.order_id}`, { state: { pubId: o.pub_id } })}
                          style={{
                            padding: "6px 12px",
                            background: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            transition: "background 0.2s",
                            width: "100px"
                          }}
                          onMouseOver={(e) => e.target.style.background = "#2980b9"}
                          onMouseOut={(e) => e.target.style.background = "#3498db"}
                        >
                          👁️ Details
                        </button>

                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          {o.status !== "completed" && (
                            <button
                              onClick={() => changeStatus(o.order_id, "completed")}
                              style={{
                                padding: "4px 8px",
                                background: "#27ae60",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                                fontSize: "0.7rem",
                                transition: "background 0.2s"
                              }}
                              onMouseOver={(e) => e.target.style.background = "#229954"}
                              onMouseOut={(e) => e.target.style.background = "#27ae60"}
                            >
                              ✅ Complete
                            </button>
                          )}
                          {o.status !== "cancelled" && (
                            <button
                              onClick={() => changeStatus(o.order_id, "cancelled")}
                              style={{
                                padding: "4px 8px",
                                background: "#e74c3c",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                                fontSize: "0.7rem",
                                transition: "background 0.2s"
                              }}
                              onMouseOver={(e) => e.target.style.background = "#c0392b"}
                              onMouseOut={(e) => e.target.style.background = "#e74c3c"}
                            >
                              ❌ Cancel
                            </button>
                          )}
                          {o.status !== "pending" && (
                            <button
                              onClick={() => changeStatus(o.order_id, "pending")}
                              style={{
                                padding: "4px 8px",
                                background: "#f39c12",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                cursor: "pointer",
                                fontSize: "0.7rem",
                                transition: "background 0.2s"
                              }}
                              onMouseOver={(e) => e.target.style.background = "#e67e22"}
                              onMouseOut={(e) => e.target.style.background = "#f39c12"}
                            >
                              ⏳ Pending
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
