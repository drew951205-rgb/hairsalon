import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LoadingState from "../components/LoadingState";
import Icon from "../components/Icon";
import ScrollTopButton from "../components/ScrollTopButton";
import { fetchSanityNewsPage } from "../lib/sanity";
import { getNewsImageAlt, getNewsPath, mapSanityNewsItem } from "../lib/news";

const newsPageSize = 8;

const getImagePath = (image) => {
  if (!image) {
    return "";
  }

  return image.startsWith("/public/") ? image.replace("/public", "") : image;
};

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNewsCount, setTotalNewsCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    fetchSanityNewsPage(currentPage, newsPageSize)
      .then(({ items, total }) => {
        if (!isMounted) {
          return;
        }

        setNewsItems(items.map(mapSanityNewsItem));
        setTotalNewsCount(total);
      })
      .catch(() => {
        if (isMounted) {
          setNewsItems([]);
          setTotalNewsCount(0);
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
  }, [currentPage]);

  useEffect(() => {
    if (!activeItem) {
      document.body.style.overflow = "";
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  const totalPages = Math.max(Math.ceil(totalNewsCount / newsPageSize), 1);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const goToPage = (nextPage) => {
    setCurrentPage(nextPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-5">
      <PageHeader title="最新消息" lead="News" />
      <div className="scissor-divider" aria-hidden="true">
        <span />
        <img src="/assets/scissors.png" alt="" />
      </div>
      <div className="container">
        {isLoading ? (
          <LoadingState label="最新消息載入中" />
        ) : newsItems.length > 0 ? (
          <>
            <div className="row gy-4">
              {newsItems.map((item) => {
                const imagePath = getImagePath(item.image);
                const imageAlt = item.imageAlt || getNewsImageAlt(item);

                return (
                  <div
                    className="col-md-6 col-lg-4"
                    key={item.id || `${item.date}-${item.title}`}
                  >
                    <article className="card h-100 news-card">
                      {item.image ? (
                        <button
                          type="button"
                          className="portfolio-image-button"
                          onClick={() =>
                            setActiveItem({
                              ...item,
                              imagePath: item.lightboxImage || imagePath,
                            })
                          }
                          aria-label={`放大查看${item.title}`}
                        >
                          <img
                            src={imagePath}
                            srcSet={item.imageSrcSet}
                            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                            alt={imageAlt}
                            className="card-img-top portfolio-card-image"
                            width="900"
                            height="380"
                            loading="lazy"
                            decoding="async"
                          />
                          <span className="portfolio-image-hint">點擊放大</span>
                        </button>
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
                );
              })}
            </div>
            {totalPages > 1 ? (
              <nav className="news-pagination" aria-label="最新消息分頁">
                <button
                  type="button"
                  className="news-page-button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={!canGoPrevious}
                >
                  上一頁
                </button>
                <span className="news-page-status">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  className="news-page-button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={!canGoNext}
                >
                  下一頁
                </button>
              </nav>
            ) : null}
          </>
        ) : (
          <div className="card border-0 shadow-soft">
            <div className="card-body text-center">
              <p className="mb-0 text-muted">目前尚無最新消息。</p>
            </div>
          </div>
        )}
      </div>

      {activeItem ? (
        <div
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} 圖片預覽`}
          onClick={() => setActiveItem(null)}
        >
          <div
            className="portfolio-lightbox-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="portfolio-lightbox-close"
              onClick={() => setActiveItem(null)}
              aria-label="關閉圖片預覽"
            >
              ×
            </button>
            <img
              src={activeItem.imagePath}
              alt={activeItem.imageAlt || getNewsImageAlt(activeItem)}
              className="portfolio-lightbox-image"
              decoding="async"
            />
            <div className="portfolio-lightbox-caption">
              <h5>{activeItem.title}</h5>
              <p className="mb-1">{activeItem.summary}</p>
              <p className="mb-0 text-muted">{activeItem.date}</p>
            </div>
          </div>
        </div>
      ) : null}
      <ScrollTopButton />
    </section>
  );
};

export default News;
