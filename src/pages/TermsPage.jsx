import { Link } from "react-router-dom";
import { FaShieldAlt, FaFileContract, FaWhatsapp, FaArrowLeft } from "react-icons/fa";

const sections = [
  {
    title: "1. Acceptance of Terms & Eligibility",
    body: "By registering on or using LMS by Study Guru (powered by Software Native), you confirm that you are the authorized owner or designated administrator of a genuine study library, reading room, or educational center. All registration details submitted—including Library Name, Owner Name, Gmail address, mobile number, and branch address—must be accurate and verifiable."
  },
  {
    title: "2. Branch Verification & 3-Month Free Trial",
    body: "Upon successful verification of your branch registration, you will receive an approval email containing your Admin Portal login link and a unique coupon code for the 3-Month Free Pro Trial. To authenticate your branch credentials and prevent duplicate or automated accounts, a nominal ₹1 security verification payment is processed via Razorpay. This ₹1 verification charge is non-refundable. Multiple free trial registrations for the same branch or owner are strictly prohibited and may result in account suspension."
  },
  {
    title: "3. Subscription Plans, Billing & Renewals",
    body: "After the complimentary 3-month trial concludes, you may continue by choosing either our Basic Plan (₹150/month, ₹400/quarter, ₹800/half-year, ₹1,500/year) or Pro Plan (₹250/month, ₹700/quarter, ₹1,300/half-year, ₹2,500/year). There are no automatic or hidden recurring debits after the trial—renewal notifications are displayed inside your Admin Dashboard so you can renew manually. Once a paid subscription cycle is activated, fees are generally non-refundable; however, in the event of a duplicate payment or verified technical deduction error, a refund will be processed within 5–7 business days."
  },
  {
    title: "4. Account Security & Device Limits",
    body: "You are solely responsible for maintaining the confidentiality of your OTP-verified admin password and branch access links. To protect your library against unauthorized staff misuse, LMS enforces plan-based device and session limits (such as 2 devices on Basic and multi-branch/device controls on Pro). Sharing credentials outside authorized branch personnel or attempting to bypass device restrictions is prohibited."
  },
  {
    title: "5. Data Ownership, Privacy & Attendance Cleanup",
    body: "All student records, seat allocations, fee ledgers, and branch reports entered into LMS remain 100% your property. We never sell, rent, or share your student or financial data with third-party marketers. You may export your records at any time in standard formats. To maintain fast server performance, routine QR attendance logs older than 30 days may be automatically archived or cleaned up as outlined in our product documentation."
  },
  {
    title: "6. Acceptable Use & WhatsApp Alerts",
    body: "Built-in WhatsApp fee reminders, admission confirmations, and payment receipts are intended strictly for legitimate library communication with your enrolled students. Any misuse for spam, unsolicited marketing, or unlawful content is prohibited. Reverse-engineering, scraping API endpoints, or attempting to compromise platform security will lead to immediate termination of access."
  },
  {
    title: "7. Service Availability & Support",
    body: "We strive to maintain 99.9% cloud uptime and regular backups. Temporary interruptions may occur during scheduled maintenance or due to third-party infrastructure outages (including internet, cloud hosting, Razorpay, or WhatsApp services). Technical support is available via WhatsApp and phone (+91 9142025447) between 10:00 AM and 8:00 PM IST."
  },
  {
    title: "8. Termination & Governing Law",
    body: "There are no long-term lock-in contracts or cancellation penalties; you may discontinue using the platform at the end of any billing cycle. These Terms & Conditions are governed by the laws of India, and any disputes shall be subject to the jurisdiction of Indian courts."
  }
];

export default function TermsPage() {
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
            <FaFileContract /> Legal & Platform Policy
          </div>
          <h1 style={{ fontSize: "clamp(2.1rem, 4vw, 3.2rem)", lineHeight: 1.15, marginBottom: "14px", color: "#0f172a" }}>
            Terms &amp; <span className="gradient-blue">Conditions</span>
          </h1>
          <p style={{ color: "#475569", fontSize: "1.02rem", lineHeight: 1.6, marginBottom: "10px" }}>
            Clear, transparent terms governing the use of LMS by Study Guru for library owners, branch administrators, and staff.
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
                <FaShieldAlt style={{ color: "#2563eb", fontSize: "18px", flexShrink: 0 }} />
                <span>Questions about these terms? Contact us at contactsoftwarenative@gmail.com</span>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link to="/register" className="btn-primary" style={{ padding: "10px 18px", fontSize: "0.86rem" }}>
                  <FaArrowLeft /> Back to Registration
                </Link>
                <a
                  href="https://wa.me/919142025447?text=Hi%20Software%20Native,%20I%20have%20a%20question%20about%20LMS%20Terms%20and%20Conditions."
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
