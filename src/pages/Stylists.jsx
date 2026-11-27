import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { displayedStylists } from "../stylists";
import ScrollTopButton from "../components/ScrollTopButton";

const philosophyItems = [
  {
    label: "Philosophy 01",
    title: "用溝通找出最適合的風格",
    description:
      "我們重視每一次諮詢，從髮質、臉型、穿搭到日常整理習慣，陪你找到好看也好維持的髮型。",
  },
  {
    label: "Philosophy 02",
    title: "細節決定髮型的質感",
    description:
      "剪裁線條、髮色層次與燙髮捲度都會影響整體氛圍，我們用細緻技術呈現自然耐看的效果。",
  },
  {
    label: "Philosophy 03",
    title: "讓每次整理都更輕鬆",
    description:
      "好的髮型不只在沙龍好看，也要能融入你的生活，讓每天出門前的整理變得簡單自在。",
  },
];


const environmentImages = [
  {
    image: "/assets/20546_0.optimized.webp",
    imageAlt: "VOV Hair Salon 店內空間",
    className: "primary",
  },
  {
    image: "/assets/20547_0.optimized.webp",
    imageAlt: "VOV Hair Salon 沙龍形象",
    className: "secondary",
  },
  {
    image: "/assets/20548_0.optimized.webp",
    imageAlt: "VOV Hair Salon 店內環境照片",
    className: "primary",
  },
  {
    image: "/assets/20549_0.optimized.webp",
    imageAlt: "VOV Hair Salon 店內環境照片",
    className: "secondary",
  },
];

const Stylists = () => {
  const pageRef = useRef(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    const targetId = hash.slice(1);
    let decodedId;
    try {
      decodedId = decodeURIComponent(targetId);
    } catch {
      return undefined;
    }
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(decodedId);
      if (target) {
        target.classList.add("is-visible");
        target.scrollIntoView({ block: "start" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealItems = Array.from(page.querySelectorAll(".about-reveal"));

    if (revealItems.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about-page" ref={pageRef}>
      <div className="about-texture" aria-hidden="true" />

      <section className="about-top-image">
        <img
          src="/assets/first.webp"
          alt="VOV Hair Salon 店內形象"
          className="about-reveal is-visible"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
      </section>

      <section className="about-story-hero">
        <div className="about-story-frame about-reveal">
          <span className="about-story-ring ring-small" aria-hidden="true" />
          <span className="about-story-ring ring-large" aria-hidden="true" />
          <div className="about-story-copy">
            <p className="about-story-kicker">VOV Hair Salon</p>
            <h1 className="about-story-title">About Us</h1>
            <p className="about-story-subtitle">Our Story</p>
            <p className="about-story-mark">用髮型記錄你的每個重要時刻</p>
          </div>
        </div>
      </section>

      <section className="about-section about-intro-section">
        <div className="container">
          <div className="about-intro-layout">
            <div className="about-side-label about-reveal">
              <span>關於我們</span>
            </div>
            <div className="about-intro-copy about-reveal">
              <p className="about-intro-lead">
                VOV Hair Salon
                希望每位來到店裡的客人，都能在放鬆的節奏中找到更適合自己的樣子。
              </p>
              <div className="about-divider" aria-hidden="true" />
              <p>
                我們相信髮型不只是造型，更是一種生活狀態。從剪髮、染髮、燙髮到頭皮護理，每一項服務都從溝通開始，讓設計更貼近你的需求。
              </p>
              <p>
                無論你想換一個新的風格，或只是想讓日常整理更輕鬆，我們都會以專業判斷與細緻技術，陪你完成適合自己的改變。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-philosophy-section">
        <div className="container">
          <div className="about-section-heading about-reveal">
            <p>Philosophy</p>
            <h2>我們在意的，不只是完成一款髮型</h2>
          </div>
          <div className="about-philosophy-grid">
            {philosophyItems.map((item) => (
              <article
                className="about-philosophy-card about-reveal"
                key={item.title}
              >
                <p className="about-card-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-team-section">
        <div className="container">
          <div className="about-team-heading about-reveal">
            <div className="about-side-label reverse">
              <span>Our Stylists</span>
            </div>
          </div>

          <div className="about-team-list">
            {displayedStylists.map((item, index) => (
              <article
                className={`about-team-card about-reveal ${item.alignment}`}
                key={item.name}
                id={`stylist-${item.name}`}
              >
                <div className="about-team-image">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    width="700"
                    height="900"
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                    decoding="async"
                  />
                </div>
                <div className="about-team-copy">
                  <h3>{item.name}</h3>
                  <p className="about-team-role">{item.role}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-gallery-section">
        <div className="container">
          <div className="about-gallery-grid">
            {environmentImages.map((item) => (
              <div
                className={`about-gallery-card ${item.className} about-reveal`}
                key={item.image}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width="1200"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-cta-section">
        <div className="container">
          <div className="about-cta-card about-reveal">
            <p className="about-card-label">Next Step</p>
            <h2>想整理髮型，或想換一個更適合自己的風格嗎？</h2>
            <p>
              歡迎先預約諮詢，讓設計師依照你的髮況、需求與生活習慣，安排最適合的服務。
            </p>
            <div className="about-cta-actions">
              <Link to="/booking" className="about-cta-button primary">
                立即預約
              </Link>
              <Link to="/portfolio" className="about-cta-button secondary">
                查看作品
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ScrollTopButton className="about-scroll-top" />
    </section>
  );
};

export default Stylists;
