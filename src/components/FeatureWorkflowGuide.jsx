import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const feeDashboardImg = "https://res.cloudinary.com/da9xdkqvl/image/upload/v1795535960/fee_mtsf4h.png";
const overviewDashboardImg = "https://res.cloudinary.com/da9xdkqvl/image/upload/v1795535960/overview_xfiypb.png";
const seatsControlImg = "https://res.cloudinary.com/da9xdkqvl/image/upload/v1795535958/Modern_Library_Seats_Control_Dashboard_kb5cew.png";
const attendanceDashboardImg = "https://res.cloudinary.com/da9xdkqvl/image/upload/v1795535958/Modern_Attendance_Dashboard_UI-1_bmhryn.png";
const financeDashboardImg = "https://res.cloudinary.com/da9xdkqvl/image/upload/v1795535957/expences_c1rffz.png";
const admissionFormImg = "https://res.cloudinary.com/da9xdkqvl/image/upload/v1795535954/admission_ivmdds.png";
import {
  FaTh,
  FaThLarge,
  FaUserPlus,
  FaQrcode,
  FaCashRegister,
  FaChartLine,
  FaWhatsapp,
  FaCheckCircle,
  FaLock,
  FaBolt,
  FaSearchPlus,
  FaTimes
} from "react-icons/fa";

const steps = [
    {
      id: "seats",
      icon: <FaTh />,
      title: "Complete Seat Control & Multi-Shift Management",
      shortTitle: "Smart Seat Management",
      subtitle: "Maximize Every Seat, Every Shift.",
      accentColor: "#2563eb",
      accentBg: "#eff6ff",
      badgeColor: "#1d4ed8",
      explanation: {
        intro: "Our Smart Seat Management System makes library seating effortless by providing a centralized dashboard to create, organize, monitor, and manage every seat in your library.",
        subIntro: "With floor-wise and room-wise organization, you can easily track which seats are available, occupied, or inactive. The integrated Multi-Shift Management System allows you to allocate the same physical seat to different students across Morning, Afternoon, and Night shifts, helping you maximize your library's seating capacity without expanding your infrastructure.",
        howItWorks: [
          "Floor & Room Management: Organize your entire library by floors, rooms, and individual seat numbers.",
          "Multi-Shift Seat Allocation: Assign one seat to up to three different students across Morning, Afternoon, and Night shifts.",
          "Real-Time Occupancy Tracking: Monitor total seats, available seats, occupied seats, inactive seats, and occupancy percentage.",
          "Smart Seat Search & Filters: Quickly find seats using seat numbers and filter them by availability status.",
          "Interactive Seat Layout: View every seat visually and identify whether it is vacant, partially booked, fully booked, or inactive.",
          "Student & Seat Tracking: Easily identify which student is assigned to a particular seat and shift."
        ],
        example: {
          title: "Example: How Multi-Shift Works",
          badge: "One Seat – Three Students – Three Shifts",
          shifts: [
            { shift: "Morning", student: "Student A", text: "#1d4ed8" },
            { shift: "Afternoon", student: "Student B", text: "#b45309" },
            { shift: "Night", student: "Student C", text: "#7c3aed" }
          ],
          summary: "3 Students Using 1 Physical Seat",
          note: "Is tarah 4 physical seats ko 3 shifts mein allocate karke 12 student-shift allocations manage kiye ja sakte hain."
        },
        userValue: "Manage your library space smarter with intelligent seat allocation, multi-shift scheduling, and real-time occupancy tracking."
      },
      mockup: {
        url: "lms.studyguru.in/seats",
        status: "Live Seats Control",
        imgSrc: seatsControlImg,
        alt: "Seats Control Dashboard Preview"
      }
    },
    {
      id: "admission",
      icon: <FaUserPlus />,
      title: "Smart Student Admission & Registration System",
      shortTitle: "Smart Admission & Registration",
      subtitle: "Complete Admission Workflow",
      accentColor: "#10b981",
      accentBg: "#ecfdf5",
      badgeColor: "#059669",
      explanation: {
        intro: "Make student onboarding simple, fast, and organized with our Smart Admission Management System. The platform offers two convenient admission methods — Manual Admission and QR Code-Based Admission — giving library administrators the flexibility to register students according to their operational requirements.",
        subIntro: "Whether an administrator enters student information directly or a student submits their personal details through a QR-based admission form, the system keeps the registration process centralized and efficient.",
        howItWorks: [
          "Manual Student Admission: Administrators can register new students by manually filling out the complete admission form, including personal and registration details directly from the dashboard.",
          "QR Code-Based Admission: Students can scan a QR code using their mobile phones and fill out their personal information through an online admission form, reducing manual data entry.",
          "Unique Student ID & Registration Number: Every registered student receives a unique Student ID (e.g. STD00016) and Registration Number for instant identification and future search.",
          "Centralized Admission Management: Manage student registrations from a single dashboard, keeping admission details organized and easily accessible.",
          "Admission Fee Collection: After the student registration process, administrators can collect the applicable admission or registration fee directly through the cashier dashboard.",
          "Smart Seat Allocation: Once the admission and payment process is completed, administrators can assign an available seat to the student according to the library's seating arrangement and selected shift.",
          "Complete Student Onboarding: Manage student registration, unique ID generation, payment collection, and seat allocation through one connected workflow."
        ],
        userValue: "From initial registration to final seat allocation, manage the entire student admission journey through one centralized system. Reduce manual effort, organize student information, and make the onboarding experience smoother for both administrators and students."
      },
      mockup: {
        url: "lms.studyguru.in/admission",
        status: "Live Admission Form",
        imgSrc: admissionFormImg,
        alt: "Smart Student Admission Form (Personal, Admission & Payment Details)"
      }
    },
    {
      id: "attendance",
      icon: <FaQrcode />,
      title: "Dual Attendance Management System",
      shortTitle: "Dual Attendance",
      subtitle: "Complete Attendance Control",
      accentColor: "#0284c7",
      accentBg: "#f0f9ff",
      badgeColor: "#0369a1",
      explanation: {
        intro: "Make student attendance management smarter, faster, and more flexible with our Dual Attendance Management System. The platform offers two convenient attendance methods — QR Code Scanning and Manual Attendance — allowing library administrators to manage student attendance efficiently according to their requirements.",
        subIntro: "Students can mark their attendance by scanning a QR code using their mobile phones, while administrators can also manually record attendance by searching for a student's name, Student ID, or Registration Number. This dual approach ensures a smooth and reliable attendance process.\n\nThe system automatically records Check-In and Check-Out times, eliminating manual time entry and maintaining accurate attendance logs. It also tracks student attendance according to their assigned shifts, making it easier to monitor Morning, Evening, and Night Shift activities, including students enrolled in multiple shifts.",
        howItWorks: [
          "QR Code-Based Attendance: Allow students to mark their attendance instantly by scanning a QR code through their mobile phones for quick, convenient, and efficient entry.",
          "Manual Attendance Management: Administrators can manually mark attendance by searching for students using their name, Student ID, Student Code, or Registration Number.",
          "Automatic Check-In & Check-Out: The system automatically records the exact Check-In and Check-Out time whenever attendance activities are performed, ensuring accurate attendance records without manual time entry.",
          "Multi-Shift Attendance Tracking: Track student attendance according to their assigned shifts, including Morning, Evening, and Night Shifts, plus multiple-shift enrollments.",
          "Real-Time Attendance Status: Monitor student attendance through clear status indicators such as Present and track students currently inside the library using the In Library counter.",
          "Flexible Attendance History & Date Filters: Easily access attendance records using predefined filters such as Today, Yesterday, and Last 30 Days, or select any specific calendar date.",
          "Student-Wise Attendance Search: Quickly find attendance records by searching for a student's name, Student Code, or Registration Number.",
          "30-Day Attendance Record Retention: All attendance records remain available for up to 30 days. Records older than 30 days are automatically cleared to maintain an organized, high-speed database."
        ],
        userValue: "Manage QR attendance, manual attendance, student check-in/check-out times, shift-wise attendance, and historical records from one centralized dashboard. Simplify daily operations while maintaining better visibility and control over your library's attendance activities."
      },
      mockup: {
        url: "lms.studyguru.in/attendance",
        status: "Live Attendance Logs",
        imgSrc: attendanceDashboardImg,
        alt: "Dual Attendance Management Dashboard"
      }
    },
    {
      id: "fee-desk",
      icon: <FaCashRegister />,
      title: "Smart Cashier & Fee Collection Management System",
      shortTitle: "Smart Cashier & Fees",
      subtitle: "Collect Payments. Manage Everything.",
      accentColor: "#ea580c",
      accentBg: "#fff7ed",
      badgeColor: "#c2410c",
      explanation: {
        intro: "Simplify your library's financial operations with our Smart Cashier & Fee Collection System. This centralized payment management solution allows library administrators to collect student fees, manage subscription renewals, process registration payments, and maintain accurate financial records through a single dashboard.",
        subIntro: "The system provides a convenient way to select students, view their membership details, check their active subscription plans, and collect payments according to their selected fee structure.\n\nA smarter way to manage library fees and transactions: collect subscription and registration fees, track UPI transactions, generate automatic invoices, and share payment receipts instantly. Keep every payment organized with a centralized cashier dashboard.",
        howItWorks: [
          "Student-Wise Fee Collection: Search and select students using their name, Student ID, or registration details to view mobile number, assigned seat, current plan, account status, and expiry date before collecting payment.",
          "Subscription Fee Collection: Collect fees according to the student's selected subscription plan with the applicable fee amount and renewal rate displayed automatically.",
          "Registration Fee Collection: Collect one-time registration fees separately from regular subscription payments, keeping membership charges and recurring fees properly organized.",
          "Multiple Payment Modes: Accept and record payments through available payment methods such as Cash and UPI with transparent payment records.",
          "UTR & Reference Tracking: Record the UTR (Unique Transaction Reference) or payment reference number for UPI transactions to verify individual payments and maintain clean accounts.",
          "Automatic Invoice Generation: Generate a unique invoice number automatically for every payment, maintaining professional payment receipts with student details and transaction dates.",
          "Payment Date & Notes: Record payment dates and add optional remarks or notes (such as monthly fee payment, registration charges, or custom notes).",
          "Recent Payment History: View the latest 5 payment transactions directly from the cashier dashboard with student name, amount, invoice number, payment mode, and date.",
          "Invoice Download & Sharing: Download payment invoices, print physical receipts, or share them directly with students through WhatsApp and Gmail for instant documentation.",
          "Student Fee & Validity Tracking: View student subscription status, fee payment status, selected plan, and plan end date while managing renewals seamlessly."
        ],
        userValue: "From student selection and fee collection to UPI reference tracking, invoice generation, and recent payment monitoring, manage your library's entire payment collection process through one organized dashboard."
      },
      mockup: {
        url: "lms.studyguru.in/collect-fee",
        status: "Live Cashier Dashboard",
        imgSrc: feeDashboardImg,
        alt: "Smart Cashier & Fee Collection Dashboard"
      }
    },
    {
      id: "overview",
      icon: <FaThLarge />,
      title: "Complete Library Overview & Member Lifecycle Dashboard",
      shortTitle: "Library Overview Dashboard",
      subtitle: "Real-Time Member Lifecycle & Operations Command Center",
      accentColor: "#6366f1",
      accentBg: "#eef2ff",
      badgeColor: "#4f46e5",
      explanation: {
        intro: "Get a complete overview of your library from one centralized dashboard. Access student statistics and membership information at a glance, helping you track library activity, monitor student status, and manage daily operations more efficiently.",
        subIntro: "The system automatically categorizes every student across their entire lifecycle using intelligent status logic, eliminating confusion and ensuring zero revenue leakage across shifts.",
        howItWorks: [
          "Total Members: Real-time count of all registered students enrolled in your library across all rooms, floors, and shifts.",
          "Active Members (e.g. 10 / 11): Students with active, paid subscriptions who have valid daily access to their assigned desks.",
          "Expire Soon (0–7 Days): Early warning radar flagging students whose plan will expire within 7 days for proactive renewal reminders.",
          "Grace Period (Expired ≤ 10 Days): Lapsed memberships given a temporary 10-day buffer to clear dues while their seat remains reserved.",
          "Suspended Members (11–20 Days Unpaid): Students overdue past the 10-day grace period whose portal access is frozen and seats flagged for reallocation.",
          "Today's Attendance: Live real-time counter showing exact check-in numbers and active students currently present in the study hall.",
          "Quick Actions Hub: One-click shortcuts to Students list, Add Student enrollment, visual Seat Layout, and Cashier Fee Collection."
        ],
        userValue: "Eliminate guesswork and fee leakage. Instantly see student health, daily attendance, and operational status from one clean, automated dashboard."
      },
      mockup: {
        url: "lms.studyguru.in/dashboard",
        status: "Live Overview Dashboard",
        imgSrc: overviewDashboardImg,
        alt: "Complete Library Overview Dashboard"
      }
    },
    {
      id: "expenses",
      icon: <FaChartLine />,
      title: "Smart Financial Management & Expense Tracking System",
      shortTitle: "Finance & Expense Tracking",
      subtitle: "Complete Financial Control",
      accentColor: "#9333ea",
      accentBg: "#faf5ff",
      badgeColor: "#7e22ce",
      explanation: {
        intro: "Manage your library's complete financial activities with our Smart Financial Management System. Get a clear picture of your library's financial performance by tracking total revenue, managing daily expenses, calculating overall profit, and reviewing detailed financial reports through one centralized dashboard.",
        subIntro: "The system helps library owners understand how much money their library generates, how much is spent on daily operations, and how much profit remains after expenses.",
        howItWorks: [
          "Total Revenue Tracking: Monitor the total revenue collected from student payments, including subscription fees, registration fees, and other recorded payments for any selected period.",
          "Total Expense Management: Add and manage library operating expenses directly from the dashboard with category, description, date, and amount.",
          "Automatic Profit Calculation: View your library's total revenue, total expenses, and calculated profit in one place without manual calculations.",
          "Category-Wise Expense Tracking: Organize expenses into categories (Rent, Electricity, Internet, Maintenance, Other Expenses) and view percentage contributions to overall running costs.",
          "Monthly Revenue Analysis: Visualize month-wise revenue through interactive graphical bar charts to identify peak-revenue months and collection trends.",
          "Monthly & Yearly Financial Reports: Access financial reports across flexible reporting periods: Last 1 Month, Last 3 Months, Last 6 Months, Last 1 Year, and Full Year Reports.",
          "Custom Financial Period Filtering: Select a specific starting year, month, ending year, and month to generate tailored financial reports.",
          "Expense Transaction History: Maintain a detailed transaction log containing expense categories, descriptions, transaction dates, and amounts for complete audit control.",
          "Recent Payment & Invoice Management: Access payment records and their corresponding invoices. Download, print, and share payment invoices through WhatsApp and Gmail.",
          "Visual Financial Overview: Understand library performance through organized summary cards, revenue charts, expense breakdowns, and detailed transaction records."
        ],
        userValue: "From tracking student fee collections to managing operational expenses, analyzing monthly revenue, and calculating overall profit, manage your library's complete financial activities through one powerful dashboard."
      },
      mockup: {
        url: "lms.studyguru.in/finance",
        status: "Live Financial Engine",
        imgSrc: financeDashboardImg,
        alt: "Smart Financial Management & Expense Tracking Dashboard"
      }
    }
  ];

export default function FeatureWorkflowGuide() {
  const location = useLocation();

  const getInitialStep = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const stepParam = params.get("step");
      if (stepParam) {
        const foundIdx = steps.findIndex((s) => s.id === stepParam);
        if (foundIdx !== -1) return foundIdx;
      }
    }
    return 0;
  };

  const [activeStep, setActiveStep] = useState(getInitialStep);
  const [zoomImg, setZoomImg] = useState(null);
  const currentStep = steps[activeStep] || steps[0];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setZoomImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectStep = (idx) => {
    if (idx < 0 || idx >= steps.length) return;
    setActiveStep(idx);
    const targetStep = steps[idx];
    if (targetStep && window.history?.replaceState) {
      try {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("step", targetStep.id);
        currentUrl.hash = "workflow-guide";
        window.history.replaceState(null, "", currentUrl.toString());
      } catch {
        window.history.replaceState(null, "", `/features?step=${targetStep.id}#workflow-guide`);
      }
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const stepParam = params.get("step");
    if (stepParam) {
      const foundIdx = steps.findIndex((s) => s.id === stepParam);
      if (foundIdx !== -1) {
        setActiveStep(foundIdx);
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (location.hash === "#workflow-guide") {
      const el = document.getElementById("workflow-guide");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 120);
      }
    }
  }, [location.pathname, location.search, location.hash]);

  return (
    <section id="workflow-guide" style={{ padding: "60px 0 80px", background: "#ffffff" }}>
      <div className="container" style={{ maxWidth: "1150px" }}>
        
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto 40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#eff6ff",
              color: "#0284c7",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "800",
              marginBottom: "14px",
              border: "1px solid #bfdbfe"
            }}
          >
            <FaBolt style={{ color: "#f97316" }} /> 100% Practical Workflow Guide
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: "900", color: "#0f172a", lineHeight: 1.15, marginBottom: "16px" }}>
            See How LMS by Study Guru <span style={{ color: "#0284c7" }}>Automates Your Study Space</span>
          </h2>
          <p style={{ color: "#475569", fontSize: "1.08rem", lineHeight: 1.6 }}>
            Explore every core function of your study library—seat allocation, student admission, QR attendance scanning, cashier billing desk, WhatsApp receipts, and financial profit analytics—with interactive live screen previews.
          </p>
        </div>

        {/* Workflow Steps Horizontal Tab Switcher */}
        <div
          className="workflow-tabs-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "10px",
            marginBottom: "36px"
          }}
        >
          {steps.map((st, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                type="button"
                key={st.id}
                onClick={() => handleSelectStep(idx)}
                style={{
                  background: isSelected ? "#0284c7" : "#f8fafc",
                  color: isSelected ? "#ffffff" : "#475569",
                  border: isSelected ? "2px solid #0284c7" : "1px solid #e2e8f0",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  boxShadow: isSelected ? "0 8px 20px rgba(2, 132, 199, 0.25)" : "none",
                  transform: isSelected ? "translateY(-2px)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span style={{ fontSize: "16px", color: isSelected ? "#ffffff" : st.accentColor, display: "flex", alignItems: "center", flexShrink: 0 }}>
                  {st.icon}
                </span>
                <span style={{ fontWeight: "800", fontSize: "0.85rem", lineHeight: 1.25 }}>
                  {st.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* ACTIVE STEP FEATURE SHOWCASE CARD (SCREEN IMAGE MOCKUP + DETAILED EXPLANATION) */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
            marginBottom: "60px"
          }}
        >
          {/* Card Top Title Bar */}
          <div
            style={{
              padding: "20px 28px",
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: currentStep.accentColor,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem"
                }}
              >
                {currentStep.icon}
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.15)", color: "#fed7aa", padding: "2px 8px", borderRadius: "10px", fontWeight: "800" }}>
                  LMS MODULE
                </span>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "900", color: "#ffffff", margin: "4px 0 0" }}>
                  {currentStep.title}
                </h3>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => handleSelectStep(Math.max(0, activeStep - 1))}
                style={{
                  background: activeStep === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: activeStep === 0 ? "not-allowed" : "pointer",
                  fontSize: "0.8rem",
                  fontWeight: "700"
                }}
              >
                &larr; Previous
              </button>
              <button
                type="button"
                disabled={activeStep === steps.length - 1}
                onClick={() => handleSelectStep(Math.min(steps.length - 1, activeStep + 1))}
                style={{
                  background: activeStep === steps.length - 1 ? "rgba(255,255,255,0.1)" : "#f97316",
                  color: "#ffffff",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: activeStep === steps.length - 1 ? "not-allowed" : "pointer",
                  fontSize: "0.8rem",
                  fontWeight: "800"
                }}
              >
                Next &rarr;
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="workflow-card-body" style={{ padding: "36px 30px" }}>
            
            {/* Top Intro Section */}
            <div style={{ maxWidth: "860px", margin: "0 auto 32px", textAlign: "center" }}>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  color: currentStep.accentColor,
                  letterSpacing: "0.06em",
                  marginBottom: "8px"
                }}
              >
                {currentStep.subtitle}
              </div>

              <p style={{ color: "#0f172a", fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "12px", fontWeight: "700" }}>
                {currentStep.explanation.intro}
              </p>

              {currentStep.explanation.subIntro && (
                <div style={{ color: "#475569", fontSize: "0.95rem", lineHeight: 1.65, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {currentStep.explanation.subIntro.split("\n\n").map((para, pIdx) => (
                    <p key={pIdx} style={{ margin: 0 }}>{para}</p>
                  ))}
                </div>
              )}
            </div>

            {/* =========================================================================
                REALISTIC LAPTOP COMPUTER SHOWCASE (Laptop frame on desktop, clean image on mobile)
                ========================================================================= */}
            <div style={{ maxWidth: "1020px", margin: "0 auto 44px", padding: "0 10px" }}>
              <div className="laptop-mockup workflow-laptop-mockup">
                <div className="laptop-screen-bezel workflow-screen-bezel">
                  
                  {/* Laptop Top Camera & Bezel */}
                  <div className="laptop-camera-bar">
                    <div className="laptop-camera-dot"></div>
                  </div>

                  {/* Laptop Browser Header Bar */}
                  <div className="laptop-browser-bar">
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b", display: "inline-block" }}></span>
                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                    </div>

                    <div style={{
                      background: "#ffffff",
                      padding: "4px 16px",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "0.75rem",
                      color: "#334155",
                      fontWeight: "700"
                    }}>
                      <FaLock style={{ color: "#10b981", fontSize: "10px" }} />
                      <span>{currentStep.mockup.url}</span>
                      <span style={{ color: "#94a3b8", fontSize: "0.68rem" }}>• SSL Secure</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.72rem", color: "#059669", fontWeight: "800" }}>
                      <span className="pulse-dot-green"></span>
                      <span>{currentStep.mockup.status}</span>
                    </div>
                  </div>

                  {/* Screen Image Body (Crisp, High-Quality 1:1 Rendering with Click to Zoom) */}
                  <div
                    className="workflow-screen-image-wrap"
                    style={{
                      position: "relative",
                      background: "#ffffff",
                      overflow: "hidden",
                      cursor: "zoom-in"
                    }}
                    onClick={() => setZoomImg(currentStep.mockup.imgSrc)}
                    title="Click to view full HD screenshot"
                  >
                    <img
                      src={currentStep.mockup.imgSrc}
                      alt={currentStep.mockup.alt}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        imageRendering: "-webkit-optimize-contrast",
                        filter: "contrast(101.5%) brightness(100.5%)"
                      }}
                    />

                    {/* Floating Zoom Badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "16px",
                        right: "16px",
                        background: "rgba(15, 23, 42, 0.85)",
                        color: "#ffffff",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        backdropFilter: "blur(6px)",
                        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.15)"
                      }}
                    >
                      <FaSearchPlus /> <span>Click to View Full HD</span>
                    </div>
                  </div>
                </div>

                {/* Laptop Base Chassis with Opening Notch */}
                <div className="laptop-base-chassis">
                  <div className="laptop-base-notch"></div>
                </div>
              </div>

              <div style={{ textAlign: "center", marginTop: "14px", fontSize: "0.78rem", color: "#64748b", fontWeight: "600" }}>
                Live System Screenshot • 100% High-Resolution Preview • Click screen anytime to inspect full HD details
              </div>
            </div>

            {/* Detailed Feature Breakdown & Operational Benefits (Below Computer) */}
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: "18px",
                  border: "1px solid #e2e8f0",
                  padding: "28px"
                }}
              >
                <h4 style={{ fontSize: "1rem", fontWeight: "900", color: "#0f172a", marginBottom: "18px", textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FaBolt style={{ color: currentStep.accentColor }} />
                  {currentStep.id === "seats" ? "Key Capabilities:" : "Key Features & Operational Capabilities:"}
                </h4>

                <div
                  className="workflow-capabilities-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "14px",
                    marginBottom: "24px"
                  }}
                >
                  {currentStep.explanation.howItWorks.map((point, pIdx) => {
                    const [head, ...rest] = point.split(":");
                    return (
                      <div
                        key={pIdx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                          fontSize: "0.92rem",
                          lineHeight: 1.55,
                          background: "#ffffff",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0"
                        }}
                      >
                        <span style={{ color: "#10b981", marginTop: "3px", flexShrink: 0, fontSize: "15px" }}>
                          <FaCheckCircle />
                        </span>
                        <div>
                          <strong style={{ color: "#0f172a" }}>{head}:</strong> {rest.join(":")}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Example box if present (e.g. multi-shift) */}
                {currentStep.explanation.example && (
                  <div style={{
                    background: "linear-gradient(135deg, #eff6ff 0%, #ecfdf5 100%)",
                    border: "1.5px solid #bfdbfe",
                    borderRadius: "14px",
                    padding: "18px 20px",
                    marginBottom: "24px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ fontWeight: "900", color: "#1e3a8a", fontSize: "0.95rem" }}>
                        {currentStep.explanation.example.title}
                      </div>
                      <span style={{ fontSize: "0.75rem", background: "#2563eb", color: "#ffffff", padding: "4px 12px", borderRadius: "12px", fontWeight: "800" }}>
                        {currentStep.explanation.example.badge}
                      </span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "12px" }}>
                      {currentStep.explanation.example.shifts.map((s, sIdx) => (
                        <div key={sIdx} style={{ background: "#ffffff", padding: "12px 8px", borderRadius: "10px", border: "1px solid #cbd5e1", textAlign: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                          <div style={{ fontSize: "0.75rem", fontWeight: "800", color: s.text, textTransform: "uppercase", marginBottom: "4px" }}>
                            {s.shift}
                          </div>
                          <div style={{ fontSize: "0.95rem", fontWeight: "900", color: "#0f172a" }}>
                            {s.student}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ fontSize: "0.88rem", fontWeight: "800", color: "#047857", marginBottom: "4px" }}>
                      {currentStep.explanation.example.summary}
                    </div>
                    <div style={{ fontSize: "0.84rem", color: "#475569", lineHeight: 1.5 }}>
                      {currentStep.explanation.example.note}
                    </div>
                  </div>
                )}

                {/* Library Owner Benefit Box */}
                <div
                  style={{
                    background: "#f0f9ff",
                    borderLeft: `4px solid ${currentStep.accentColor}`,
                    padding: "16px 20px",
                    borderRadius: "0 12px 12px 0",
                    fontSize: "0.92rem",
                    color: "#0369a1",
                    fontWeight: "700",
                    marginBottom: "24px"
                  }}
                >
                  <strong>Library Owner Benefit:</strong> {currentStep.explanation.userValue}
                </div>

                {/* Bottom CTA Row */}
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", alignItems: "center" }}>
                  <Link to="/register" className="btn-primary" style={{ padding: "12px 24px", fontSize: "0.92rem" }}>
                    <FaUserPlus /> Register Your Library Free
                  </Link>
                  <a
                    href="https://wa.me/919142025447?text=Hi%20Software%20Native,%20I%20want%20to%20see%20features%20demo%20of%20LMS%20Cloud."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                    style={{ padding: "12px 22px", fontSize: "0.92rem" }}
                  >
                    <FaWhatsapp style={{ fontSize: "18px" }} /> WhatsApp Helpline
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FULLSCREEN HD LIGHTBOX MODAL */}
        {zoomImg && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(15, 23, 42, 0.93)",
              zIndex: 99999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              backdropFilter: "blur(8px)"
            }}
            onClick={() => setZoomImg(null)}
          >
            <div
              style={{
                position: "relative",
                width: "96vw",
                maxWidth: "1200px",
                maxHeight: "92vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "12px",
                  color: "#ffffff"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.95rem", fontWeight: "800", color: "#f8fafc" }}>
                  <span>Full High-Resolution System Screenshot</span>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomImg(null)}
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "#ffffff",
                    padding: "8px 18px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "800",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.85rem"
                  }}
                >
                  <FaTimes /> Close (ESC)
                </button>
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 25px 65px rgba(0, 0, 0, 0.6)",
                  maxHeight: "84vh",
                  overflowY: "auto",
                  background: "#ffffff",
                  width: "100%"
                }}
              >
                <img
                  src={zoomImg}
                  alt="Full HD System Screenshot"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    imageRendering: "-webkit-optimize-contrast"
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            COMPLETE SYSTEM COMPARISON TABLE: PAPER REGISTERS VS LMS BY STUDY GURU
            ========================================================================= */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: "18px",
            border: "1px solid #e2e8f0",
            padding: "36px 28px",
            marginBottom: "50px"
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 32px" }}>
            <span style={{ fontSize: "0.8rem", color: "#f97316", fontWeight: "800", textTransform: "uppercase" }}>
              Direct Comparison
            </span>
            <h3 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0f172a", marginTop: "4px" }}>
              Paper Register vs LMS by Study Guru
            </h3>
            <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
              Why modern study libraries replace paper registers with LMS by Study Guru
            </p>
          </div>

          <div className="comparison-table-wrap" style={{ overflowX: "auto" }}>
            <table className="comparison-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#ffffff", borderBottom: "2px solid #cbd5e1" }}>
                  <th style={{ padding: "14px 16px", color: "#0f172a", fontWeight: "900" }}>Library Operations</th>
                  <th style={{ padding: "14px 16px", color: "#dc2626", fontWeight: "900", background: "#fef2f2" }}>Traditional Paper Register</th>
                  <th style={{ padding: "14px 16px", color: "#059669", fontWeight: "900", background: "#ecfdf5" }}>LMS by Study Guru</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { op: "Seat Allocation & Shifts", old: "Double booking disputes; same desk assigned to multiple students.", lms: "Visual seat matrix; Morning, Afternoon, Evening, and Night managed separately." },
                  { op: "Student Admissions", old: "5-minute manual paper forms; risk of lost or damaged paper registers.", lms: "30-second digital admission + instant auto-generated QR Student ID Card." },
                  { op: "Gate Attendance", old: "Long queues for register signatures; high risk of fake proxy attendance.", lms: "Tablet QR scanner; students scan in under 0.4 seconds to log verified entry." },
                  { op: "Monthly Fee Collection", old: "Manual paper receipt books; difficult to track cash collections.", lms: "Instant Cash/UPI billing + 1-click official PDF invoice sent on WhatsApp." },
                  { op: "Due Reminders & Renewals", old: "Manually flipping through registers to check unpaid student validities.", lms: "Automated polite WhatsApp renewal reminders sent 3 days before expiry." },
                  { op: "Daily Cash & Profit Tracking", old: "Cash leakage risks; stressful month-end calculations and disputes.", lms: "Automated daily counter cash closing + real-time net profit analytics." }
                ].map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: "1px solid #e2e8f0", background: rIdx % 2 === 0 ? "#ffffff" : "#f8fafc" }}>
                    <td style={{ padding: "14px 16px", fontWeight: "800", color: "#0f172a" }}>{row.op}</td>
                    <td style={{ padding: "14px 16px", color: "#b91c1c", background: "rgba(254, 242, 242, 0.5)" }}>{row.old}</td>
                    <td style={{ padding: "14px 16px", color: "#047857", fontWeight: "600", background: "rgba(236, 253, 245, 0.5)" }}>{row.lms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Help & Free Registration Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
            color: "#ffffff",
            padding: "36px",
            borderRadius: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            boxShadow: "0 12px 30px rgba(2, 132, 199, 0.25)"
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.6rem", fontWeight: "900", color: "#ffffff", marginBottom: "6px" }}>
              Modernize Your Study Library Today
            </h3>
            <p style={{ color: "#e0f2fe", fontSize: "0.95rem", margin: 0, maxWidth: "620px" }}>
              First Three Months Pro Subscription Free * • Instant verification • Fast 15-minute onboarding setup.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              to="/register"
              style={{
                background: "#f97316",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "10px",
                fontWeight: "900",
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 14px rgba(249, 115, 22, 0.4)"
              }}
            >
              <FaUserPlus /> Register Your Library
            </Link>
            <a
              href="https://wa.me/919142025447?text=Hi%20Software%20Native,%20I%20want%20to%20see%20features%20demo%20of%20LMS%20Cloud."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#ffffff",
                color: "#0369a1",
                padding: "12px 22px",
                borderRadius: "10px",
                fontWeight: "800",
                fontSize: "0.95rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <FaWhatsapp style={{ color: "#22c55e", fontSize: "18px" }} /> WhatsApp Helpline
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

