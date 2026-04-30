import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import LoadingState from "../components/LoadingState";
import ScrollTopButton from "../components/ScrollTopButton";
import {
  fetchSanityPortfolio,
  getSanityImageSrcSet,
  getSanityImageUrl,
} from "../lib/sanity";

const defaultTrustTags = ["價格透明", "專人諮詢", "可線上預約"];

const mapPortfolioPreview = (item, serviceName) => ({
  id: item._id,
  title: item.title,
  subtitle: item.subtitle,
  stylist: item.stylist,
  image: getSanityImageUrl(item.imageRef, {
    width: 760,
    quality: 80,
    fit: "max",
  }),
  imageSrcSet: getSanityImageSrcSet(item.imageRef, [360, 540, 760, 1000], {
    quality: 80,
    fit: "max",
  }),
  imageAlt:
    item.imageAlt ||
    `VOV Hair Salon ${serviceName}作品 - ${item.title || "髮型案例"}`,
});

const ServiceSeoPage = ({ config }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const portfolioPath = `/portfolio?category=${encodeURIComponent(
    config.portfolioCategory,
  )}`;
  const trustTags = config.trustTags || defaultTrustTags;
  const priceItems = config.priceItems || [];

  useEffect(() => {
    let isMounted = true;

    fetchSanityPortfolio({
      category: config.portfolioCategory,
      limit: 6,
    })
      .then((items) => {
        if (!isMounted) {
          return;
        }

        setPortfolioItems(
          items.map((item) => mapPortfolioPreview(item, config.shortName)),
        );
      })
      .catch(() => {
        if (isMounted) {
          setPortfolioItems([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [config.portfolioCategory, config.shortName]);

  return (
    <article className="seo-landing">
      <section className="seo-hero">
        <div className="container seo-hero-grid">
          <div>
            <p className="eyebrow text-muted mb-2">{config.eyebrow}</p>
            <h1>{config.title}</h1>
            <p className="seo-hero-lead">{config.lead}</p>
            <div className="seo-trust-tags" aria-label="服務特色">
              {trustTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="seo-hero-actions">
              <Link to="/booking" className="seo-action-primary">
                點我立即線上預約
              </Link>
              <span className="seo-action-divider" aria-hidden="true">
                <Icon name="scissors" />
              </span>
              <Link to={portfolioPath} className="seo-action-secondary">
                查看{config.shortName}作品
                <Icon name="arrow-right-to-bracket" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="seo-price-card">
            <p className="eyebrow text-muted mb-2">Price</p>
            <h2>{config.priceTitle}</h2>
            <p className="seo-price">{config.price}</p>
            {priceItems.length ? (
              <div className="seo-price-list" aria-label={`${config.shortName}價格明細`}>
                {priceItems.map((item) => (
                  <div className="seo-price-row" key={item.name}>
                    <div>
                      <h3>{item.name}</h3>
                      {item.note ? <p>{item.note}</p> : null}
                    </div>
                    <strong>{item.price}</strong>
                  </div>
                ))}
              </div>
            ) : null}
            <p className="text-muted mb-0">{config.priceNote}</p>
          </div>
        </div>
      </section>

      <section className="py-5 bg-soft">
        <div className="container">
          <div className="seo-section-heading">
            <p className="eyebrow text-muted mb-2">Portfolio</p>
            <h2>精選{config.shortName}作品</h2>
          </div>
          {isLoading ? (
            <LoadingState label={`${config.shortName}作品載入中`} />
          ) : portfolioItems.length > 0 ? (
            <div className="seo-portfolio-grid">
              {portfolioItems.map((item) => (
                <Link
                  to={portfolioPath}
                  className="seo-portfolio-photo-link"
                  key={item.id}
                  aria-label={`查看${config.shortName}作品：${item.title || "作品"}`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      srcSet={item.imageSrcSet}
                      sizes="(max-width: 767px) 100vw, 33vw"
                      alt={item.imageAlt}
                      className="seo-portfolio-photo"
                      width="800"
                      height="1000"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div className="card border-0 shadow-soft">
              <div className="card-body text-center">
                <p className="mb-0 text-muted">
                  目前尚無{config.shortName}作品，之後上架會自動出現在這裡。
                </p>
              </div>
            </div>
          )}
          <div className="home-more-action">
            <Link to={portfolioPath} className="home-more-link">
              查看更多{config.shortName}作品
              <Icon name="arrow-right-to-bracket" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="seo-section-heading">
            <p className="eyebrow text-muted mb-2">Best For</p>
            <h2>適合對象</h2>
          </div>
          <div className="seo-feature-grid seo-card-slider">
            {config.audience.map((item) => (
              <div className="card" key={item.title}>
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="seo-slider-hint">左右滑動，找到最符合你的需求</p>
        </div>
      </section>

      {config.process?.length ? (
        <section className="py-5 seo-process-section">
          <div className="container">
            <div className="seo-section-heading">
              <p className="eyebrow text-muted mb-2">Process</p>
              <h2>{config.shortName}服務流程</h2>
            </div>
            <div className="seo-process-grid seo-card-slider">
              {config.process.map((step, index) => (
                <div className="seo-process-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
            <p className="seo-slider-hint">左右滑動，了解完整服務流程</p>
          </div>
        </section>
      ) : null}

      <section className="py-5">
        <div className="container">
          <div className="seo-faq-card">
            <p className="eyebrow text-muted mb-2">FAQ</p>
            <h2>{config.shortName}常見問題</h2>
            <div className="seo-faq-list">
              {config.faq.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="seo-cta">
        <div className="container text-center">
          <p className="eyebrow text-muted mb-2">Book Now</p>
          <h2>{config.ctaTitle}</h2>
          <p className="text-muted">{config.ctaText}</p>
          <Link to="/booking" className="btn btn-primary btn-lg">
            立即線上預約
          </Link>
        </div>
      </section>
      <ScrollTopButton />
    </article>
  );
};

export default ServiceSeoPage;
