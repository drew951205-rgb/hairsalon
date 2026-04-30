import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import ScrollTopButton from "../components/ScrollTopButton";

const menuSections = [
  {
    title: "剪髮",
    subtitle: "Cut",
    image: "/assets/cut.service.optimized.jpg",
    imageAlt: "VOV Hair Salon 剪髮服務形象照",
    introPath: "/chiayi-haircut",
    introLabel: "查看更多",
    items: [
      {
        name: "洗剪套餐",
        note: "含洗髮、剪髮與基礎整理",
        price: "NT$700 起",
      },
      {
        name: "洗剪學生套餐",
        note: "含洗髮、剪髮與基礎整理",
        price: "NT$500 起", 
      },
    ],
  },
  {
    title: "染髮",
    subtitle: "Color",
    image: "/assets/color.service.optimized.jpg",
    imageAlt: "VOV Hair Salon 染髮服務形象照",
    introPath: "/chiayi-hair-color",
    introLabel: "查看更多",
    items: [
      {
        name: "女神染髮",
        note: "依髮長、髮量與設計需求調整",
        price: "NT$2000 起",
      },
      {
        name: "男士染髮",
        note: "適合男士質感髮色與自然修飾",
        price: "NT$1500 起",
      },
    ],
  },
  {
    title: "燙髮",
    subtitle: "Perm",
    image: "/assets/perm.service.optimized.jpg",
    imageAlt: "VOV Hair Salon 燙髮服務形象照",
    introPath: "/chiayi-perm",
    introLabel: "查看更多",
    items: [
      {
        name: "女神燙髮",
        note: "創造自然捲度、蓬鬆感與柔和線條",
        price: "NT$3000 起",
      },
      {
        name: "男士燙髮",
        note: "適合男士蓬鬆、紋理與日常整理造型",
        price: "NT$2000 起",
      },
    ],
  },
  {
    title: "頭皮養護",
    subtitle: "Scalp Spa",
    image: "/assets/scalp.service.optimized.jpg",
    imageAlt: "VOV Hair Salon 頭皮養護服務形象照",
    introPath: "/chiayi-scalp-spa",
    introLabel: "查看更多",
    items: [
      {
        name: "絲馭光頭皮SPA護理含洗",
        note: "深層清潔頭皮，舒緩悶黏與出油感",
        price: "NT$1200 起",
      },
      {
        name: "高壓氧外泌體毛囊再生頭皮SPA",
        note: "針對頭皮狀態深層修護",
        price: "NT$6000 起",
      },
    ],
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const revealItems = Array.from(
      section.querySelectorAll(
        ".services-reveal, .services-price-row, .services-menu-action",
      ),
    );

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
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="services-menu-page py-5" ref={sectionRef}>
      <PageHeader title="服務價目表" lead="Menu" />
      <div className="container">
        <div className="services-menu-list">
          {menuSections.map((section, index) => (
            <article className="services-menu-section" key={section.title}>
              <div className="services-menu-heading services-reveal">
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.subtitle}</p>
                </div>
              </div>

              <div className="services-menu-media services-reveal">
                <img
                  src={section.image}
                  alt={section.imageAlt}
                  width="1200"
                  height="800"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>

              <div className="services-price-list">
                {section.items.map((item) => (
                  <div className="services-price-row" key={item.name}>
                    <div>
                      <h3>{item.name}</h3>
                      {item.note ? <p>{item.note}</p> : null}
                    </div>
                    <strong>{item.price}</strong>
                  </div>
                ))}
              </div>

              <div className="services-menu-action">
                <Link to={section.introPath} className="news-read-more">
                  {section.introLabel}
                  <Icon name="arrow-right-to-bracket" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="services-menu-cta services-reveal">
          <p className="eyebrow text-muted mb-2">Reservation</p>
          <h2>不確定適合哪一項？</h2>
          <p>
            歡迎先預約諮詢，讓設計師依照你的髮況、臉型與日常整理習慣給建議。
          </p>
          <Link to="/booking" className="home-more-link">
            立即線上預約
            <Icon name="arrow-right-to-bracket" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <ScrollTopButton />
    </section>
  );
};

export default Services;
