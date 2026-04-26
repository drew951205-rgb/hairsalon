import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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

const displayedStylists = [
  {
    name: "Jenny",
    role: "經理/設計師",
    description:
      "擅長韓系燙髮、柔霧髮色與臉型修飾，依照每位客人的髮質與生活習慣設計好整理的髮型。",
    image: "/assets/jenny.webp",
    imageAlt: "VOV Hair Salon 設計師 Jenny",
    alignment: "left",
  },
  {
    name: "NIKO",
    role: "男士剪裁設計師",
    description:
      "專注男士剪髮、層次修剪與自然造型，打造乾淨俐落又適合日常整理的髮型。",
    image: "/assets/niko.jpg",
    imageAlt: "VOV Hair Salon 設計師 NIKO",
    alignment: "right",
  },
  {
    name: "家嫻",
    role: "質感染燙設計師",
    description:
      "擅長自然捲度、霧感髮色與日常好整理的髮型規劃，重視溝通與整體風格比例。",
    image: "/assets/chia.webp",
    imageAlt: "VOV Hair Salon 設計師家嫻",
    alignment: "left",
  },
  {
    name: "靖惠",
    role: "店長/設計師",
    description:
      "擅長依膚色與髮況設計髮色，搭配柔和線條修飾臉型，呈現自然有精神的造型。",
    image: "/assets/jin.webp",
    imageAlt: "VOV Hair Salon 設計師靖惠",
    alignment: "right",
  },
  {
    name: "WINO",
    role: "造型設計師",
    description:
      "擅長依照臉型與個人風格打造俐落有型的剪裁，讓髮型自然好整理，也能展現個人特色。",
    image: "/assets/wino.jpg",
    imageAlt: "VOV Hair Salon 設計師 WINO",
    alignment: "left",
  },
  {
    name: "妲妮",
    role: "頭皮SPA護理設計師",
    description:
      "具備頭皮護理專業知識與實務經驗，熟悉各類頭皮問題判斷與處理，能依據顧客需求提供客製化療程建議。擅長頭皮SPA按摩技術，結合產品應用與護理流程，提升頭皮健康與顧客舒適度，致力於打造長期穩定的頭皮保養方案。",
    image: "/assets/tani.jpg",
    imageAlt: "VOV Hair Salon 設計師妲妮",
    alignment: "right",
  },
];

const environmentImages = [
  {
    image: "/assets/20546_0.jpg",
    imageAlt: "VOV Hair Salon 店內空間",
    className: "primary",
  },
  {
    image: "/assets/20547_0.jpg",
    imageAlt: "VOV Hair Salon 沙龍形象",
    className: "secondary",
  },
  {
    image: "/assets/20548_0.jpg",
    imageAlt: "VOV Hair Salon 店內環境照片",
    className: "primary",
  },
  {
    image: "/assets/20549_0.jpg",
    imageAlt: "VOV Hair Salon 店內環境照片",
    className: "secondary",
  },
];

const Stylists = () => {
  const pageRef = useRef(null);

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
                VOV Hair Salon 希望每位來到店裡的客人，都能在放鬆的節奏中找到更適合自己的樣子。
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
            {displayedStylists.map((item) => (
              <article
                className={`about-team-card about-reveal ${item.alignment}`}
                key={item.name}
              >
                <div className="about-team-image">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
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
