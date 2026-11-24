import { useState } from "react";
import { FaTag } from "react-icons/fa";

const billingCycles = [
  { id: "monthly", label: "Monthly", months: 1, suffix: "per month" },
  { id: "quarterly", label: "Quarterly", months: 3, suffix: "for 3 months", badge: "Up to 11% OFF" },
  { id: "halfYearly", label: "Half Yearly", months: 6, suffix: "for 6 months", badge: "Up to 13% OFF" },
  { id: "yearly", label: "Yearly", months: 12, suffix: "for 12 months", badge: "Up to 17% OFF" }
];

const tiers = [
  {
    name: "Free",
    prices: {
      monthly: 0,
      quarterly: 0,
      halfYearly: 0,
      yearly: 0
    },
    studentCapacity: "Up to 50",
    staffCount: "0",
    deviceLimit: "1",
    attendance: "Basic Manual",
    admission: "QR / Manual",
    feeManagement: "Basic",
    support: "Community Support",
    accent: "#64748b",
    bg: "#f8fafc",
    border: "#e2e8f0"
  },
  {
    name: "Basic",
    prices: {
      monthly: 150,
      quarterly: 400,
      halfYearly: 800,
      yearly: 1500
    },
    studentCapacity: "Up to 200",
    staffCount: "2",
    deviceLimit: "2",
    attendance: "QR / Manual",
    admission: "QR / Manual",
    feeManagement: "Invoicing & Receipts",
    support: "Standard Email",
    accent: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe"
  },
  {
    name: "Pro",
    prices: {
      monthly: 250,
      quarterly: 700,
      halfYearly: 1300,
      yearly: 2500
    },
    studentCapacity: "Up to 500",
    staffCount: "3",
    deviceLimit: "3",
    attendance: "QR / Manual",
    admission: "QR / Manual",
    feeManagement: "Invoicing & Receipts",
    support: "Priority Email & Chat",
    accent: "#059669",
    bg: "#ecfdf5",
    border: "#10b981",
    popular: true
  },
  {
    name: "Enterprise",
    prices: null,
    studentCapacity: "Unlimited",
    staffCount: "5",
    deviceLimit: "5",
    attendance: "Advanced Custom Integration",
    admission: "Custom Workflow & Portal",
    feeManagement: "Full ERP & Multi-Branch",
    support: "24/7 Dedicated Account Manager",
    accent: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca"
  }
];

const attributes = [
  { key: "studentCapacity", label: "Student Capacity" },
  { key: "staffCount", label: "Staff Count" },
  { key: "deviceLimit", label: "Device Limit" },
  { key: "attendance", label: "Attendance" },
  { key: "admission", label: "Admission Process" },
  { key: "feeManagement", label: "Fee Management" },
  { key: "support", label: "Support Level" }
];

export default function SubscriptionTiers() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const activeCycle = billingCycles.find((c) => c.id === billingCycle);

  return (
    <section
      id="subscription-tiers"
      className="section-padding"
      style={{ background: "#ffffff", borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 40px" }}>


          {/* Billing Options */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              background: "#f1f5f9",
              padding: "6px",
              borderRadius: "16px",
              border: "1px solid var(--border-medium)",
              marginTop: "24px",
              gap: "4px"
            }}
          >
            {billingCycles.map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setBillingCycle(cycle.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "12px",
                  fontSize: "0.85rem",
                  fontWeight: "800",
                  background: billingCycle === cycle.id ? "#2563eb" : "transparent",
                  color: billingCycle === cycle.id ? "#ffffff" : "#475569",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span>{cycle.label}</span>
                {cycle.badge && (
                  <span
                    style={{
                      fontSize: "0.68rem",
                      padding: "2px 7px",
                      borderRadius: "6px",
                      background: billingCycle === cycle.id ? "rgba(255,255,255,0.25)" : "#dcfce7",
                      color: billingCycle === cycle.id ? "#ffffff" : "#15803d",
                      fontWeight: "900"
                    }}
                  >
                    {cycle.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            overflowX: "auto",
            borderRadius: "18px",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-sm)",
            background: "#ffffff"
          }}
        >
          <table style={{ width: "100%", minWidth: "1020px", borderCollapse: "collapse", fontSize: "0.86rem" }}>
            <thead>
              <tr style={{ background: "#0f172a", color: "#ffffff" }}>
                {["Subscription Tier", ...attributes.map((a) => a.label), "Plan Price"].map((heading, i) => (
                  <th
                    key={i}
                    style={{
                      padding: "14px 14px",
                      textAlign: i === 0 ? "left" : "center",
                      fontWeight: "800",
                      fontSize: "0.78rem",
                      letterSpacing: "0.02em",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => {
                const total = tier.prices ? tier.prices[billingCycle] : null;
                const monthlyBase = tier.prices?.monthly || 0;
                const naturalPrice = monthlyBase > 0 ? monthlyBase * activeCycle.months : null;
                const discountAmount = naturalPrice && total !== null ? naturalPrice - total : 0;
                const discountPercent = naturalPrice && discountAmount > 0 ? Math.round((discountAmount / naturalPrice) * 100) : 0;

                return (
                  <tr
                    key={tier.name}
                    style={{
                      borderBottom: "1px solid var(--border-subtle)",
                      background: tier.popular ? "#f0fdf4" : "#ffffff"
                    }}
                  >
                    <td style={{ padding: "16px 14px", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: tier.accent,
                            flexShrink: 0
                          }}
                        />
                        <span style={{ fontWeight: "900", color: "#0f172a", fontSize: "0.95rem" }}>
                          {tier.name}
                        </span>
                        {tier.popular && (
                          <span
                            style={{
                              fontSize: "0.62rem",
                              fontWeight: "900",
                              padding: "2px 7px",
                              borderRadius: "9999px",
                              background: "#10b981",
                              color: "#ffffff",
                              textTransform: "uppercase",
                              letterSpacing: "0.04em"
                            }}
                          >
                            Popular
                          </span>
                        )}
                      </div>
                    </td>

                    {attributes.map((attr) => (
                      <td
                        key={attr.key}
                        style={{
                          padding: "16px 14px",
                          textAlign: "center",
                          color: "#334155",
                          lineHeight: 1.45
                        }}
                      >
                        {tier[attr.key]}
                      </td>
                    ))}

                    <td
                      style={{
                        padding: "16px 14px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        background: tier.bg
                      }}
                    >
                      {total === null ? (
                        <div>
                          <div style={{ fontWeight: "900", color: tier.accent, fontSize: "0.95rem" }}>
                            According to Features
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Custom quote</div>
                        </div>
                      ) : (
                        <div>
                          {discountAmount > 0 && (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "3px", flexWrap: "wrap" }}>
                              <span style={{ textDecoration: "line-through", color: "#94a3b8", fontSize: "0.8rem", fontWeight: "600" }}>
                                ₹{naturalPrice.toLocaleString("en-IN")}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.68rem",
                                  fontWeight: "800",
                                  color: "#059669",
                                  background: "#dcfce7",
                                  padding: "1px 6px",
                                  borderRadius: "6px",
                                  border: "1px solid #bbf7d0"
                                }}
                              >
                                Save ₹{discountAmount.toLocaleString("en-IN")} ({discountPercent}% OFF)
                              </span>
                            </div>
                          )}
                          <div style={{ fontWeight: "900", color: tier.accent, fontSize: "1.22rem" }}>
                            ₹{total.toLocaleString("en-IN")}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>
                            {activeCycle.suffix}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div
          style={{
            marginTop: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            fontSize: "0.82rem",
            color: "#64748b"
          }}
        >
          <FaTag style={{ color: "#2563eb" }} />
          <span>
            Quarterly, Half-Yearly aur Yearly plans me discounted bundle pricing shamil hai. GST extra. Enterprise pricing is customised as per your required features.
          </span>
        </div>
      </div>
    </section>
  );
}
