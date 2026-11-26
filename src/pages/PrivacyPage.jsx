import { Link } from "react-router-dom";
import { FaLock, FaUserShield, FaWhatsapp, FaArrowLeft } from "react-icons/fa";

const sections = [
  {
    title: "1. Information We Collect",
    body: "When you register your library or submit a contact inquiry on LMS by Study Guru (powered by Software Native), we collect essential business details such as your Library Name, Owner/Administrator Name, Gmail address, WhatsApp/mobile number, city, state, address, and seating capacity. For security and fraud prevention, we also log basic technical metadata including IP address, browser type, and operating system. Library photos selected during registration are used only for your WhatsApp verification message and are not stored in our registration database, and passwords are never collected during initial registration."
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used strictly to verify and activate your library branch portal, send your approval email with Admin Portal login credentials and trial coupon code, provide technical support via WhatsApp or phone, and maintain platform security against duplicate or unauthorized accounts."
  },
  {
    title: "3. Student & Branch Data Ownership",
    body: "All student profiles, seat allocations, attendance logs, and fee collection records entered inside your LMS dashboard belong 100% to your library. We do not sell, rent, trade, or disclose your library or student data to any third-party advertisers or external brokers."
  },
  {
    title: "4. Payment Processing Security",
    body: "The nominal ₹1 branch verification payment and subsequent Basic or Pro subscription renewals are processed securely through Razorpay. LMS by Study Guru does not store your debit/credit card numbers, CVV, or UPI PINs on our servers."
  },
  {
    title: "5. Data Retention, Auto-Cleanup & Local Storage",
    body: "Registration and active branch records are retained while your account remains active. To keep the system fast, routine QR attendance logs older than 30 days may be automatically cleaned up as part of standard maintenance. Additionally, your browser's local storage may temporarily hold your registration acknowledgment summary so you can view or print your slip."
  },
  {
    title: "6. Security Safeguards",
    body: "We protect your data using HTTPS/SSL encryption, restricted administrative API access, and strict single-device session enforcement for staff accounts. While we follow industry-standard cloud practices, no online system is 100% immune to risk, so we advise keeping your OTP-verified admin password confidential."
  },
  {
    title: "7. Your Rights & Contact Information",
    body: "You may request access to, correction of, or deletion of your branch registration details at any time, and you can export your student and fee records directly from your dashboard. For any privacy-related questions, contact Software Native at contactsoftwarenative@gmail.com or +91 9142025447."
  }
];

export default function PrivacyPage() {
  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Header Banner */}
      <section
        style={{
          padding: "64px 0 36px",
          textAlign: "center",
          background: "radial-gradient(circle at 50% 0%, #eff6ff 0%, #ffffff 80%)",
          borderBottom: "1px solid var(--border-subtle)"
        }}
      >
        <div className="container" style={{ maxWidth: "880px" }}>
          <div className="badge-blue" style={{ marginBottom: "16px" }}>
            <FaUserShield /> Data Protection &amp; Privacy
          </div>
          <h1 style={{ fontSize: "clamp(2.1rem, 4vw, 3.2rem)", lineHeight: 1.15, marginBottom: "14px", color: "#0f172a" }}>
            Privacy <span className="gradient-blue">Policy</span>
          </h1>
          <p style={{ color: "#475569", fontSize: "1.02rem", lineHeight: 1.6, marginBottom: "10px" }}>
            How LMS by Study Guru collects, protects, and respects your library and student information.
          </p>
          <p style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: "700" }}>
            Last Updated: November 2026
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="white-card" style={{ padding: "36px", borderTop: "5px solid #2563eb" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {sections.map((sec, idx) => (
                <div
                  key={idx}
                  style={{
                    paddingBottom: idx < sections.length - 1 ? "22px" : "0",
                    borderBottom: idx < sections.length - 1 ? "1px solid var(--border-subtle)" : "none"
                  }}
                >
                  <h2 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                    {sec.title}
                  </h2>
                  <p style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.7, margin: 0 }}>
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Note & Actions */}
            <div
              style={{
                marginTop: "32px",
                padding: "20px",
                borderRadius: "14px",
                background: "#f8fafc",
                border: "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.88rem", color: "#334155", fontWeight: "600" }}>
                <FaLock style={{ color: "#2563eb", fontSize: "16px", flexShrink: 0 }} />
                <span>Privacy queries? Email us at contactsoftwarenative@gmail.com</span>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link to="/terms" className="btn-secondary" style={{ padding: "10px 16px", fontSize: "0.86rem" }}>
                  View Terms &amp; Conditions
                </Link>
                <Link to="/register" className="btn-primary" style={{ padding: "10px 18px", fontSize: "0.86rem" }}>
                  <FaArrowLeft /> Back to Registration
                </Link>
                <a
                  href="https://wa.me/919142025447?text=Hi%20Software%20Native,%20I%20have%20a%20question%20about%20the%20LMS%20Privacy%20Policy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ padding: "10px 18px", fontSize: "0.86rem" }}
                >
                  <FaWhatsapp /> WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
