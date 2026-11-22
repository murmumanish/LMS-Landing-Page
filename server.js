import dns from "node:dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Configure DNS for local environment (bypassed on Vercel)
const isVercel = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);

if (!isVercel) {
  try {
    const customDns = process.env.DNS_SERVERS
      ? process.env.DNS_SERVERS.split(",").map((s) => s.trim()).filter(Boolean)
      : ["1.1.1.1", "1.0.0.1"];

    dns.setServers(customDns);
    if (typeof dns.setDefaultResultOrder === "function") {
      dns.setDefaultResultOrder("ipv4first");
    }
    console.log(`\x1b[35m[DNS]\x1b[0m Local environment detected: configured DNS to [${customDns.join(", ")}] for Atlas SRV resolution`);
  } catch (dnsErr) {
    console.warn("[DNS Warning] Could not configure custom DNS servers:", dnsErr.message);
  }
} else {
  console.log("[DNS] Running on Vercel: using default system DNS");
}

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// ==========================================
// Schema & Model for libraryregister
// ==========================================
const libraryRegisterSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    libraryName: { type: String, required: true },
    address: { type: String, default: "" },
    city: { type: String, default: "Noida" },
    phone: { type: String, required: true },
    activeStudentsLimit: { type: Number, default: 50 },

    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: null },
    subscriptionTier: { type: String, default: "FREE" },

    browser: { type: String, default: "Chrome" },
    deviceId: { type: String, default: null },
    ipAddress: { type: String, default: null },
    os: { type: String, default: "Windows" },

    status: { type: String, default: "PENDING" },
    branchId: { type: mongoose.Schema.Types.Mixed, default: null },
    userId: { type: mongoose.Schema.Types.Mixed, default: null },
    branchCode: { type: String, default: null },
    admissionToken: { type: String, default: null },
    attendanceToken: { type: String, default: null },
    approvedAt: { type: Date, default: null },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() }
  },
  {
    collection: "libraryregister",
    timestamps: false
  }
);

export const LibraryRegister = mongoose.model(
  "LibraryRegister",
  libraryRegisterSchema,
  "libraryregister"
);

// ==========================================
// Email Notification Function
// ==========================================
export async function sendRegistrationEmail(userEmail, _registrationDetails = {}) {
  try {
    console.log(`[Email Service] Sending registration confirmation email to: ${userEmail}`);
    // Simulated email delivery action
    console.log("email sent");
    return { success: true, to: userEmail };
  } catch (error) {
    console.error("[Email Service Error]:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// MongoDB Connection (Optimized for Free Atlas M0 Tier)
// ==========================================
mongoose
  .connect(MONGODB_URI, {
    maxPoolSize: 10, // Caps connection pool at 10 to safely protect free Atlas limits
    minPoolSize: 1,  // Keeps 1 persistent connection ready
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
  })
  .then(() => {
    console.log(`\x1b[32m[MongoDB]\x1b[0m Connected to database successfully.`);
    console.log(`\x1b[32m[MongoDB]\x1b[0m Collection: libraryregister`);
  })
  .catch((err) => {
    console.error(`\x1b[31m[MongoDB Error]\x1b[0m Could not connect to MongoDB: ${err.message}`);
    console.warn(`[MongoDB Warning] Check your MONGODB_URI in .env file (Atlas or Local URI).`);
  });

// ==========================================
// API Routes
// ==========================================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    dbConnected: mongoose.connection.readyState === 1,
    collection: "libraryregister",
    timestamp: new Date()
  });
});

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please verify your MONGODB_URI in .env."
      });
    }

    const formData = req.body || {};

    const cleanLibraryName = (formData.libraryName || "").trim();
    const cleanOwnerName = (formData.ownerName || "").trim();
    const cleanEmail = (formData.email || formData.gmail || "").trim().toLowerCase();
    const cleanPhone = (formData.phone || "").replace(/\D/g, "");

    if (!cleanLibraryName || !cleanOwnerName || !cleanEmail || !cleanPhone) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing: libraryName, ownerName, email, and phone are mandatory."
      });
    }

    // Determine next sequential ID
    const lastRecord = await LibraryRegister.findOne().sort({ id: -1 }).select("id").lean();
    const nextId = lastRecord && typeof lastRecord.id === "number" ? lastRecord.id + 1 : 1;

    // Detect OS & Browser from user-agent headers
    const userAgent = req.headers["user-agent"] || "Chrome";
    let detectedOS = "Windows";
    if (/windows/i.test(userAgent)) detectedOS = "Windows";
    else if (/macintosh|mac os x/i.test(userAgent)) detectedOS = "macOS";
    else if (/linux/i.test(userAgent)) detectedOS = "Linux";
    else if (/android/i.test(userAgent)) detectedOS = "Android";
    else if (/iphone|ipad|ipod/i.test(userAgent)) detectedOS = "iOS";

    // Detect client IP
    const clientIp = (
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.ip ||
      req.socket?.remoteAddress ||
      null
    );

    // Calculate activeStudentsLimit based on seats/capacity (default 50 for FREE plan in database)
    let seatsLimit = 50;
    if (formData.quota) {
      seatsLimit = Number(formData.quota);
    } else if (formData.activeStudentsLimit) {
      seatsLimit = Number(formData.activeStudentsLimit);
    } else if (formData.capacity) {
      seatsLimit = formData.capacity === "Unlimited" ? 1000 : Number(formData.capacity) || 50;
    }

    // Notice: Picture and Description are NOT saved into libraryregister
    // Notice: Password is stored as null since user hasn't set one yet
    const newDocument = {
      id: nextId,
      libraryName: cleanLibraryName,
      address: formData.address || "",
      city: formData.city || "Noida",
      phone: cleanPhone,
      activeStudentsLimit: seatsLimit,

      ownerName: cleanOwnerName,
      email: cleanEmail,
      password: formData.password || null,
      subscriptionTier: formData.tier || "FREE",

      browser: userAgent,
      deviceId: formData.deviceId || null,
      ipAddress: clientIp,
      os: detectedOS,

      status: "PENDING",
      branchId: null,
      userId: null,
      branchCode: null,
      admissionToken: null,
      attendanceToken: null,
      approvedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newRecord = new LibraryRegister(newDocument);
    const savedRecord = await newRecord.save();

    // Trigger email to userEmail
    await sendRegistrationEmail(cleanEmail, savedRecord);

    return res.status(201).json({
      success: true,
      message: "Library registered successfully into libraryregister collection.",
      id: savedRecord.id,
      data: savedRecord
    });
  } catch (error) {
    console.error("Error saving to libraryregister:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to save library registration."
    });
  }
});

// Fetch all registered libraries (for verification/admin)
app.get("/api/registrations", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: "Database not connected." });
    }
    const libraries = await LibraryRegister.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: libraries.length, data: libraries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\x1b[36m[Server]\x1b[0m LMS Backend API running at http://localhost:${PORT}`);
});
