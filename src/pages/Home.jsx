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

const serviceIcons = [
  {
    type: "icon",
    value: "scissors",
    alt: "剪髮服務 icon",
  },
  {
    type: "image",
    value: "/assets/hair-color.png",
    alt: "染髮服務 icon",
  },
  {
    type: "image",
    value: "/assets/hair.png",
    alt: "燙髮服務 icon",
  },
  {
    type: "image",
    value: "/assets/scalp care.webp",
    alt: "高壓氧外泌體毛囊再生頭皮SPA服務 icon",
  },
  {
    type: "image",
    value: "/assets/scalp care.webp",
    alt: "綜效頭皮SPA含洗服務 icon",
  },
];

const renderServiceIcon = (index) => {
  const icon = serviceIcons[index % services.length];

  if (!icon) {
    return null;
  }

  return (
    <div className="service-motion-icon" aria-hidden={icon.type === "icon"}>
      {icon.type === "icon" ? (
        <Icon name={icon.value} />
      ) : (
        <img src={icon.value} alt={icon.alt} />
      )}
    </div>
  );
};

const serviceIntroPaths = [
  "/chiayi-haircut",
  "/chiayi-hair-color",
  "/chiayi-perm",
  "/chiayi-exosome-scalp-spa",
  "/chiayi-scalp-spa",
];

const homeSkeletonItems = Array.from({ length: 3 }, (_, index) => index);

const getServiceIntroPath = (index) =>
  serviceIntroPaths[index % services.length] || "";

const renderServiceCard = (service, index, className = "") => (
  <article
    className={`card service-marquee-card border-0 shadow-soft ${className}`}
    key={`${service.title}-${index}`}
  >
    <div className="card-body">
      <div className="service-motion-topline">
        <p className="service-motion-number">
          {String((index % services.length) + 1).padStart(2, "0")}
        </p>
        {renderServiceIcon(index)}
      </div>
      <h5 className="card-title service-card-title">{service.title}</h5>
      <p className="card-text">{service.description}</p>
      <p className="mb-1 text-muted">{service.price}</p>
      {getServiceIntroPath(index) ? (
        <Link
          to={getServiceIntroPath(index)}
          className="news-read-more service-more-link"
        >
          查看服務介紹
          <Icon name="arrow-right-to-bracket" aria-hidden="true" />
        </Link>
      ) : null}
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
  const [isHomeContentLoading, setIsHomeContentLoading] = useState(true);
  const [homeContentError, setHomeContentError] = useState("");
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featuredPortfolio, setFeaturedPortfolio] = useState([]);
  const [activeNewsIndex, setActiveNewsIndex] = useState(0);
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
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
      <section className="hero position-relative overflow-hidden">
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

      <section className="py-5">
        <div className="container">
          {homeContentError ? (
            <div className="alert alert-warning home-reveal" role="alert">
              {homeContentError}
            </div>
          ) : null}
          <div className="d-flex flex-column align-items-center text-center gap-3 mb-4 home-reveal">
            <div>
              <h2 className="display-6 fw-bold section-line-title">熱門服務</h2>
              <p className="section-subtitle-en mb-0">Services</p>
            </div>
          </div>
          <div className="row gy-4 service-desktop-grid">
            {services.map((service, index) => (
              <div key={service.title} className="col-md-6 col-xl-3">
                {renderServiceCard(service, index, "h-100 home-reveal")}
              </div>
            ))}
          </div>
          <div className="service-marquee home-reveal" aria-label="?梢???皛??”">
            <div className="service-marquee-track">
              {services.map((service, index) =>
                renderServiceCard(service, index),
              )}
            </div>
          </div>
          <p className="service-motion-hint">左右滑動，找到最適合你的服務</p>
        </div>
      </section>

      {isHomeContentLoading || featuredPortfolio.length > 0 ? (
        <section className="py-5">
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
                          to="/portfolio"
                          className="home-portfolio-photo-link"
                          aria-label={`查看作品：${item.title || "作品"}`}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              srcSet={item.imageSrcSet}
                              sizes="(max-width: 767px) 100vw, 33vw"
                              alt={item.imageAlt}
                              className="home-portfolio-photo"                            width="800"
                            height="1000"                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          <div className="card-body">
                            <p className="eyebrow text-muted mb-2">
                              {item.category}
                            </p>
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text mb-1">{item.subtitle}</p>
                            {item.stylist ? (
                              <p className="mb-0 text-muted">
                                設計師：{item.stylist}
                              </p>
                            ) : null}
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
        <section className="py-5 bg-soft">
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
                              sizes="(max-width: 767px) 100vw, 50vw"
                              alt={item.imageAlt}
                              className="home-preview-image"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          <div className="card-body">
                            <p className="eyebrow text-muted mb-2">{item.date}</p>
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.summary}</p>
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
