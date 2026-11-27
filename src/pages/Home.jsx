import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { services, testimonials } from "../data";
import {
  fetchSanityNews,
  fetchSanityPortfolio,
  fetchSanityTestimonials,
  getSanityImageSrcSet,
  getSanityImageUrl,
} from "../lib/sanity";
import { formatNewsDate, getNewsPath } from "../lib/news";
import Icon from "../components/Icon";
import { useLayoutEffect } from "react";
import { displayedStylists } from "../stylists";

const isValidItem = (item) => Boolean(item && typeof item === "object");

const mapNewsItem = (item) => {
  if (!isValidItem(item) || !item._id) {
    return null;
  }

  return {
    id: item._id,
    slug: item.slug,
    date: formatNewsDate(item.publishedAt),
    title: item.title || "最新消息",
    summary: item.summary || "",
    image: getSanityImageUrl(item.imageRef, {
      width: 720,
      quality: 78,
      fit: "max",
    }),
    imageSrcSet: getSanityImageSrcSet(item.imageRef, [360, 540, 720, 960], {
      quality: 78,
      fit: "max",
    }),
    imageAlt:
      item.imageAlt ||
      `VOV Hair Salon 最新消息 - ${item.title || "最新消息"}`,
  };
};

const mapPortfolioItem = (item) => {
  if (!isValidItem(item) || !item._id) {
    return null;
  }

  return {
    id: item._id,
    title: item.title || "作品",
    category: item.category || "作品精選",
    subtitle: item.subtitle || "",
    stylist: item.stylist || "",
    image: getSanityImageUrl(item.imageRef, {
      width: 720,
      quality: 78,
      fit: "max",
    }),
    imageSrcSet: getSanityImageSrcSet(item.imageRef, [360, 540, 720, 960], {
      quality: 78,
      fit: "max",
    }),
    imageAlt:
      item.imageAlt ||
      `VOV Hair Salon 作品集 - ${item.title || "作品"}`,
  };
};

const mapTestimonialItem = (item) => {
  if (!isValidItem(item) || !item._id) {
    return null;
  }

  return {
    id: item._id,
    name: item.name || "顧客",
    comment: item.comment || "",
    rating: Math.min(Math.max(Number(item.rating) || 5, 1), 5),
    source: item.source || "店內回饋",
  };
};


const homeSkeletonItems = Array.from({ length: 3 }, (_, index) => index);

const featuredServices = [
  { ...services[0], image: "/assets/cut.service.optimized.jpg" },
  { ...services[1], image: "/assets/color.service.optimized.jpg" },
  { ...services[2], image: "/assets/perm.service.optimized.jpg" },
  { ...services[4], title: "頭皮養護", image: "/assets/scalp.service.optimized.jpg" },
];

const ServiceCard = ({ service }) => (
  <article className="hot-service-card home-carousel-item">
    <img className="hot-service-photo" src={service.image} alt={`${service.title}服務過程`}
      width="1280" height="853" loading="lazy" decoding="async" />
    <div className="hot-service-copy">
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="hot-service-details">
        <strong>{service.price}</strong>
        <Link to={service.introPath} aria-label={`查看${service.title}服務介紹`}>
          查看服務介紹 <Icon name="chevron-right" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </article>
);

const renderTestimonialCard = (testimonial, index) => (
  <div className="testimonial-marquee-item" key={`${testimonial.id}-${index}`}>
    <div className="card h-100 border-0 shadow-soft">
      <div className="card-body testimonial-card-body">
        <p
          className="testimonial-stars"
          aria-label={`${testimonial.rating} 星評價`}
        >
          {"★".repeat(testimonial.rating)}
          {"☆".repeat(5 - testimonial.rating)}
        </p>
        <p className="mb-3 fst-italic">&ldquo;{testimonial.comment}&rdquo;</p>
        <p className="mb-1 fw-bold">- {testimonial.name}</p>
        <p className="mb-0 text-muted">{testimonial.source}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const heroRef = useRef(null);
  useLayoutEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)");
    const orientation = window.matchMedia("(orientation: portrait)");
    let frame;
    const freezeHeroHeight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = heroRef.current;
        if (mobile.matches) {
          hero?.style.setProperty("--hero-viewport-height", `${window.innerHeight}px`);
        } else {
          hero?.style.removeProperty("--hero-viewport-height");
        }
      });
    };
    // In-app browser toolbar resizing must not rescale the hero while scrolling.
    freezeHeroHeight();
    mobile.addEventListener("change", freezeHeroHeight);
    orientation.addEventListener("change", freezeHeroHeight);
    return () => {
      cancelAnimationFrame(frame);
      mobile.removeEventListener("change", freezeHeroHeight);
      orientation.removeEventListener("change", freezeHeroHeight);
    };
  }, []);
  const [isHomeContentLoading, setIsHomeContentLoading] = useState(true);
  const [homeContentError, setHomeContentError] = useState("");
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featuredPortfolio, setFeaturedPortfolio] = useState([]);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(() =>
    window.matchMedia("(min-width: 768px)").matches ? 3 : 1,
  );
  const serviceCarouselRef = useRef(null);
  const stylistCarouselRef = useRef(null);
  const [activeStylistIndex, setActiveStylistIndex] = useState(0);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const updateLayout = () => {
      setCardsPerPage(desktop.matches ? 3 : 1);
      serviceCarouselRef.current?.scrollTo({ left: 0 });
      stylistCarouselRef.current?.scrollTo({ left: 0 });
      setActiveServiceIndex(0);
      setActiveStylistIndex(0);
    };
    desktop.addEventListener("change", updateLayout);
    return () => desktop.removeEventListener("change", updateLayout);
  }, []);
  const moveService = (direction) => {
    const carousel = serviceCarouselRef.current;
    carousel.scrollBy({
      left: direction * carousel.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };
  const newsCarouselRef = useRef(null);
  const portfolioCarouselRef = useRef(null);
  const [customerTestimonials, setCustomerTestimonials] = useState(
    testimonials.map((comment, index) => ({
      id: `fallback-${index}`,
      name: "顧客",
      comment,
      rating: 5,
      source: "店內回饋",
    })),
  );

  useEffect(() => {
    let isMounted = true;

    Promise.allSettled([
      fetchSanityNews({ limit: 3 }),
      fetchSanityPortfolio({ limit: 3, latest: true }),
      fetchSanityTestimonials({ limit: 20 }),
    ])
      .then(([newsResult, portfolioResult, testimonialResult]) => {
        if (!isMounted) {
          return;
        }

        const newsItems =
          newsResult.status === "fulfilled" ? newsResult.value : [];
        const portfolioItems =
          portfolioResult.status === "fulfilled" ? portfolioResult.value : [];
        const testimonialItems =
          testimonialResult.status === "fulfilled" ? testimonialResult.value : [];

        setFeaturedNews(newsItems.map(mapNewsItem).filter(Boolean));
        setFeaturedPortfolio(portfolioItems.map(mapPortfolioItem).filter(Boolean));
        setActiveNewsIndex(0);
        setActivePortfolioIndex(0);

        if (testimonialItems.length > 0) {
          setCustomerTestimonials(
            testimonialItems.map(mapTestimonialItem).filter(Boolean),
          );
        }

        if (
          newsResult.status === "rejected" ||
          portfolioResult.status === "rejected" ||
          testimonialResult.status === "rejected"
        ) {
          setHomeContentError("部分首頁內容暫時無法載入，請稍後再試。");
        } else {
          setHomeContentError("");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsHomeContentLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".home-reveal");

    if (!revealItems.length) {
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
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [
    featuredNews.length,
    featuredPortfolio.length,
    customerTestimonials.length,
    isHomeContentLoading,
  ]);

  const syncCarouselIndex = (carouselRef, setIndex) => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const card = carousel.querySelector(".home-carousel-item");
    const itemWidth = card ? card.getBoundingClientRect().width : 1;
    const nextIndex = Math.round(carousel.scrollLeft / itemWidth);

    setIndex(nextIndex);
  };

  return (
    <div className="home">
      <section ref={heroRef} className="hero position-relative overflow-hidden">
        <div className="hero-inner">
          <div className="hero-copy text-center text-white">
            <p className="eyebrow">-Change Your Hair. Change Your -</p>
            <h1>Confidence</h1>
            <p className="subtext">
              嘉義市專業剪髮・染燙・頭皮養護・為你打造專屬質感髮型
            </p>
            <Link to="/booking" className="btn btn-primary btn-lg mt-4">
              立即線上預約
            </Link>
          </div>
        </div>
      </section>

      <section className="home-services py-5" aria-labelledby="home-services-title">
        <div className="container">
          {homeContentError ? (
            <div className="alert alert-warning home-reveal" role="alert">
              {homeContentError}
            </div>
          ) : null}
          <div className="d-flex flex-column align-items-center text-center gap-3 mb-4 home-reveal">
            <div>
              <h2 id="home-services-title" className="display-6 fw-bold section-line-title">熱門服務</h2>
              <p className="section-subtitle-en mb-0">Services</p>
            </div>
          </div>
          <div className="hot-service-carousel">
            <div className="hot-service-track" ref={serviceCarouselRef}
              role="group" aria-label="熱門服務滑動列表"
              onScroll={() => syncCarouselIndex(serviceCarouselRef, setActiveServiceIndex)}>
              {featuredServices.map((service) => (
                <ServiceCard key={service.introPath} service={service} />
              ))}
            </div>
            <div className="hot-service-controls">
              <button type="button" aria-label="上一項服務" disabled={activeServiceIndex === 0}
                onClick={() => moveService(-1)}>
                <Icon name="chevron-left" aria-hidden="true" />
              </button>
              <span aria-live="polite">{Math.ceil(activeServiceIndex / cardsPerPage) + 1} / {Math.ceil(featuredServices.length / cardsPerPage)}</span>
              <button type="button" aria-label="下一項服務"
                disabled={activeServiceIndex >= featuredServices.length - cardsPerPage}
                onClick={() => moveService(1)}>
                <Icon name="chevron-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {isHomeContentLoading || featuredPortfolio.length > 0 ? (
        <section className="home-featured-portfolio py-5">
          <div className="container">
            <div className="home-section-heading home-section-heading-centered home-reveal">
              <div>
                <h2 className="display-6 fw-bold section-line-title">
                  作品精選
                </h2>
                <p className="section-subtitle-en mb-0">Portfolio</p>
              </div>
            </div>
            <div className="home-carousel-shell home-reveal">
              <div
                className="home-carousel-track home-portfolio-track"
                ref={portfolioCarouselRef}
                onScroll={() =>
                  syncCarouselIndex(
                    portfolioCarouselRef,
                    setActivePortfolioIndex,
                  )
                }
              >
                {isHomeContentLoading
                  ? homeSkeletonItems.map((item) => (
                      <div className="home-carousel-item" key={`portfolio-skeleton-${item}`}>
                        <div className="home-portfolio-photo-link home-skeleton-card">
                          <div className="home-portfolio-photo home-skeleton-block" />
                        </div>
                      </div>
                    ))
                  : featuredPortfolio.map((item) => (
                      <div className="home-carousel-item" key={item.id}>
                        <Link
                          to={`/portfolio?category=${encodeURIComponent(item.category)}`}
                          className="home-portfolio-photo-link"
                          aria-label={`查看作品：${item.title || "作品"}`}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              srcSet={item.imageSrcSet}
                              sizes="(max-width: 767px) 100vw, 33vw"
                              alt={item.imageAlt}
                              className="home-portfolio-photo"
                              width="1000"
                              height="1250"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          <div className="card-body">
                            <p className="eyebrow text-muted mb-2">
                              {item.category}
                            </p>
                            <h3 className="card-title">{item.title.replace(/｜歡迎預約諮詢$/, "")}</h3>
                            <p className="card-text mb-1">{item.subtitle}</p>
                            {item.stylist ? (
                              <p className="mb-0 text-muted">
                                設計師：{item.stylist}
                              </p>
                            ) : null}
                            <span className="home-portfolio-detail">
                              查看作品 <Icon name="chevron-right" aria-hidden="true" />
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
              </div>
              {!isHomeContentLoading && featuredPortfolio.length > 1 ? (
                <>
                  <div className="home-carousel-count">
                    {activePortfolioIndex + 1} / {featuredPortfolio.length}
                  </div>
                  <div className="home-carousel-progress" aria-hidden="true">
                    <span
                      style={{
                        width: `${
                          ((activePortfolioIndex + 1) /
                            featuredPortfolio.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className="home-more-action home-reveal">
              <Link to="/portfolio" className="home-more-link">
                查看更多作品
                <Icon name="arrow-right-to-bracket" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {isHomeContentLoading || featuredNews.length > 0 ? (
        <section className="home-featured-news py-5 bg-soft">
          <div className="container">
            <div className="home-section-heading home-section-heading-centered home-reveal">
              <div>
                <h2 className="display-6 fw-bold section-line-title">
                  最新消息
                </h2>
                <p className="section-subtitle-en mb-0">News</p>
              </div>
            </div>
            <div className="home-carousel-shell home-reveal">
              <div
                className="home-carousel-track home-news-track"
                ref={newsCarouselRef}
                onScroll={() =>
                  syncCarouselIndex(newsCarouselRef, setActiveNewsIndex)
                }
              >
                {isHomeContentLoading
                  ? homeSkeletonItems.slice(0, 2).map((item) => (
                      <div className="home-carousel-item" key={`news-skeleton-${item}`}>
                        <article className="card home-preview-card news-card home-skeleton-card h-100">
                          <div className="home-preview-image home-skeleton-block" />
                          <div className="card-body">
                            <span className="home-skeleton-line short" />
                            <span className="home-skeleton-line title" />
                            <span className="home-skeleton-line" />
                            <span className="home-skeleton-line medium" />
                          </div>
                        </article>
                      </div>
                    ))
                  : featuredNews.map((item) => (
                      <div className="home-carousel-item" key={item.id}>
                        <article className="card home-preview-card news-card h-100">
                          {item.image ? (
                            <img
                              src={item.image}
                              srcSet={item.imageSrcSet}
                              sizes="(max-width: 767px) 100vw, 33vw"
                              alt={item.imageAlt}
                              className="home-preview-image"
                              width="900"
                              height="600"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          <div className="card-body">
                            <p className="eyebrow text-muted mb-2">{item.date}</p>
                            <h3 className="card-title">{item.title}</h3>
                            <Link to={getNewsPath(item)} className="news-read-more">
                              閱讀更多
                              <Icon
                                name="arrow-right-to-bracket"
                                aria-hidden="true"
                              />
                            </Link>
                          </div>
                        </article>
                      </div>
                    ))}
              </div>
              {!isHomeContentLoading && featuredNews.length > 1 ? (
                <>
                  <div className="home-carousel-count">
                    {activeNewsIndex + 1} / {featuredNews.length}
                  </div>
                  <div className="home-carousel-progress" aria-hidden="true">
                    <span
                      style={{
                        width: `${((activeNewsIndex + 1) / featuredNews.length) * 100}%`,
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
            <div className="home-more-action home-reveal">
              <Link to="/news" className="home-more-link">
                查看更多消息
                <Icon name="arrow-right-to-bracket" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="home-services home-stylists py-5" aria-labelledby="home-stylists-title">
        <div className="container">
          <div className="text-center mb-4">
            <h2 id="home-stylists-title" className="display-6 fw-bold">尋找你的設計師</h2>
          </div>
          <div className="hot-service-carousel">
            <div className="hot-service-track" ref={stylistCarouselRef}
              role="group" aria-label="設計師滑動列表"
              onScroll={() => syncCarouselIndex(stylistCarouselRef, setActiveStylistIndex)}>
              {displayedStylists.map((stylist) => (
                <article className="hot-service-card home-carousel-item" key={stylist.name}>
                  <img className="hot-service-photo home-stylist-photo" src={stylist.image}
                    alt={stylist.imageAlt} width="700" height="900" loading="lazy" decoding="async" />
                  <div className="hot-service-copy">
                    <h3>{stylist.name}</h3>
                    <div className="hot-service-details home-stylist-details">
                      <Link to={`/stylists#${encodeURIComponent(`stylist-${stylist.name}`)}`}
                        aria-label={`查看 ${stylist.name} 設計師介紹`}>
                        查看設計師介紹 <Icon name="chevron-right" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="hot-service-controls">
              <button type="button" aria-label="上一位設計師" disabled={activeStylistIndex === 0}
                onClick={() => stylistCarouselRef.current.scrollBy({ left: -stylistCarouselRef.current.clientWidth, behavior: "smooth" })}>
                <Icon name="chevron-left" aria-hidden="true" />
              </button>
              <span aria-live="polite">{Math.ceil(activeStylistIndex / cardsPerPage) + 1} / {Math.ceil(displayedStylists.length / cardsPerPage)}</span>
              <button type="button" aria-label="下一位設計師" disabled={activeStylistIndex >= displayedStylists.length - cardsPerPage}
                onClick={() => stylistCarouselRef.current.scrollBy({ left: stylistCarouselRef.current.clientWidth, behavior: "smooth" })}>
                <Icon name="chevron-right" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-soft">
        <div className="container">
          <div className="text-center mb-5 home-reveal">
            <h2 className="display-6 fw-bold section-line-title">客戶回響</h2>
            <p className="section-subtitle-en mb-0">Customer Reviews</p>
          </div>
          <div className="testimonial-marquee home-reveal" aria-label="客戶評價列表">
            <div className="testimonial-marquee-track">
              {customerTestimonials.map(renderTestimonialCard)}
              {customerTestimonials.map(renderTestimonialCard)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
