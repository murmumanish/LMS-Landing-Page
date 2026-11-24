import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaTag } from "react-icons/fa";

const generalFaqs = [
  {
    q: "How does the 3-Month Free Trial work? Are there any hidden setup fees?",
    a: "There are zero setup fees or hidden charges. When you register your library, you receive 3 full months of Pro access. A nominal ₹1 Razorpay transaction is used solely to authenticate your branch credentials and prevent duplicate accounts. After 3 months, you can continue on Basic (₹150/mo) or Pro (₹250/mo), or cancel anytime."
  },
  {
    q: "How difficult is it to migrate from manual registers or Excel sheets?",
    a: "It takes less than 30 minutes! You can upload existing student lists or simply display our reception QR code for walk-in students to register their own profiles. Our team also provides free 1-on-1 assistance over WhatsApp (+91 9142025447) to configure your seat grid."
  },
  {
    q: "Do I need expensive biometric machines or barcode scanners for attendance?",
    a: "No extra hardware is needed. LMS includes a dedicated Public Attendance Kiosk that runs directly in any browser on an old phone, tablet, or laptop. Students simply scan their unique QR ID card or enter their mobile number to record their entry and exit times instantly."
  },
  {
    q: "Can I customize shifts and timings according to our library slots?",
    a: "Yes, fully customizable! Configure morning (e.g. 6 AM – 12 PM), afternoon (12 PM – 5 PM), evening (5 PM – 10 PM), night (10 PM – 6 AM), or full-day 24/7 dedicated reserved seats with independent pricing structures for each slot."
  },
  {
    q: "How do automated WhatsApp fee reminders work?",
    a: "LMS tracks renewal dates automatically. 3 days before a student's validity expires, an automated, polite WhatsApp payment reminder is prepared with the renewal amount, due date, and your library UPI QR code—eliminating awkward manual confrontations."
  },
  {
    q: "How is my library's financial and student data secured?",
    a: "Your data is protected by enterprise-grade SSL encryption and hosted on high-availability cloud servers. Strict single-device session locking ensures staff can only access cashier and attendance modes on authorized branch devices, keeping owner settings safe."
  },
  {
    q: "Can I manage multiple branches from a single account?",
    a: "Yes! Our Pro plan includes multi-branch support. You can switch between different branches with one click, inspect seat occupancy across locations, and view consolidated monthly revenue from a centralized master console."
  }
];

const pricingFaqs = [
  {
    q: "What is the difference between the Basic and Pro plans?",
    a: "The Basic Plan (₹150/month) is ideal for single-room libraries up to 100 students, including digital seat layout, QR attendance, and basic fee receipts. The Pro Plan (₹250/month) supports up to 1,000 students, automated WhatsApp fee alerts, multi-branch switching, advanced revenue analytics, and priority 24/7 technical support."
  },
  {
    q: "How much do I save with Quarterly, Half-Yearly, and Annual billing?",
    a: "You save significantly on longer billing cycles! Basic Plan: Monthly ₹150 | Quarterly ₹400 (Save ₹50) | Half-Yearly ₹800 (Save ₹100) | Annual ₹1,500 (Save ₹300, 17% OFF). Pro Plan: Monthly ₹250 | Quarterly ₹700 (Save ₹50) | Half-Yearly ₹1,300 (Save ₹200) | Annual ₹2,500 (Save ₹500, 17% OFF)."
  },
  {
    q: "Why is there a nominal ₹1 charge for the 3-Month Free Trial?",
    a: "The ₹1 payment is processed via Razorpay's secure payment gateway strictly for fraud prevention, branch bank/UPI authentication, and duplicate account protection. It ensures that only legitimate library owners access the 3-Month Pro complimentary tier."
  },
  {
    q: "Will I be automatically charged after the 3-Month Free Trial ends?",
    a: "No, there are no hidden auto-debits without your explicit approval. Before your trial period concludes, you will receive an alert in your admin dashboard giving you the option to select either the Basic or Pro plan with your preferred monthly, quarterly, or annual billing cycle."
  },
  {
    q: "Can I upgrade, downgrade, or switch billing cycles anytime?",
    a: "Yes, absolutely. You can upgrade from Basic to Pro or switch from monthly to annual billing at any point from your Admin Dashboard's Subscription section. Your existing balance will be automatically adjusted."
  },
  {
    q: "What payment methods are supported for subscription renewals?",
    a: "We accept all major Indian payment methods via Razorpay, including UPI (Google Pay, PhonePe, Paytm, BHIM), Net Banking across 50+ banks, Credit Cards, and Debit Cards. Instant GST-compliant tax invoices are automatically generated for every transaction."
  },
  {
    q: "Is there any long-term contract or cancellation penalty?",
    a: "No contracts and no cancellation fees. You have complete freedom to use the platform on a month-to-month or cycle basis. You can export all your student and fee records to Excel/PDF at any time with a single click."
  }
];

export default function FAQAccordion({ type = "general" }) {
  const [openIndex, setOpenIndex] = useState(0);

  const isPricing = type === "pricing";
  const faqs = isPricing ? pricingFaqs : generalFaqs;

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="section-padding" style={{ background: isPricing ? "#ffffff" : "#f8fafc" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div className={isPricing ? "badge-green" : "badge-blue"} style={{ marginBottom: "14px" }}>
            {isPricing ? <FaTag /> : <FaQuestionCircle />} {isPricing ? "Pricing & Subscription FAQs" : "Frequently Asked Questions"}
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", marginBottom: "14px", color: "#0f172a" }}>
            {isPricing ? "Got Questions About Our Pricing & Plans?" : "Everything You Need to Know"}
          </h2>
          <p style={{ color: "#475569", fontSize: "1rem", lineHeight: 1.6 }}>
            {isPricing
              ? "Clear answers regarding our billing cycles, 3-month trial activation, payment methods, and plan differences."
              : "Got questions about onboarding, shifts, QR attendance, or WhatsApp alerts? We have answers."}
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="white-card"
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: isOpen ? "1.5px solid #2563eb" : "1px solid var(--border-subtle)",
                  transition: "all 0.25s ease"
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    color: isOpen ? "#2563eb" : "#0f172a",
                    fontWeight: "800",
                    fontSize: "1.05rem",
                    cursor: "pointer"
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{ color: isOpen ? "#2563eb" : "#94a3b8", fontSize: "16px", marginLeft: "12px" }}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: "0 24px 22px 24px",
                    color: "#475569",
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "16px"
                  }}>
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
