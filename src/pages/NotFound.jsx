import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        textAlign: "center",
        background: "radial-gradient(circle at 50% 0%, #eff6ff 0%, #ffffff 80%)"
      }}
    >
      <div style={{ maxWidth: "560px" }}>
        <div style={{ fontSize: "clamp(4rem, 10vw, 7rem)", fontWeight: "900", color: "#2563eb", lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: "900", color: "#0f172a", margin: "18px 0 12px" }}>
          Page Not Found
        </h1>
        <p style={{ color: "#475569", fontSize: "1.02rem", lineHeight: 1.6, marginBottom: "28px" }}>
          The page you are looking for does not exist or has been moved. Let&apos;s get you back to the right place.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <Link to="/" className="btn-primary" style={{ padding: "12px 24px" }}>
            <FaHome /> Back to Home
          </Link>
          <Link to="/features" className="btn-secondary" style={{ padding: "12px 24px" }}>
            <FaSearch /> Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}
