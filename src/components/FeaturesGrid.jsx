import { Link } from "react-router-dom";
import { FaTh, FaQrcode, FaCashRegister, FaUserPlus, FaChartLine, FaThLarge, FaCheck, FaArrowRight } from "react-icons/fa";

const features = [
  {
    stepId: "seats",
    icon: <FaTh />,
    color: "#2563eb",
    bg: "#eff6ff",
    borderTop: "#2563eb",
    title: "Smart Seat Management",
    desc: "Take complete control of your library seating with an intelligent seat management system. Manage seats floor-wise and room-wise, track real-time availability, monitor occupancy, and assign multiple students to the same seat across Morning, Afternoon, and Night shifts. Maximize seating capacity while keeping every seat organized.",
    highlights: [
      "Floor & room-wise organization with real-time occupancy tracking",
      "Multi-shift allocation: Assign up to 3 students per physical seat",
      "Interactive visual layout with smart search & availability filters"
    ],
    pageLink: "/features?step=seats#workflow-guide"
  },
  {
    stepId: "admission",
    icon: <FaUserPlus />,
    color: "#2563eb",
    bg: "#eff6ff",
    borderTop: "#2563eb",
    title: "Smart Student Admission & Registration System",
    desc: "Simplify student onboarding with two flexible admission methods: Manual Admission and QR Code-Based Admission. Administrators can register students by entering their details manually or allow students to submit their personal information through a QR-based admission form. Every student receives a unique Student ID and Registration Number. Collect a one-time Registration Fee during the first admission, followed by the selected subscription plan fee. Administrators can also assign seats and shifts directly from the dashboard, making the entire admission process smooth, fast, and organized.",
    highlights: [
      "Dual methods: Manual staff entry & QR code-based self-admission",
      "Unique Student ID & Registration Number generation",
      "Direct seat & shift assignment with initial registration fee collection"
    ],
    pageLink: "/features?step=admission#workflow-guide"
  },
  {
    stepId: "attendance",
    icon: <FaQrcode />,
    color: "#10b981",
    bg: "#ecfdf5",
    borderTop: "#10b981",
    title: "Dual Attendance System",
    desc: "Simplify student attendance with two flexible options: QR Code Scanning and Manual Attendance. Students can mark their attendance by scanning a QR code using their mobile phones or by entering their Student ID/Number. The system automatically records attendance time, provides easy ON/OFF control, and securely maintains attendance records for up to 30 days before automatic deletion.",
    highlights: [
      "Dual options: Mobile QR code scanning & manual Student ID entry",
      "Automatic timestamp logging with easy ON/OFF attendance control",
      "Secure records maintained for up to 30 days with auto-cleanup"
    ],
    pageLink: "/features?step=attendance#workflow-guide"
  },
  {
    stepId: "fee-desk",
    icon: <FaCashRegister />,
    color: "#059669",
    bg: "#f0fdf4",
    borderTop: "#059669",
    title: "Smart Fee & Validity Management",
    desc: "Simplify library fee collection with flexible, plan-based payment management. Collect student fees according to their selected plans, manage automatic validity renewals, and track upcoming expiry dates with timely alerts. Generate professional invoices, download and print receipts, or share them directly via WhatsApp and Gmail. For UPI transactions, record UTR numbers to maintain accurate and transparent payment records.",
    highlights: [
      "Plan-based fee collection & automatic validity renewal tracking",
      "Instant invoice generation with print & WhatsApp/Gmail sharing",
      "UPI transaction tracking with UTR numbers for 100% transparency"
    ],
    pageLink: "/features?step=fee-desk#workflow-guide"
  },
  {
    stepId: "overview",
    icon: <FaThLarge />,
    color: "#6366f1",
    bg: "#eef2ff",
    borderTop: "#6366f1",
    title: "Complete Library Overview Dashboard",
    desc: "Get a complete overview of your library from one centralized dashboard. Monitor total students, active members, suspended accounts, disabled students, and memberships that are expiring soon or already expired. Access student statistics and membership information at a glance, helping you track library activity, monitor student status, and manage daily operations more efficiently.",
    highlights: [
      "Monitor total students, active members & suspended accounts",
      "Track expiring soon & already expired memberships at a glance",
      "Real-time student statistics & status monitoring from one place"
    ],
    pageLink: "/features?step=overview#workflow-guide"
  },
  {
    stepId: "expenses",
    icon: <FaChartLine />,
    color: "#f59e0b",
    bg: "#fffbeb",
    borderTop: "#f59e0b",
    title: "Expense Tracker & Financial Management",
    desc: "Take complete control of your library's finances with an integrated Expense Tracking and Financial Reporting System. Track total payments received, add and manage daily expenses, and monitor your overall financial performance from one dashboard. View financial reports with flexible monthly and yearly filters, analyze income and expenses, and download or share payment invoices for easy record-keeping.",
    highlights: [
      "Track total payments received & record daily operational expenses",
      "Flexible monthly & yearly financial performance reporting",
      "Analyze income vs. expenses with easy invoice download & sharing"
    ],
    pageLink: "/features?step=expenses#workflow-guide"
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="section-padding" style={{ background: "#ffffff", borderBottom: "1px solid var(--border-subtle)" }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 54px" }}>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "16px", color: "#0f172a" }}>
            Purpose-Built for Indian Reading Rooms & Study Libraries
          </h2>
          <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.6 }}>
            Generic school software does not fit multi-shift study libraries. 
            LMS is designed specifically for student reading halls, civil service preparation hubs, and library chains.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          className="features-main-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px"
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              className="white-card"
              style={{
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderTop: `4px solid ${f.borderTop}`
              }}
            >
              <div>
                <div style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "14px",
                  background: f.bg,
                  color: f.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  marginBottom: "20px"
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800", marginBottom: "12px", color: "#0f172a" }}>
                  {f.title}
                </h3>
                <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
                  {f.desc}
                </p>

                {/* Bullet Points */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                  {f.highlights.map((h, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#1e293b" }}>
                      <span style={{ color: "#10b981", display: "flex", fontSize: "13px" }}><FaCheck /></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={f.pageLink}
                onClick={() => {
                  const targetEl = document.getElementById("workflow-guide");
                  if (targetEl) {
                    setTimeout(() => {
                      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 80);
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.88rem",
                  fontWeight: "800",
                  color: f.color,
                  padding: "6px 0",
                  transition: "gap 0.2s"
                }}
              >
                <span>Learn More in Dedicated Module</span>
                <FaArrowRight style={{ fontSize: "11px" }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
