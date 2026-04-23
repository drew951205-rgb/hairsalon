import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ScrollTopButton from "../components/ScrollTopButton";

const philosophyItems = [
  {
    label: "Philosophy 01",
    title: "留白，不是空白",
    description:
      "我們相信真正耐看的髮型，不是把所有技巧堆滿，而是為每個人留下剛剛好的空間與呼吸感。",
  },
  {
    label: "Philosophy 02",
    title: "設計，要回到生活",
    description:
      "從輪廓、髮流到整理方式，我們重視的是妳走出沙龍後，依然能輕鬆維持的質感。",
  },
  {
    label: "Philosophy 03",
    title: "服務，是一種節奏",
    description:
      "從諮詢到完成，每個步驟都希望讓人放鬆下來，慢慢找到最適合自己的樣子。",
  },
];

const stylistHighlights = [
  {
    name: "Jenny",
    role: "自然感輪廓設計",
    description:
      "擅長以乾淨線條與柔和層次，調整臉型比例與整體氣質，讓髮型在日常也能維持輕盈與俐落。",
    image: "/assets/jenny.webp",
    imageAlt: "VOV Hair Salon 自然感長髮造型作品",
    alignment: "left",
  },
  {
    name: "翁大俠",
    role: "空氣感燙髮風格",
    description: "專注於躺平，順順利利，阿里嘎都",
    image: "/assets/weng.webp",
    imageAlt: "VOV Hair Salon 空氣感燙髮作品",
    alignment: "right",
  },
  {
    name: "Gloss & Flow",
    role: "質感染髮與修護",
    description:
      "重視霧感、光澤與膚色協調，讓顏色不只好看，更能自然融入個人氣場與穿搭。",
    image: "/assets/大捲.jpg",
    imageAlt: "VOV Hair Salon 柔霧光澤感髮型作品",
    alignment: "left",
  },
];

const environmentImages = [
  {
    image: "/assets/first.webp",
    imageAlt: "VOV Hair Salon 店內空間一角",
    className: "primary",
  },
  {
    image: "/assets/hero.png",
    imageAlt: "VOV Hair Salon 自然光髮型作品",
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
          alt="VOV Hair Salon 嘉義髮廊空間"
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
            <p className="about-story-mark">心・美・感</p>
          </div>
        </div>
      </section>

      <section className="about-section about-intro-section">
        <div className="container">
          <div className="about-intro-layout">
            <div className="about-side-label about-reveal">
              <span>開店初衷</span>
            </div>
            <div className="about-intro-copy about-reveal">
              <p className="about-intro-lead">
                我們希望把整理頭髮這件事，變成一段可以安靜下來、
                重新看見自己的時間。
              </p>
              <div className="about-divider" aria-hidden="true" />
              <p>
                VOV 相信，好看的髮型不只存在於拍照當下，而是要能回到真實
                生活裡，陪你上班、約會、旅行，也陪你度過每一個普通卻重要的日子。
              </p>
              <p>
                從剪裁、染燙到頭皮養護，我們在意的不只是做完之後的樣子，
                更是在這段過程裡，你是否被好好傾聽、被溫柔對待，也終於找到
                屬於自己的舒服節奏。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-philosophy-section">
        <div className="container">
          <div className="about-section-heading about-reveal">
            <p>Philosophy</p>
            <h2>關於 VOV，我們想留下的感受</h2>
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
            {stylistHighlights.map((item) => (
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
            <h2>讓下一次整理頭髮，變成一次真正適合你的設計體驗</h2>
            <p>
              如果你也喜歡這種安靜、乾淨、有留白感的風格，我們很期待在 VOV
              和你見面。
            </p>
            <div className="about-cta-actions">
              <Link to="/booking" className="about-cta-button primary">
                立即預約
              </Link>
              <Link to="/portfolio" className="about-cta-button secondary">
                看更多作品
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
