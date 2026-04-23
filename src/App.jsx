import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Stylists from "./pages/Stylists";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import News from "./pages/news";
import NewsDetail from "./pages/NewsDetail";
import ChiayiHaircut from "./pages/ChiayiHaircut";
import ChiayiPerm from "./pages/ChiayiPerm";
import ChiayiHairColor from "./pages/ChiayiHairColor";
import ChiayiExosomeScalpSpa from "./pages/ChiayiExosomeScalpSpa";
import ChiayiScalpSpa from "./pages/ChiayiScalpSpa";
import Seo from "./components/Seo";
import { navItems } from "./data";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
};

const seoByPath = {
  "/": {
    title: "VOV Hair Salon | 嘉義市專業剪髮、染燙、頭皮養護推薦",
    description:
      "VOV Hair Salon 位於嘉義市東區，提供專業剪髮、染髮、燙髮、護髮與頭皮養護服務，可線上預約美髮設計師。",
  },
  "/news": {
    title: "最新消息 | VOV Hair Salon 嘉義市美髮沙龍",
    description:
      "查看 VOV Hair Salon 最新店內公告、優惠活動、作品更新與嘉義美髮造型資訊。",
  },
  "/news-detail": {
    title: "最新消息 | VOV Hair Salon 嘉義市美髮沙龍",
    description:
      "查看 VOV Hair Salon 最新消息詳情、活動公告與嘉義美髮造型資訊。",
  },
  "/services": {
    title: "服務價目表 | 嘉義剪髮、染髮、燙髮、頭皮養護 | VOV Hair Salon",
    description:
      "查看 VOV Hair Salon 嘉義剪髮、染髮、燙髮與頭皮養護價目表，依髮長、髮量與設計需求提供專業建議。",
  },
  "/portfolio": {
    title: "作品集 | 嘉義染髮、燙髮、剪髮作品 | VOV Hair Salon",
    description:
      "瀏覽 VOV Hair Salon 設計師作品集，包含嘉義染髮、燙髮、剪髮與頭皮養護作品，找到適合你的髮型靈感。",
  },
  "/stylists": {
    title: "設計師介紹 | VOV Hair Salon 嘉義市美髮設計師",
    description:
      "認識 VOV Hair Salon 美髮設計師專長、年資與服務特色，選擇適合你的剪染燙造型設計師。",
  },
  "/booking": {
    title: "線上預約 | VOV Hair Salon 嘉義市美髮預約",
    description:
      "線上預約 VOV Hair Salon 剪髮、染髮、燙髮與頭皮養護服務，快速安排你的美髮時段。",
  },
  "/contact": {
    title: "聯絡我們 | VOV Hair Salon 嘉義市東區民權路",
    description:
      "VOV Hair Salon 位於嘉義市東區民權路264號，查看電話、營業時間、交通位置與聯絡方式。",
  },
  "/chiayi-haircut": {
    title: "嘉義剪髮推薦 | 洗剪特惠套餐、女生剪髮、剪髮作品 | VOV Hair Salon",
    description:
      "VOV Hair Salon 嘉義剪髮推薦，提供洗剪特惠套餐、女生剪髮、臉型髮型設計與剪髮作品參考。位於嘉義市東區民權路，歡迎線上預約。",
  },
  "/chiayi-perm": {
    title: "嘉義燙髮推薦 | 韓系燙髮、自然大捲、燙髮作品 | VOV Hair Salon",
    description:
      "VOV Hair Salon 嘉義燙髮推薦，依照髮質、髮量與臉型設計自然捲度，提供韓系燙髮、自然大捲與燙髮作品參考。",
  },
  "/chiayi-hair-color": {
    title: "嘉義染髮推薦 | 質感髮色、霧感染髮、染髮作品 | VOV Hair Salon",
    description:
      "VOV Hair Salon 嘉義染髮推薦，提供質感髮色、自然顯白色調、霧感染髮與染髮作品參考，歡迎線上預約諮詢。",
  },
  "/chiayi-exosome-scalp-spa": {
    title: "嘉義高壓氧外泌體毛囊再生頭皮SPA推薦 | VOV Hair Salon",
    description:
      "VOV Hair Salon 嘉義高壓氧外泌體毛囊再生頭皮SPA，適合頭皮敏弱、落髮困擾、髮根扁塌與想深層修護頭皮的顧客。",
  },
  "/chiayi-scalp-spa": {
    title: "嘉義綜效頭皮SPA含洗推薦 | 頭皮清潔舒緩 | VOV Hair Salon",
    description:
      "VOV Hair Salon 嘉義綜效頭皮SPA含洗，結合頭皮清潔、舒緩按摩與洗護流程，適合想改善出油悶黏與放鬆紓壓的顧客。",
  },
};

const Nav = ({ onNavigate }) => (
  <nav className="site-nav d-flex flex-wrap gap-3 align-items-center">
    {navItems.slice(0, 1).map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={onNavigate}
        className={({ isActive }) =>
          `text-decoration-none nav-link ${isActive ? "active" : ""}`
        }
      >
        {item.label}
      </NavLink>
    ))}
    <NavLink
      to="/news"
      onClick={onNavigate}
      className={({ isActive }) =>
        `text-decoration-none nav-link ${isActive ? "active" : ""}`
      }
    >
      最新消息
    </NavLink>
    {navItems.slice(1).map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={onNavigate}
        className={({ isActive }) =>
          `text-decoration-none nav-link ${isActive ? "active" : ""}`
        }
      >
        {item.label}
      </NavLink>
    ))}
  </nav>
);

const Footer = () => (
  <footer className="py-4 bg-white border-top">
    <div className="container footer-content">
      <p className="mb-0 footer-copy">
        &copy; 2026 VOV hair salon. All rights reserved.
      </p>
      <p className="footer-credit mb-0">
        Hair icons created by{" "}
        <a
          href="https://www.flaticon.com/free-icons/hair"
          title="hair icons"
          target="_blank"
          rel="noopener noreferrer"
        >
          Futuer - Flaticon
        </a>
      </p>
      <div className="footer-socials" aria-label="社群平台連結">
        <a
          href="https://www.facebook.com/profile.php?id=100064128156251&ref=NONE_xav_ig_profile_page_web#"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-button facebook"
          aria-label="Facebook"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="footer-social-svg"
          >
            <path
              d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5H16V5.1c-.2 0-.9-.1-1.8-.1-2.7 0-4.4 1.6-4.4 4.6V11H7v3h2.8v7h3.7Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/vov_hair_style_salon/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-button instagram"
          aria-label="Instagram"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="footer-social-svg"
          >
            <path
              d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm8.9 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6Zm0 1.8A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a
          href="https://line.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-button line"
          aria-label="LINE"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="footer-social-svg"
          >
            <path
              d="M12 3.5c-4.7 0-8.5 3.1-8.5 6.9 0 3.4 2.9 6.2 6.8 6.8l-.7 3.3c-.1.3.2.5.5.3l3.8-2.9H14c4.7 0 8.5-3.1 8.5-6.9S18.7 3.5 14 3.5h-2Zm-3 4.5a.8.8 0 0 1 .8.8v3.1h1.5a.8.8 0 1 1 0 1.6H9a.8.8 0 0 1-.8-.8V8.8A.8.8 0 0 1 9 8Zm4 0a.8.8 0 0 1 .8.8v4a.8.8 0 1 1-1.6 0v-4A.8.8 0 0 1 13 8Zm3.4 0a.8.8 0 0 1 0 1.6h-1.5v.7h1.5a.8.8 0 1 1 0 1.6h-1.5v.7h1.5a.8.8 0 1 1 0 1.6h-2.3a.8.8 0 0 1-.8-.8V8.8a.8.8 0 0 1 .8-.8h2.3Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
);

const AppShell = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSiteLoading, setIsSiteLoading] = useState(true);
  const [isSiteLoadingLeaving, setIsSiteLoadingLeaving] = useState(false);
  const location = useLocation();
  const isBookingPage = location.pathname === "/booking";
  const seo = location.pathname.startsWith("/news/")
    ? seoByPath["/news-detail"]
    : seoByPath[location.pathname] || seoByPath["/"];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setIsSiteLoadingLeaving(true);
    }, 1800);
    const removeTimer = window.setTimeout(() => {
      setIsSiteLoading(false);
    }, 2300);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="app-shell">
      {isSiteLoading ? (
        <div
          className={`site-splash ${isSiteLoadingLeaving ? "is-leaving" : ""}`}
          role="status"
          aria-live="polite"
        >
          <div className="site-splash-card">
            <img
              src="/assets/logo.jpg"
              alt="VOV Hair Salon Logo"
              className="site-splash-logo"
            />
            <p className="site-splash-kicker">VOV hair salon</p>
            <h2>正在為你整理美好髮型</h2>
            <div className="loading-scissor-line" aria-hidden="true">
              <span />
              <img src="/assets/scissors.png" alt="" />
            </div>
          </div>
        </div>
      ) : null}
      <Seo
        title={seo.title}
        description={seo.description}
        path={location.pathname}
      />

      <header className="site-header py-3 shadow-sm bg-white sticky-top">
        <div className="container site-header-row">
          <Link
            to="/"
            className="d-flex align-items-center gap-3 site-branding text-decoration-none"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src="/assets/logo.jpg"
              alt="VOV Hair Salon 嘉義市美髮沙龍 Logo"
              className="site-logo"
            />
            <div>
              <h1 className="site-brand-title mb-0">VOV hair salon</h1>
              <p className="text-muted small mb-1">嘉義市東區燙染專家</p>
            </div>
          </Link>

          <button
            type="button"
            className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
            aria-label={isMenuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`nav-shell ${isMenuOpen ? "open" : ""}`}>
            <Nav onNavigate={() => setIsMenuOpen(false)} />
          </div>
        </div>
      </header>

      {isMenuOpen ? (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="關閉選單"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/chiayi-haircut" element={<ChiayiHaircut />} />
          <Route path="/chiayi-perm" element={<ChiayiPerm />} />
          <Route path="/chiayi-hair-color" element={<ChiayiHairColor />} />
          <Route
            path="/chiayi-exosome-scalp-spa"
            element={<ChiayiExosomeScalpSpa />}
          />
          <Route path="/chiayi-scalp-spa" element={<ChiayiScalpSpa />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/stylists" element={<Stylists />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {!isBookingPage && <Footer />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AppShell />
    <Analytics />
    <SpeedInsights />
  </BrowserRouter>
);

export default App;
