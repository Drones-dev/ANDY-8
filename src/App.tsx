import { HashRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
const Architecture = lazy(() => import("./pages/Architecture"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Development = lazy(() => import("./pages/Development"));
const Testing = lazy(() => import("./pages/Testing"));
const TeamPage = lazy(() => import("./pages/Team"));
const Documentation = lazy(() => import("./pages/Documentation"));

const pageTitles: Record<string, string> = {
  "/": "ANDY 8 | Distributed Mesh Telemetry",
  "/architecture": "Architecture | ANDY 8",
  "/dashboard": "Simulation Dashboard | ANDY 8",
  "/development": "Development Progress | ANDY 8",
  "/testing": "Testing & Validation | ANDY 8",
  "/team": "Team | ANDY 8",
  "/documentation": "Documentation | ANDY 8",
};

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitles[pathname] ?? "Page Not Found | ANDY 8";
    window.requestAnimationFrame(() => document.getElementById("main-content")?.focus());
  }, [pathname]);
  return null;
}

// Nav height: 56px (mobile) or 56+32=88px (desktop, incl. announcement bar)
// Pages need appropriate top padding to clear the fixed nav
const NAV_OFFSET = "pt-14 lg:pt-[88px]";

function AppShell() {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/dashboard";

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#061426" }}>
      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[100] -translate-y-20 focus:translate-y-0 rounded bg-[#F8FAFC] px-4 py-2 text-sm font-semibold text-[#061426] transition-transform"
      >
        Skip to main content
      </a>
      <RouteEffects />
      <Nav />
      <main id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Suspense fallback={<PageFallback />}>
              <Routes location={pathname}>
                <Route path="/" element={<Home navOffset={NAV_OFFSET} />} />
                <Route path="/architecture" element={<Architecture navOffset={NAV_OFFSET} />} />
                <Route path="/dashboard" element={<Dashboard navOffset={NAV_OFFSET} />} />
                <Route path="/development" element={<Development navOffset={NAV_OFFSET} />} />
                <Route path="/testing" element={<Testing navOffset={NAV_OFFSET} />} />
                <Route path="/team" element={<TeamPage navOffset={NAV_OFFSET} />} />
                <Route path="/documentation" element={<Documentation navOffset={NAV_OFFSET} />} />
                <Route path="*" element={<NotFound navOffset={NAV_OFFSET} />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

function PageFallback() {
  return (
    <div className={`flex-1 grid place-items-center ${NAV_OFFSET}`} role="status">
      <span className="text-sm font-mono text-[#70B7FF] animate-pulse">Loading system view…</span>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

function NotFound({ navOffset }: { navOffset: string }) {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center py-32 px-4 ${navOffset}`}>
      <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#70B7FF" }}>
        404
      </p>
      <h1 className="text-3xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
        Page Not Found
      </h1>
      <p className="text-sm mb-8" style={{ color: "#A9B8CA" }}>
        The route you requested does not exist.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded text-sm font-medium"
        style={{ backgroundColor: "#2491FF", color: "#061426" }}
      >
        Return Home
      </Link>
    </div>
  );
}
