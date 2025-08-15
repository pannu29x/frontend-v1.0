import { useEffect, useState } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState("checking");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE || "";
    if (!API_BASE) {
      console.warn("⚠ VITE_API_BASE is not set in environment variables.");
      setStatus("unknown");
      return;
    }

    const checkBackend = () => {
      fetch(`${API_BASE}/health`)
        .then((res) => {
          if (res.ok) {
            if (status === "offline") {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }
            setStatus("online");
          } else {
            setStatus("offline");
          }
        })
        .catch(() => {
          setStatus("offline");
        });
    };

    checkBackend(); // initial check
    const interval = setInterval(checkBackend, 30000); // recheck every 30s

    return () => clearInterval(interval);
  }, [status]);

  return (
    <>
      {status === "offline" && (
        <div style={{
          background: "#ff4d4f",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
          zIndex: 1000
        }}>
          ⚠ Backend Offline — Retrying...
        </div>
      )}

      {status === "unknown" && (
        <div style={{
          background: "#ffa500",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
          zIndex: 1000
        }}>
          ⚠ Backend URL Missing — Please set VITE_API_BASE in env
        </div>
      )}

      <div style={{
        position: "fixed",
        bottom: showToast ? "20px" : "-100px",
        right: "20px",
        background: "#4caf50",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "5px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        transition: "bottom 0.5s ease-in-out",
        zIndex: 1000
      }}>
        ✅ Backend Online
      </div>
    </>
  );
}
