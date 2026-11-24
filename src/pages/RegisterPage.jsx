import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaWhatsapp,
  FaCamera,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaPrint
} from "react-icons/fa";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    ownerName: "",
    libraryName: "",
    gmail: "",
    phone: "",
    addressLine: "",
    cityName: "",
    stateName: "Uttar Pradesh",
    pincode: "",
    capacity: "50",
    description: ""
  });

  // Library photo
  const [libraryPhoto, setLibraryPhoto] = useState(null);
  const [libraryPhotoPreview, setLibraryPhotoPreview] = useState(null);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverNotice, setServerNotice] = useState("");
  const [regId, setRegId] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");

  const photoInputRef = useRef(null);

  // Handle library image upload & live preview
  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Photo size must be less than 10MB");
      return;
    }

    setLibraryPhoto(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setLibraryPhotoPreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setLibraryPhoto(null);
    setLibraryPhotoPreview(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerNotice("");

    // 1. Owner Name constraint
    const cleanOwner = formData.ownerName.trim();
    if (!cleanOwner || cleanOwner.length < 2) {
      alert("Please enter Owner Name (at least 2 characters).");
      return;
    }
    if (!/^[a-zA-Z\s.]+$/.test(cleanOwner)) {
      alert("Owner Name should only contain letters and spaces.");
      return;
    }
    if (cleanOwner.length > 60) {
      alert("Owner Name cannot exceed 60 characters.");
      return;
    }

    // 2. Library Name constraint
    const cleanLib = formData.libraryName.trim();
    if (!cleanLib || cleanLib.length < 2) {
      alert("Please enter Library Name (at least 2 characters).");
      return;
    }
    if (cleanLib.length > 80) {
      alert("Library Name cannot exceed 80 characters.");
      return;
    }

    // 3. Gmail ID constraint
    const cleanGmail = formData.gmail.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanGmail || !emailRegex.test(cleanGmail)) {
      alert("Please provide a valid Gmail ID / Email address (e.g. yourname@gmail.com).");
      return;
    }
    if (cleanGmail.length > 80) {
      alert("Gmail ID cannot exceed 80 characters.");
      return;
    }

    // 4. WhatsApp / Calling Mobile constraint
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length !== 10) {
      alert("Please provide a valid 10-digit WhatsApp / calling mobile number.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      alert("Mobile number must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.");
      return;
    }

    // 5. Premises Address constraint (optional)
    if (formData.addressLine && formData.addressLine.trim().length > 120) {
      alert("Premises address cannot exceed 120 characters.");
      return;
    }

    // 6. City Name constraint
    const cleanCity = formData.cityName.trim();
    if (!cleanCity || cleanCity.length < 2) {
      alert("Please enter City Name (at least 2 characters).");
      return;
    }
    if (!/^[a-zA-Z\s.-]+$/.test(cleanCity)) {
      alert("City Name should only contain alphabetic letters and spaces.");
      return;
    }
    if (cleanCity.length > 50) {
      alert("City Name cannot exceed 50 characters.");
      return;
    }

    // 7. State Name constraint
    if (!formData.stateName || !INDIAN_STATES.includes(formData.stateName)) {
      alert("Please select a valid State from the list.");
      return;
    }

    // 8. Pincode constraint (6 digits Indian postal code, cannot start with 0)
    const cleanPin = formData.pincode.replace(/\D/g, "");
    if (!cleanPin || cleanPin.length !== 6 || !/^[1-9]\d{5}$/.test(cleanPin)) {
      alert("Please enter a valid 6-digit Indian Postal Pincode (starts with 1-9).");
      return;
    }

    // 9. Description constraint (optional, max 1000 characters)
    if (formData.description && formData.description.length > 1000) {
      alert("Description cannot exceed 1000 characters.");
      return;
    }

    // 10. Confirmation checkbox
    if (!agreeTerms) {
      alert("Please tick the confirmation checkbox to complete registration.");
      return;
    }

    setIsSubmitting(true);

    const uniqueId = `LMS-REG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowTime = new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    const fullAddress = [formData.addressLine, formData.stateName, formData.pincode].filter(Boolean).join(", ");
    const capacitySeats = 50; // Fixed at 50 seats for the Free plan

    // Payload for libraryregister collection
    // Note: Library Photo and Description are omitted (not saved) as requested
    // Note: Password is not collected from user and stored as null
    const payload = {
      libraryName: cleanLib,
      address: fullAddress || formData.addressLine || "",
      city: cleanCity || "Noida",
      phone: cleanPhone,
      quota: capacitySeats,
      activeStudentsLimit: capacitySeats,
      ownerName: cleanOwner,
      email: cleanGmail,
      tier: "FREE"
    };

    let assignedId = uniqueId;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (result.id) {
          assignedId = `LMS-REG-${result.id}`;
        }
        setServerNotice("Registration saved to libraryregister collection successfully!");
      } else {
        console.warn("Backend registration response:", result.message);
        if (result.message) {
          setServerNotice(result.message);
        }
      }
    } catch (err) {
      console.warn("API request failed (server might be offline or starting):", err);
      setServerNotice("Note: Server is offline or starting. Application recorded locally.");
    } finally {
      setIsSubmitting(false);
    }

    setRegId(assignedId);
    setSubmissionDate(nowTime);

    // Save registration acknowledgment locally without photo and without description
    const registrationRecord = {
      regId: assignedId,
      submittedAt: nowTime,
      ownerName: cleanOwner,
      libraryName: cleanLib,
      email: cleanGmail,
      phone: cleanPhone,
      city: cleanCity,
      state: formData.stateName,
      pincode: cleanPin,
      capacity: "50",
      activeStudentsLimit: capacitySeats
    };

    try {
      localStorage.setItem("lms_registered_library", JSON.stringify(registrationRecord));
    } catch (err) {
      console.log("Local storage save error:", err);
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `🏛️ *NEW LIBRARY REGISTRATION APPLICATION*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `*Application ID:* ${regId}\n` +
      `*Date:* ${submissionDate}\n\n` +
      `👤 *Owner Name:* ${formData.ownerName}\n` +
      `📚 *Library Name:* ${formData.libraryName}\n` +
      `📧 *Gmail ID:* ${formData.gmail}\n` +
      `📞 *WhatsApp:* ${formData.phone}\n` +
      `\n📍 *ADDRESS DETAILS:*\n` +
      (formData.addressLine ? `• Address: ${formData.addressLine}\n` : "") +
      `• City: ${formData.cityName}\n` +
      `• State: ${formData.stateName}\n` +
      `• Pincode: ${formData.pincode}\n` +
      `\n🪑 *STUDENT CAPACITY:* 50 Students (Free Plan)\n` +
      `📸 *Library Photo:* ${libraryPhoto ? libraryPhoto.name : "Attached / Selected"}\n` +
      (formData.description.trim() ? `\n📝 *Description:*\n${formData.description}\n` : "") +
      `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Please review and activate my library portal credentials!`
    );
    window.open(`https://wa.me/919142025447?text=${text}`, "_blank");
  };

  return (
    <div style={{ paddingBottom: "90px", background: "var(--bg-page)", minHeight: "100vh" }}>
      {/* Header Banner */}
      <section style={{
        padding: "60px 0 36px",
        textAlign: "center",
        background: "radial-gradient(circle at 50% 0%, #eff6ff 0%, #ffffff 80%)",
        borderBottom: "1px solid var(--border-subtle)"
      }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.6rem)", lineHeight: 1.18, marginBottom: "16px", color: "#0f172a" }}>
            Register Your Library With <span className="gradient-blue">LMS by Study Guru</span>
          </h1>
          <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "760px", margin: "0 auto" }}>
            Get verified and onboard your study space in under 30 minutes. Manage seats, attendance, QR self-checkin, and automated fee receipts seamlessly.
          </p>

          {/* Highlights Row */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap",
            marginTop: "24px",
            fontSize: "0.88rem",
            fontWeight: "700",
            color: "#0f172a"
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#059669" }}>
              <FaCheckCircle /> 100% Free Initial Registration
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#2563eb" }}>
              <FaCheckCircle /> First Three Months Pro Subscription Free *
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#d97706" }}>
              <FaClock /> Fast 30-Min Support Onboarding
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section style={{ padding: "40px 0" }}>
        <div className="container" style={{ maxWidth: "980px" }}>
          {!submitted ? (
            <div className="white-card" style={{ padding: "clamp(24px, 4vw, 44px)", borderTop: "5px solid #2563eb" }}>
              {/* Form Title & Guide */}
              <div style={{ marginBottom: "32px", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "20px" }}>
                <h2 style={{ fontSize: "1.7rem", color: "#0f172a", marginBottom: "6px" }}>
                  Library Registration Form
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.92rem" }}>
                  Please fill in the official details of your study library or reading room below.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* ========================================================= */}
                {/* SECTION 1: OWNER & LIBRARY CORE IDENTITY */}
                {/* ========================================================= */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: "#eff6ff", color: "#2563eb",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "800", fontSize: "14px"
                    }}>
                      1
                    </div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a" }}>
                      Owner & Library Details
                    </h3>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "18px" }}>
                    {/* Owner Name */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                        Owner Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <FaUser style={{ position: "absolute", left: "14px", top: "14px", color: "#94a3b8", fontSize: "14px" }} />
                        <input
                          type="text"
                          required
                          minLength={2}
                          maxLength={60}
                          value={formData.ownerName}
                          onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                          placeholder="e.g. Ramesh Patel"
                          style={{
                            width: "100%",
                            padding: "12px 14px 12px 40px",
                            borderRadius: "12px",
                            border: "1.5px solid var(--border-medium)",
                            fontSize: "0.94rem",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>

                    {/* Library Name */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                        Library Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <FaBuilding style={{ position: "absolute", left: "14px", top: "14px", color: "#94a3b8", fontSize: "14px" }} />
                        <input
                          type="text"
                          required
                          minLength={2}
                          maxLength={80}
                          value={formData.libraryName}
                          onChange={(e) => setFormData({ ...formData, libraryName: e.target.value })}
                          placeholder="e.g. Apex Digital Study Library"
                          style={{
                            width: "100%",
                            padding: "12px 14px 12px 40px",
                            borderRadius: "12px",
                            border: "1.5px solid var(--border-medium)",
                            fontSize: "0.94rem",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>

                    {/* Gmail ID */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                        Gmail ID <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <FaEnvelope style={{ position: "absolute", left: "14px", top: "14px", color: "#94a3b8", fontSize: "14px" }} />
                        <input
                          type="email"
                          required
                          maxLength={80}
                          value={formData.gmail}
                          onChange={(e) => setFormData({ ...formData, gmail: e.target.value.trim() })}
                          placeholder="yourlibrary@gmail.com"
                          style={{
                            width: "100%",
                            padding: "12px 14px 12px 40px",
                            borderRadius: "12px",
                            border: "1.5px solid var(--border-medium)",
                            fontSize: "0.94rem",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>

                    {/* WhatsApp Mobile */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                        WhatsApp Number <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <FaWhatsapp style={{ position: "absolute", left: "14px", top: "14px", color: "#10b981", fontSize: "16px" }} />
                        <input
                          type="tel"
                          required
                          inputMode="numeric"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                          placeholder="9876543210 (10 digits)"
                          style={{
                            width: "100%",
                            padding: "12px 14px 12px 42px",
                            borderRadius: "12px",
                            border: "1.5px solid var(--border-medium)",
                            fontSize: "0.94rem",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* SECTION 2: ADDRESS DETAILS */}
                {/* ========================================================= */}
                <div style={{ paddingTop: "10px", borderTop: "1px dashed var(--border-subtle)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: "#fef2f2", color: "#ef4444",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "800", fontSize: "14px"
                    }}>
                      2
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a" }}>
                        Address Details
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        City Name, State Name, and Pincode
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {/* Street Address */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                        Premises Address / Landmark
                      </label>
                      <input
                        type="text"
                        maxLength={120}
                        value={formData.addressLine}
                        onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                        placeholder="e.g. 2nd Floor, Above HDFC Bank, Main Market Road"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: "1.5px solid var(--border-medium)",
                          fontSize: "0.94rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    {/* City, State, Pincode Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                      {/* City Name */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                          City Name <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <FaMapMarkerAlt style={{ position: "absolute", left: "14px", top: "14px", color: "#ef4444", fontSize: "14px" }} />
                          <input
                            type="text"
                            required
                            minLength={2}
                            maxLength={50}
                            value={formData.cityName}
                            onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                            placeholder="e.g. Jaipur / Lucknow"
                            style={{
                              width: "100%",
                              padding: "12px 14px 12px 38px",
                              borderRadius: "12px",
                              border: "1.5px solid var(--border-medium)",
                              fontSize: "0.94rem",
                              outline: "none"
                            }}
                          />
                        </div>
                      </div>

                      {/* State Name */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                          State Name <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <select
                          value={formData.stateName}
                          onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: "1.5px solid var(--border-medium)",
                            fontSize: "0.94rem",
                            outline: "none",
                            background: "#ffffff"
                          }}
                        >
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>

                      {/* Pincode */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "700", marginBottom: "6px", color: "#0f172a" }}>
                          Pincode <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          inputMode="numeric"
                          maxLength={6}
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                          placeholder="e.g. 302015"
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: "1.5px solid var(--border-medium)",
                            fontSize: "0.94rem",
                            outline: "none"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* SECTION 3: CLEAR PICTURE OF THE LIBRARY */}
                {/* ========================================================= */}
                <div style={{ paddingTop: "10px", borderTop: "1px dashed var(--border-subtle)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: "#fffbeb", color: "#d97706",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: "800", fontSize: "14px"
                    }}>
                      3
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a" }}>
                        Clear Picture of the Library
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                        Upload a clear photo of your library's front entrance, reception counter, study hall or <b>banner</b>
                      </p>
                    </div>
                  </div>

                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                  />

                  {!libraryPhotoPreview ? (
                    <div
                      onClick={() => photoInputRef.current && photoInputRef.current.click()}
                      style={{
                        border: "2px dashed #cbd5e1",
                        borderRadius: "16px",
                        padding: "36px 20px",
                        textAlign: "center",
                        background: "#f8fafc",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.borderColor = "#2563eb")}
                      onMouseOut={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
                    >
                      <div style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "#eff6ff",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        margin: "0 auto 12px"
                      }}>
                        <FaCamera />
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>
                        Click to Upload Library Photo
                      </div>
                      <p style={{ color: "#64748b", fontSize: "0.82rem", maxWidth: "420px", margin: "0 auto" }}>
                        Supports JPG, PNG, WEBP (Maximum 10MB). High-resolution photo helps verify your study space faster.
                      </p>
                    </div>
                  ) : (
                    <div style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "2px solid #10b981",
                      background: "#0f172a",
                      position: "relative",
                      maxWidth: "460px",
                      margin: "0 auto"
                    }}>
                      <img
                        src={libraryPhotoPreview}
                        alt="Library Front Preview"
                        style={{ width: "100%", maxHeight: "260px", objectFit: "cover", display: "block" }}
                      />
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: "10px 14px",
                        background: "rgba(15, 23, 42, 0.85)",
                        backdropFilter: "blur(6px)",
                        color: "#ffffff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.82rem"
                      }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#86efac" }}>
                          <FaCheckCircle /> Picture Ready ({libraryPhoto.name.substring(0, 20)}...)
                        </span>
                        <button
                          type="button"
                          onClick={removePhoto}
                          style={{
                            background: "#ef4444",
                            color: "#ffffff",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "0.75rem",
                            fontWeight: "700"
                          }}
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* ========================================================= */}
                {/* SECTION 4: LIBRARY DESCRIPTION */}
                {/* ========================================================= */}
                <div style={{ paddingTop: "10px", borderTop: "1px dashed var(--border-subtle)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "32px", height: "32px", borderRadius: "8px",
                        background: "#eff6ff", color: "#2563eb",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: "800", fontSize: "14px"
                      }}>
                        4
                      </div>
                      <div>
                        <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a" }}>
                          Library Description
                        </h3>
                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          Add any extra details about your library, amenities, rules or timings (optional)
                        </p>
                      </div>
                    </div>

                    <span style={{
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      color: formData.description.length >= 950 ? "#ef4444" : "#64748b",
                      background: formData.description.length >= 950 ? "#fef2f2" : "#f1f5f9",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: `1px solid ${formData.description.length >= 950 ? "#fecaca" : "var(--border-subtle)"}`
                    }}>
                      {formData.description.length} / 1000 characters
                    </span>
                  </div>

                  <div style={{ position: "relative" }}>
                    <textarea
                      rows={4}
                      maxLength={1000}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Write description about your library (e.g. peaceful atmosphere, soundproof cabins, high-speed fiber Wi-Fi, air conditioned reading rooms, locker availability, competitive exam study groups, etc.) — maximum 1000 characters limit."
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "12px",
                        border: "1.5px solid var(--border-medium)",
                        fontSize: "0.94rem",
                        outline: "none",
                        fontFamily: "inherit",
                        resize: "vertical",
                        lineHeight: 1.6,
                        background: "#ffffff"
                      }}
                    />
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div style={{
                  padding: "18px 20px",
                  background: "#f8fafc",
                  borderRadius: "14px",
                  border: "1px solid var(--border-subtle)"
                }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      style={{ marginTop: "4px", width: "18px", height: "18px", accentColor: "#2563eb" }}
                    />
                    <span style={{ fontSize: "0.85rem", color: "#475569", lineHeight: 1.5 }}>
                      I confirm that I am the owner or authorized administrator of this study library. The provided library details and photographs are genuine and accurate.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "16px",
                      fontSize: "1.08rem",
                      fontWeight: "900",
                      justifyContent: "center",
                      borderRadius: "14px",
                      boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
                      opacity: isSubmitting ? 0.75 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    <FaBuilding /> {isSubmitting ? "Registering & Saving Data..." : "Complete Library Registration & Activate Portal"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ========================================================= */
            /* SUBMISSION SUCCESS & REGISTRATION ACKNOWLEDGMENT SLIP */
            /* ========================================================= */
            <div className="white-card" style={{ padding: "40px", borderTop: "6px solid #10b981" }}>
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  color: "#16a34a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  margin: "0 auto 16px",
                  boxShadow: "0 10px 25px rgba(22, 163, 74, 0.2)"
                }}>
                  <FaCheckCircle />
                </div>
                <span className="badge-green" style={{ marginBottom: "12px" }}>
                  Registration Application Received
                </span>
                <h2 style={{ fontSize: "2.1rem", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>
                  Welcome to LMS by Study Guru, {formData.ownerName}!
                </h2>
                <p style={{ color: "#475569", fontSize: "1.02rem", maxWidth: "620px", margin: "0 auto" }}>
                  Your library registration has been logged in our onboarding queue. We will verify your details and activate your branch portal within 30 minutes.
                </p>
              </div>

              {/* Registration Slip Card */}
              <div style={{
                background: "#f8fafc",
                borderRadius: "16px",
                border: "1.5px solid #bfdbfe",
                padding: "28px",
                marginBottom: "32px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid var(--border-subtle)",
                  paddingBottom: "14px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "10px"
                }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#64748b" }}>APPLICATION ID</span>
                    <div style={{ fontSize: "1.3rem", fontWeight: "900", color: "#2563eb" }}>{regId}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#64748b" }}>STATUS</span>
                    <div style={{ fontSize: "0.95rem", fontWeight: "800", color: "#16a34a" }}>
                      ● Verification in Progress
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", fontSize: "0.9rem" }}>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>Library Name:</span>
                    <strong style={{ color: "#0f172a" }}>{formData.libraryName}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>Owner Name:</span>
                    <strong style={{ color: "#0f172a" }}>{formData.ownerName}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>Gmail ID:</span>
                    <strong style={{ color: "#0f172a" }}>{formData.gmail}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>WhatsApp Number:</span>
                    <strong style={{ color: "#0f172a" }}>+91 {formData.phone}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>Student Capacity:</span>
                    <strong style={{ color: "#2563eb" }}>50 Students (Free Plan)</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>City & State:</span>
                    <strong style={{ color: "#0f172a" }}>{formData.cityName}, {formData.stateName} ({formData.pincode})</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>Database Collection:</span>
                    <strong style={{ color: "#16a34a" }}>libraryregister</strong>
                  </div>
                  <div>
                    <span style={{ color: "#64748b", fontSize: "0.8rem", display: "block" }}>Submission Time:</span>
                    <strong style={{ color: "#0f172a" }}>{submissionDate}</strong>
                  </div>
                  {serverNotice && (
                    <div style={{ gridColumn: "1 / -1", marginTop: "4px" }}>
                      <span style={{ color: "#16a34a", fontSize: "0.85rem", fontWeight: "700" }}>
                        ✓ {serverNotice}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                maxWidth: "600px",
                margin: "0 auto"
              }}>
                <button
                  type="button"
                  onClick={openWhatsAppConfirmation}
                  className="btn-whatsapp"
                  style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "1.05rem",
                    fontWeight: "900",
                    justifyContent: "center",
                    borderRadius: "14px"
                  }}
                >
                  <FaWhatsapp style={{ fontSize: "20px" }} /> Send Details on WhatsApp for Instant Activation
                </button>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-primary"
                    style={{ flex: 1, padding: "12px", justifyContent: "center", fontSize: "0.92rem" }}
                  >
                    <FaPrint /> Print / Save Slip
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setLibraryPhoto(null);
                      setLibraryPhotoPreview(null);
                    }}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "12px",
                      border: "1px solid var(--border-medium)",
                      background: "#ffffff",
                      color: "#334155",
                      fontWeight: "700",
                      fontSize: "0.92rem",
                      cursor: "pointer"
                    }}
                  >
                    Register Another Branch
                  </button>
                </div>

                <div style={{ textAlign: "center", marginTop: "12px" }}>
                  <Link to="/" style={{ color: "#2563eb", fontWeight: "700", fontSize: "0.9rem" }}>
                    &larr; Back to Home Page
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
