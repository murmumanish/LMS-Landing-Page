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

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    methods: ["GET", "POST"]
  })
);
app.use(express.json({ limit: "100kb" }));

// ==========================================
// Helpers
// ==========================================
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

function cleanString(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function detectOs(userAgent) {
  if (/windows/i.test(userAgent)) return "Windows";
  if (/macintosh|mac os x/i.test(userAgent)) return "macOS";
  if (/android/i.test(userAgent)) return "Android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
  if (/linux/i.test(userAgent)) return "Linux";
  return "Unknown";
}

function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.ip ||
    req.socket?.remoteAddress ||
    null
  );
}

// Admin routes are hidden unless an ADMIN_API_KEY is configured.
function requireAdmin(req, res, next) {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    return res.status(404).json({ success: false, message: "Not found." });
  }
  if (req.get("x-admin-key") !== adminKey) {
    return res.status(401).json({ success: false, message: "Unauthorized." });
  }
  return next();
}

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
    activeStudentsLimit: { type: Number, default: 100 },

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

// Atomic sequence generator for libraryregister.id (prevents duplicate IDs)
const counterSchema = new mongoose.Schema(
  {
    _id: { type: String },
    seq: { type: Number, default: 0 }
  },
  { collection: "counters", versionKey: false }
);

const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);

// Contact / demo inquiries submitted from the website
const contactInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    libraryName: { type: String, default: "", trim: true },
    phone: { type: String, required: true },
    email: { type: String, default: "", trim: true, lowercase: true },
    topic: { type: String, default: "General Product Inquiry", trim: true },
    message: { type: String, default: "", trim: true },
    status: { type: String, default: "NEW" },
    ipAddress: { type: String, default: null },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() }
  },
  {
    collection: "contactinquiries",
    timestamps: false
  }
);

export const ContactInquiry = mongoose.model(
  "ContactInquiry",
  contactInquirySchema,
  "contactinquiries"
);

// ==========================================
// MongoDB Connection (Optimized for Free Atlas M0 Tier)
// ==========================================
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI, {
      maxPoolSize: 10, // Caps connection pool at 10 to safely protect free Atlas limits
      minPoolSize: 1, // Keeps 1 persistent connection ready
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    })
    .then(() => {
      console.log(`\x1b[32m[MongoDB]\x1b[0m Connected to database successfully.`);
      console.log(`\x1b[32m[MongoDB]\x1b[0m Collections: libraryregister, contactinquiries`);
    })
    .catch((err) => {
      console.error(`\x1b[31m[MongoDB Error]\x1b[0m Could not connect to MongoDB: ${err.message}`);
      console.warn(`[MongoDB Warning] Check your MONGODB_URI in .env file (Atlas or Local URI).`);
    });
} else {
  console.warn("[MongoDB Warning] MONGODB_URI is not set. API will return 503 until it is configured.");
}

// ==========================================
// API Routes
// ==========================================

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    dbConnected: mongoose.connection.readyState === 1,
    collections: ["libraryregister", "contactinquiries"],
    timestamp: new Date()
  });
});

// Atomically reserve the next library ID.
// The counter is seeded from the highest existing id so upgrading an existing
// database cannot hand out an ID that is already used.
async function getNextLibraryId() {
  const lastRecord = await LibraryRegister.findOne().sort({ id: -1 }).select("id").lean();
  const maxId = lastRecord && Number.isFinite(lastRecord.id) ? lastRecord.id : 0;

  const counter = await Counter.findById("libraryregister").lean();

  if (!counter) {
    try {
      await Counter.create({ _id: "libraryregister", seq: maxId });
    } catch (error) {
      // Another request created it at the same time; that is fine.
      if (error?.code !== 11000) throw error;
    }
  } else if (counter.seq < maxId) {
    await Counter.updateOne({ _id: "libraryregister" }, { $set: { seq: maxId } });
  }

  const updated = await Counter.findOneAndUpdate(
    { _id: "libraryregister" },
    { $inc: { seq: 1 } },
    { new: true }
  );

  return updated.seq;
}

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please try again in a moment."
      });
    }

    const formData = req.body || {};

    const cleanLibraryName = cleanString(formData.libraryName, 80);
    const cleanOwnerName = cleanString(formData.ownerName, 60);
    const cleanEmail = cleanString(formData.email || formData.gmail, 80).toLowerCase();
    const cleanPhone = typeof formData.phone === "string" ? formData.phone.replace(/\D/g, "") : "";

    if (!cleanLibraryName || !cleanOwnerName || !cleanEmail || !cleanPhone) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing: libraryName, ownerName, email, and phone are mandatory."
      });
    }

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address."
      });
    }

    if (!INDIAN_PHONE_REGEX.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit Indian mobile number."
      });
    }

    // Best-effort duplicate protection (email or phone already registered)
    const duplicate = await LibraryRegister.findOne({
      $or: [{ email: cleanEmail }, { phone: cleanPhone }]
    })
      .select("id")
      .lean();

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message:
          "A library with this email or mobile number is already registered. Please contact support to update your details."
      });
    }

    const userAgent = req.headers["user-agent"] || "Unknown";
    const clientIp = getClientIp(req);

    // Calculate activeStudentsLimit based on seats/capacity
    const requestedLimit = Number(
      formData.quota ??
        formData.activeStudentsLimit ??
        (formData.capacity === "Unlimited" ? 1000 : formData.capacity)
    );
    const seatsLimit =
      Number.isFinite(requestedLimit) && requestedLimit > 0 ? Math.floor(requestedLimit) : 100;

    // Notice: Picture and Description are NOT saved into libraryregister
    // Notice: Password is stored as null since user hasn't set one yet
    const newDocument = {
      libraryName: cleanLibraryName,
      address: cleanString(formData.address, 160),
      city: cleanString(formData.city, 50) || "Noida",
      phone: cleanPhone,
      activeStudentsLimit: seatsLimit,

      ownerName: cleanOwnerName,
      email: cleanEmail,
      password: formData.password || null,
      subscriptionTier: cleanString(formData.tier, 20) || "FREE",

      browser: String(userAgent).slice(0, 250),
      deviceId: formData.deviceId || null,
      ipAddress: clientIp,
      os: detectOs(userAgent),

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

    // Retry on the rare duplicate-key race so concurrent registrations never fail.
    let savedRecord = null;
    let lastError = null;

    for (let attempt = 0; attempt < 4 && !savedRecord; attempt += 1) {
      try {
        savedRecord = await new LibraryRegister({
          ...newDocument,
          id: await getNextLibraryId()
        }).save();
      } catch (error) {
        lastError = error;
        if (error?.code !== 11000) throw error;
      }
    }

    if (!savedRecord) {
      throw lastError || new Error("Could not allocate a registration ID. Please try again.");
    }

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
      message: "Failed to save library registration. Please try again."
    });
  }
});

// Contact / demo inquiry endpoint
app.post("/api/contact", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Message service is temporarily unavailable. Please use WhatsApp instead."
      });
    }

    const body = req.body || {};
    const name = cleanString(body.name, 60);
    const libraryName = cleanString(body.libraryName, 80);
    const phone = typeof body.phone === "string" ? body.phone.replace(/\D/g, "") : "";
    const email = cleanString(body.email ?? body.gmail, 80).toLowerCase();
    const topic = cleanString(body.topic ?? body.inquiryTopic, 120) || "General Product Inquiry";
    const message = cleanString(body.message, 1000);

    if (name.length < 2) {
      return res.status(400).json({ success: false, message: "Please enter a valid name." });
    }
    if (!INDIAN_PHONE_REGEX.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit Indian WhatsApp number."
      });
    }
    if (email && !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    const inquiry = await new ContactInquiry({
      name,
      libraryName,
      phone,
      email,
      topic,
      message,
      status: "NEW",
      ipAddress: getClientIp(req),
      createdAt: new Date(),
      updatedAt: new Date()
    }).save();

    return res.status(201).json({
      success: true,
      message: "Your message has been received. Our team will contact you shortly.",
      id: inquiry._id
    });
  } catch (error) {
    console.error("Error saving contact inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send your message. Please try WhatsApp instead."
    });
  }
});

// Fetch all registered libraries (admin-only)
app.get("/api/registrations", requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: "Database not connected." });
    }
    const libraries = await LibraryRegister.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: libraries.length, data: libraries });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to load registrations." });
  }
});

// Fetch contact inquiries (admin-only)
app.get("/api/contact-inquiries", requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: "Database not connected." });
    }
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 }).limit(500);
    return res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to load inquiries." });
  }
});

// JSON parse / unexpected error handler
app.use((err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON payload." });
  }
  console.error("Unhandled API error:", err);
  return res.status(500).json({ success: false, message: "Unexpected server error." });
});

if (!isVercel) {
  app.listen(PORT, () => {
    console.log(`\x1b[36m[Server]\x1b[0m LMS Backend API running at http://localhost:${PORT}`);
  });
}

export default app;
