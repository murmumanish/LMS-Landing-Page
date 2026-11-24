import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import Home from "./pages/Home";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import GuidePage from "./pages/GuidePage";

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-page)" }}>
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/demo" element={<Navigate to="/register" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
