import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaEnvelope,
  FaKey,
  FaSignInAlt,
  FaTicketAlt,
  FaCogs,
  FaGraduationCap,
  FaCheckCircle,
  FaArrowDown,
  FaArrowRight,
  FaChair,
  FaClock,
  FaRupeeSign,
  FaWhatsapp
} from "react-icons/fa";

export default function GuidePage() {
  const flowchartSteps = [
    { num: "1", title: "Register Account", target: "step-1", icon: <FaUserPlus /> },
    { num: "2", title: "Gmail Verification & Welcome Email", target: "step-2", icon: <FaEnvelope /> },
    { num: "3", title: "OTP Verification & Password Setup", target: "step-3", icon: <FaKey /> },
    { num: "4", title: "Admin Panel Login", target: "step-4", icon: <FaSignInAlt /> },
    { num: "5", title: "Apply Coupon – ₹1 Secure Razorpay Confirmation (3-Month Free Trial)", target: "step-5", icon: <FaTicketAlt /> },
    { num: "6", title: "Create Seat Plans", target: "step-6", icon: <FaChair /> },
    { num: "7", title: "Configure Fee Plans", target: "step-6", icon: <FaRupeeSign /> },
    { num: "8", title: "Add Library Shifts", target: "step-6", icon: <FaClock /> },
    { num: "9", title: "Start Student Admissions", target: "step-7", icon: <FaGraduationCap /> }
  ];

  const scrollToStep = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: "90px" }}>
      {/* Hero Header */}
      <section
        style={{
          padding: "70px 0 45px",
          textAlign: "center",
          background: "radial-gradient(circle at 50% 0%, #eff6ff 0%, #ffffff 85%)",
          borderBottom: "1px solid #e2e8f0"
        }}
      >
        <div className="container" style={{ maxWidth: "900px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#eff6ff",
              color: "#0284c7",
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "0.86rem",
              fontWeight: "800",
              marginBottom: "16px",
              border: "1px solid #bfdbfe"
            }}
          >
            Complete Setup Guide
          </div>

          <h1
            style={{
              fontSize: "clamp(2.1rem, 4.2vw, 3.4rem)",
              lineHeight: 1.15,
              marginBottom: "16px",
              color: "#0f172a",
              fontWeight: "900"
            }}
          >
            LMS – Library Owner <span style={{ color: "#0284c7" }}>Registration Workflow</span>
          </h1>

          <p
            style={{
              color: "#475569",
              fontSize: "1.15rem",
              lineHeight: 1.6,
              marginBottom: "24px",
              fontWeight: "500"
            }}
          >
            Complete User Journey: From Registration to Student Admission
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/register" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <FaUserPlus /> Start Free Registration
            </Link>
            <a
              href="https://wa.me/919934272186?text=Hi%20Study%20Guru%2C%20I%20need%20help%20with%20LMS%20registration%20and%20setup"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffffff" }}
            >
              <FaWhatsapp style={{ color: "#22c55e" }} /> Instant Setup Assistance
            </a>
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: "1050px", marginTop: "40px" }}>
        
        {/* ========================================================= */}
        {/* VISUAL FLOWCHART OVERVIEW (Dark Card inspired by Diagram) */}
        {/* ========================================================= */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: "20px",
            padding: "36px 24px",
            color: "#ffffff",
            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.2)",
            marginBottom: "50px",
            border: "1px solid #334155"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#38bdf8",
                background: "rgba(56, 189, 248, 0.12)",
                padding: "4px 12px",
                borderRadius: "12px"
              }}
            >
              Quick Overview Map
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "900", margin: "10px 0 6px", color: "#ffffff" }}>
              The 9-Step Onboarding Roadmap
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "0.92rem", margin: 0 }}>
              Click any step below to jump directly to its detailed explanation
            </p>
          </div>

          <div
            style={{
              maxWidth: "520px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px"
            }}
          >
            {flowchartSteps.map((step, idx) => (
              <div key={idx} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => scrollToStep(step.target)}
                  style={{
                    width: "100%",
                    background: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "12px",
                    padding: "12px 18px",
                    color: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(2, 132, 199, 0.25)";
                    e.currentTarget.style.borderColor = "#38bdf8";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.2)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "#0284c7",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: "900",
                        flexShrink: 0
                      }}
                    >
                      {step.num}
                    </span>
                    <span style={{ fontSize: "0.95rem", fontWeight: "700" }}>{step.title}</span>
                  </div>
                  <span style={{ color: "#38bdf8", fontSize: "14px", opacity: 0.8 }}>{step.icon}</span>
                </button>

                {/* Arrow Down */}
                <div style={{ padding: "4px 0", color: "#64748b", fontSize: "13px" }}>
                  <FaArrowDown />
                </div>
              </div>
            ))}

            {/* Final Success Badge */}
            <div
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #065f46 0%, #047857 100%)",
                border: "1px solid #10b981",
                borderRadius: "14px",
                padding: "12px 20px",
                textAlign: "center",
                fontWeight: "900",
                fontSize: "1rem",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                boxShadow: "0 8px 20px rgba(16, 185, 129, 0.25)"
              }}
            >
              <FaCheckCircle style={{ color: "#6ee7b7" }} />
              <span>Library Successfully Started & Automated</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DETAILED STEP BY STEP GUIDE SECTIONS */}
        {/* ========================================================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

          {/* STEP 1 */}
          <div
            id="step-1"
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "0.85rem"
                  }}
                >
                  Step 1
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>Register an Account</h3>
              </div>
              <FaUserPlus style={{ fontSize: "1.3rem", opacity: 0.9 }} />
            </div>

            <div style={{ padding: "28px" }}>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "1.02rem",
                  color: "#334155",
                  lineHeight: 1.6
                }}
              >
                <li>
                  <strong>User visits the website:</strong> Open the official portal at{" "}
                  <Link to="/" style={{ color: "#0284c7", fontWeight: "700" }}>
                    LMS by Study Guru
                  </Link>
                  .
                </li>
                <li>
                  <strong>Clicks the Register button:</strong> Click on <strong>"Register"</strong> in the top navigation or on the homepage hero banner.
                </li>
                <li>
                  <strong>Enters details:</strong> Enter your full name, valid Gmail address, mobile number, branch name, address, and upload a clear picture of the study hall.
                </li>
                <li>
                  <strong>Clicks Register Now:</strong> Submit the registration form to create your account immediately.
                </li>
              </ol>

              <div
                style={{
                  marginTop: "20px",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                <div style={{ color: "#1e40af", fontSize: "0.95rem" }}>
                  <span>Ready to register? It takes less than 2 minutes to submit your details.</span>
                </div>
                <Link
                  to="/register"
                  style={{
                    background: "#0284c7",
                    color: "#ffffff",
                    padding: "8px 18px",
                    borderRadius: "8px",
                    fontWeight: "800",
                    fontSize: "0.88rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  Go to Register Page <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div
            id="step-2"
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "0.85rem"
                  }}
                >
                  Step 2
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>Gmail Verification & Welcome Email</h3>
              </div>
              <FaEnvelope style={{ fontSize: "1.3rem", opacity: 0.9 }} />
            </div>

            <div style={{ padding: "28px" }}>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "1.02rem",
                  color: "#334155",
                  lineHeight: 1.6
                }}
              >
                <li>
                  <strong>Verification Email:</strong> User receives a verification email on their registered Gmail address.
                </li>
                <li>
                  <strong>Registration Confirmation:</strong> The email confirms successful registration and welcomes you to LMS.
                </li>
                <li>
                  <strong>Admin Panel Login Link:</strong> An exclusive link to access your dedicated Library Admin Panel is provided inside the email.
                </li>
                <li>
                  <strong>Unique Free Trial Coupon Code:</strong> A special, unique <strong>Coupon Code</strong> is included to claim your <strong>3-Month Free Trial</strong> (requires a nominal ₹1 secure Razorpay verification payment for branch confirmation).
                </li>
              </ol>

              <div
                style={{
                  marginTop: "20px",
                  background: "linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)",
                  border: "1px solid #a7f3d0",
                  borderRadius: "12px",
                  padding: "14px 18px"
                }}
              >
                <strong style={{ color: "#065f46", fontSize: "0.98rem", display: "block", marginBottom: "4px" }}>
                  Special Launch Benefit Included:
                </strong>
                <span style={{ color: "#047857", fontSize: "0.9rem" }}>
                  Save the coupon code from your welcome email. You will use it in Step 5 along with a ₹1 secure Razorpay confirmation to activate your full 3-Month Pro subscription.
                </span>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div
            id="step-3"
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "0.85rem"
                  }}
                >
                  Step 3
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>Account Activation & Password Setup</h3>
              </div>
              <FaKey style={{ fontSize: "1.3rem", opacity: 0.9 }} />
            </div>

            <div style={{ padding: "28px" }}>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "1.02rem",
                  color: "#334155",
                  lineHeight: 1.6
                }}
              >
                <li>
                  <strong>Open Admin Panel Link:</strong> User opens the Admin Panel link received via the welcome email.
                </li>
                <li>
                  <strong>Enter Registered Gmail:</strong> Enters the same registered Gmail address provided during registration.
                </li>
                <li>
                  <strong>Receive Security OTP:</strong> Receives a secure One-Time Password (OTP) on the registered Gmail.
                </li>
                <li>
                  <strong>OTP Verification:</strong> Enters the OTP on screen to verify email ownership.
                </li>
                <li>
                  <strong>Create New Password:</strong> Sets up a strong, secure new password for regular daily dashboard access.
                </li>
              </ol>
            </div>
          </div>

          {/* STEP 4 */}
          <div
            id="step-4"
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "0.85rem"
                  }}
                >
                  Step 4
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>Admin Panel Login</h3>
              </div>
              <FaSignInAlt style={{ fontSize: "1.3rem", opacity: 0.9 }} />
            </div>

            <div style={{ padding: "28px" }}>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "1.02rem",
                  color: "#334155",
                  lineHeight: 1.6
                }}
              >
                <li>
                  <strong>Open Admin Panel:</strong> Visit your branch's admin login portal.
                </li>
                <li>
                  <strong>Enter Gmail Address:</strong> Input your registered Gmail address.
                </li>
                <li>
                  <strong>Enter Password:</strong> Enter the newly created password from Step 3.
                </li>
                <li>
                  <strong>Click Login:</strong> Click the <strong>Login</strong> button.
                </li>
                <li>
                  <strong>Enter Dashboard:</strong> Successfully enter the Library Admin Dashboard command center.
                </li>
              </ol>
            </div>
          </div>

          {/* STEP 5 */}
          <div
            id="step-5"
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "0.85rem"
                  }}
                >
                  Step 5
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>Subscription & Coupon Activation</h3>
              </div>
              <FaTicketAlt style={{ fontSize: "1.3rem", opacity: 0.9 }} />
            </div>

            <div style={{ padding: "28px" }}>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "1.02rem",
                  color: "#334155",
                  lineHeight: 1.6
                }}
              >
                <li>
                  <strong>Open Subscription Section:</strong> From the admin dashboard sidebar, navigate to <strong>Subscription / Plans</strong>.
                </li>
                <li>
                  <strong>Select Plan:</strong> Select an available subscription plan tailored to your library capacity.
                </li>
                <li>
                  <strong>Enter Coupon Code:</strong> Enter the unique Coupon Code received in your welcome Gmail (Step 2).
                </li>
                <li>
                  <strong>Click Apply Coupon:</strong> Apply the code to waive standard subscription charges.
                </li>
                <li>
                  <strong>₹1 Secure Razorpay Confirmation:</strong> Complete a nominal ₹1 secure Razorpay verification payment to authenticate and confirm your genuine library account.
                </li>
                <li>
                  <strong>Activate 3-Month Free Trial:</strong> Instantly unlock 90 days of complete Pro access with multi-shift management and cashier dashboard.
                </li>
                <li>
                  <strong>View Validity:</strong> Confirm your plan status, active features, and expiry date.
                </li>
              </ol>

              <div
                style={{
                  marginTop: "20px",
                  background: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "12px",
                  padding: "16px 20px"
                }}
              >
                <strong style={{ color: "#1e40af", fontSize: "0.96rem", display: "block", marginBottom: "4px" }}>
                  ₹1 Secure Razorpay Account Confirmation:
                </strong>
                <span style={{ color: "#334155", fontSize: "0.9rem", lineHeight: 1.55 }}>
                  Hum account aur branch confirmation ke liye Razorpay secure payment gateway ke zariye sirf nominal ₹1 ka verification payment lete hain. Isse fake ya spam bot registrations roke jaate hain aur aapka real study space turant officially authenticate ho jata hai.
                </span>
              </div>
            </div>
          </div>

          {/* STEP 6 */}
          <div
            id="step-6"
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "0.85rem"
                  }}
                >
                  Step 6
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>Complete Library Setup</h3>
              </div>
              <FaCogs style={{ fontSize: "1.3rem", opacity: 0.9 }} />
            </div>

            <div style={{ padding: "28px" }}>
              <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.6, marginTop: 0, marginBottom: "20px" }}>
                Before admitting students, the library owner configures essential operational settings across three modules:
              </p>

              {/* Table */}
              <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: "12px", marginBottom: "24px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                      <th style={{ padding: "14px 18px", fontWeight: "800", color: "#1e293b", width: "35%" }}>Module</th>
                      <th style={{ padding: "14px 18px", fontWeight: "800", color: "#1e293b" }}>Required Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 18px", fontWeight: "700", color: "#0284c7" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <FaChair /> Seat Management
                        </div>
                      </td>
                      <td style={{ padding: "16px 18px", color: "#334155" }}>
                        Create and configure physical seats, specify floor/room layouts, and mark seat numbers.
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 18px", fontWeight: "700", color: "#059669" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <FaRupeeSign /> Fee Management
                        </div>
                      </td>
                      <td style={{ padding: "16px 18px", color: "#334155" }}>
                        Create and configure monthly, quarterly, or custom fee plans with pricing and one-time registration fees.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "16px 18px", fontWeight: "700", color: "#d97706" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <FaClock /> Shift Management
                        </div>
                      </td>
                      <td style={{ padding: "16px 18px", color: "#334155" }}>
                        Add and configure library operational shifts (e.g., Morning 08:00 AM – 02:00 PM, Evening 02:00 PM – 08:00 PM, Night 08:00 PM – 11:00 PM, Full Day).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                style={{
                  background: "#faf5ff",
                  border: "1px solid #e9d5ff",
                  borderRadius: "12px",
                  padding: "14px 18px",
                  color: "#6b21a8",
                  fontSize: "0.92rem"
                }}
              >
                <span>
                  <strong>Multi-Shift Flexibility:</strong> You can allocate the same physical desk to up to 3 different students across separate shifts to 3x your capacity without expanding your space!
                </span>
              </div>
            </div>
          </div>

          {/* STEP 7 */}
          <div
            id="step-7"
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontWeight: "900",
                    fontSize: "0.85rem"
                  }}
                >
                  Step 7
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>Start Student Admissions</h3>
              </div>
              <FaGraduationCap style={{ fontSize: "1.4rem", opacity: 0.9 }} />
            </div>

            <div style={{ padding: "28px" }}>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "1.02rem",
                  color: "#334155",
                  lineHeight: 1.6
                }}
              >
                <li>
                  <strong>Open Admission Section:</strong> Click on <strong>"Admission"</strong> or the <strong>"Add Student"</strong> quick button on the dashboard.
                </li>
                <li>
                  <strong>Clicks Add Student:</strong> Launch the smart admission form (Manual Admission or QR Code self-registration).
                </li>
                <li>
                  <strong>Enters Student's Details:</strong> Input student's full name, email, mobile number, gender, Aadhar number, and photo.
                </li>
                <li>
                  <strong>Assigns a Seat:</strong> Pick an available seat number from the visual seating grid.
                </li>
                <li>
                  <strong>Selects Shift:</strong> Assign student to Morning, Evening, Night, or Full Day shift.
                </li>
                <li>
                  <strong>Assigns Fee Plan:</strong> Select the applicable fee package and record payment mode (Cash/UPI).
                </li>
                <li>
                  <strong>Submits Admission Form:</strong> Unique Student ID & Registration Number are automatically generated, and an instant WhatsApp confirmation receipt is sent to the student!
                </li>
              </ol>

              {/* Milestone Celebration Box */}
              <div
                style={{
                  marginTop: "24px",
                  background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
                  border: "2px dashed #10b981",
                  borderRadius: "14px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px"
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#10b981",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    flexShrink: 0
                  }}
                >
                  <FaCheckCircle />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px", fontSize: "1.1rem", fontWeight: "900", color: "#065f46" }}>
                    Library Successfully Started!
                  </h4>
                  <p style={{ margin: 0, color: "#047857", fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Your study space is now fully automated. Track real-time attendance, cashier collections, expired plans, and financial profit from your centralized dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* BOTTOM CALL TO ACTION */}
        {/* ========================================================= */}
        <div
          style={{
            marginTop: "60px",
            background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
            borderRadius: "20px",
            padding: "45px 30px",
            textAlign: "center",
            color: "#ffffff",
            boxShadow: "0 18px 45px rgba(2, 132, 199, 0.25)"
          }}
        >
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "4px 14px",
              borderRadius: "16px",
              fontSize: "0.82rem",
              fontWeight: "800",
              textTransform: "uppercase"
            }}
          >
            Start Your Journey Today
          </span>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: "900", margin: "14px 0 12px" }}>
            Ready to Automate Your Study Library?
          </h2>
          <p style={{ maxWidth: "650px", margin: "0 auto 28px", color: "#e0f2fe", fontSize: "1.08rem", lineHeight: 1.6 }}>
            Join hundreds of library owners across India who save 15+ hours weekly with LMS by Study Guru. Register now to claim your 3-Month Free Trial!
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <Link
              to="/register"
              style={{
                background: "#f97316",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: "12px",
                fontWeight: "900",
                fontSize: "1.05rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 6px 18px rgba(249, 115, 22, 0.35)",
                textDecoration: "none"
              }}
            >
              <FaUserPlus /> Register Account Now
            </Link>
            <a
              href="https://wa.me/919934272186?text=Hi%20Study%20Guru%2C%20please%20guide%20me%20through%20library%20registration%20and%20onboarding"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.4)",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "1rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none"
              }}
            >
              <FaWhatsapp style={{ color: "#4ade80" }} /> Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
