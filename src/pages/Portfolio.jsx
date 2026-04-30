import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import ScrollTopButton from "../components/ScrollTopButton";
import {
  fetchSanityPortfolio,
  getSanityImageSrcSet,
  getSanityImageUrl,
} from "../lib/sanity";

const getImagePath = (image) => {
  if (!image) {
    return "";
  }

  return image.startsWith("/public/") ? image.replace("/public", "") : image;
};

const getPortfolioImageAlt = (item, category) =>
  item.imageAlt ||
  `VOV Hair Salon - ${category}作品，${item.title || "髮型作品"}，${item.subtitle || ""}，設計師 ${item.stylist || ""}`;

const portfolioCategoryOrder = ["剪髮作品", "燙髮作品", "染髮作品"];

const normalizePortfolioCategory = (category) => {
  const categoryText = category || "";

  if (
    categoryText.includes("剪髮") ||
    categoryText.includes("剪发") ||
    categoryText.includes("洗剪")
  ) {
    return "剪髮作品";
  }

  if (
    categoryText.includes("燙髮") ||
    categoryText.includes("烫发") ||
    categoryText.includes("燙") ||
    categoryText.includes("烫")
  ) {
    return "燙髮作品";
  }

  if (
    categoryText.includes("染髮") ||
    categoryText.includes("染发") ||
    categoryText.includes("染")
  ) {
    return "染髮作品";
  }

  return categoryText || "其他作品";
};

const groupPortfolioItems = (items) => {
  const groupedItems = items.reduce((groups, item) => {
    const category = normalizePortfolioCategory(item.category);

    return {
      ...groups,
      [category]: [...(groups[category] || []), item],
    };
  }, {});

  return Object.entries(groupedItems)
    .map(([category, grouped]) => ({
      category,
      items: grouped,
    }))
    .sort((a, b) => {
      const aIndex = portfolioCategoryOrder.indexOf(a.category);
      const bIndex = portfolioCategoryOrder.indexOf(b.category);

      if (aIndex === -1 && bIndex === -1) {
        return a.category.localeCompare(b.category, "zh-Hant");
      }

      if (aIndex === -1) {
        return 1;
      }

      if (bIndex === -1) {
        return -1;
      }

      return aIndex - bIndex;
    });
};

const mapSanityPortfolioItem = (item) => {
  const coverImage = {
    id: `${item._id}-cover`,
    image: getSanityImageUrl(item.imageRef, {
      width: 1000,
      quality: 80,
      fit: "max",
    }),
    imageSrcSet: getSanityImageSrcSet(item.imageRef, [480, 720, 1000, 1400], {
      quality: 80,
      fit: "max",
    }),
    imagePath: getSanityImageUrl(item.imageRef, {
      width: 1400,
      quality: 82,
      fit: "max",
    }),
    imageAlt: item.imageAlt,
  };
  const galleryImages = (item.gallery || [])
    .filter((galleryItem) => galleryItem.imageRef)
    .map((galleryItem, index) => ({
      id: `${item._id}-gallery-${index}`,
      image: getSanityImageUrl(galleryItem.imageRef, {
        width: 1000,
        quality: 80,
        fit: "max",
      }),
      imageSrcSet: getSanityImageSrcSet(
        galleryItem.imageRef,
        [480, 720, 1000, 1400],
        {
          quality: 80,
          fit: "max",
        },
      ),
      imagePath: getSanityImageUrl(galleryItem.imageRef, {
        width: 1400,
        quality: 82,
        fit: "max",
      }),
      imageAlt: galleryItem.imageAlt || item.imageAlt,
    }));

  return {
    id: item._id,
    title: item.title,
    category: item.category,
    subtitle: item.subtitle,
    stylist: item.stylist,
    note: item.note,
    image: coverImage.image,
    imageSrcSet: coverImage.imageSrcSet,
    lightboxImage: coverImage.imagePath,
    imageAlt: coverImage.imageAlt,
    galleryImages: [coverImage, ...galleryImages],
  };
};

const preloadPortfolioImage = (item) => {
  if (!item?.imagePath) {
    return;
  }

  const preloadImage = new Image();
  preloadImage.src = item.imagePath;
};

const Portfolio = () => {
  const [portfolioGroups, setPortfolioGroups] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loadedLightboxImages, setLoadedLightboxImages] = useState({});
  const [activeGroupIndexes, setActiveGroupIndexes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const lightboxTrackRef = useRef(null);
  const portfolioTrackRefs = useRef({});
  const portfolioSectionRef = useRef(null);
  const lightboxScrollFrameRef = useRef(null);
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const normalizedSelectedCategory = selectedCategory
    ? normalizePortfolioCategory(selectedCategory)
    : "";
  const visiblePortfolioGroups = useMemo(
    () =>
      normalizedSelectedCategory
        ? portfolioGroups.filter(
            (group) => group.category === normalizedSelectedCategory,
          )
        : portfolioGroups,
    [portfolioGroups, normalizedSelectedCategory],
  );
  const activeLightboxImages = useMemo(() => {
    if (!activeItem) {
      return [];
    }

    return activeItem.galleryImages?.length
      ? activeItem.galleryImages
      : [
          {
            id: `${activeItem.id}-cover`,
            imagePath: activeItem.lightboxImage || activeItem.image,
            imageAlt: activeItem.imageAlt,
          },
        ];
  }, [activeItem]);
  const hasMultipleImages = activeLightboxImages.length > 1;

  useEffect(() => {
    let isMounted = true;

    fetchSanityPortfolio()
      .then((items) => {
        if (!isMounted) {
          return;
        }

        setPortfolioGroups(groupPortfolioItems(items.map(mapSanityPortfolioItem)));
      })
      .catch(() => {
        if (isMounted) {
          setPortfolioGroups([]);
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
  }, []);

  useEffect(() => {
    if (!activeItem) {
      document.body.style.overflow = "";
      return undefined;
    }

    setLoadedLightboxImages({});

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (lightboxScrollFrameRef.current) {
        window.cancelAnimationFrame(lightboxScrollFrameRef.current);
      }

      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  useEffect(() => {
    const section = portfolioSectionRef.current;

    if (!section || isLoading) {
      return undefined;
    }

    const headings = Array.from(
      section.querySelectorAll(".portfolio-category-heading"),
    );

    if (headings.length === 0) {
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
        threshold: 0.35,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, [isLoading, visiblePortfolioGroups]);

  useEffect(() => {
    const track = lightboxTrackRef.current;

    if (!activeItem || !track) {
      return;
    }

    track.scrollTo({
      left: 0,
      behavior: "auto",
    });
  }, [activeItem]);

  useEffect(() => {
    if (!activeItem || !hasMultipleImages) {
      return;
    }

    const previousIndex =
      activeImageIndex === 0
        ? activeLightboxImages.length - 1
        : activeImageIndex - 1;
    const nextIndex =
      activeImageIndex === activeLightboxImages.length - 1
        ? 0
        : activeImageIndex + 1;

    preloadPortfolioImage(activeLightboxImages[previousIndex]);
    preloadPortfolioImage(activeLightboxImages[nextIndex]);
  }, [activeItem, activeImageIndex, activeLightboxImages, hasMultipleImages]);

  useEffect(() => {
    if (!activeItem || activeLightboxImages.length <= 1) {
      return;
    }

    activeLightboxImages.slice(1).forEach(preloadPortfolioImage);
  }, [activeItem, activeLightboxImages]);

  const syncPortfolioGroupIndex = (category) => {
    const track = portfolioTrackRefs.current[category];

    if (!track) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);

    setActiveGroupIndexes((currentIndexes) => ({
      ...currentIndexes,
      [category]: nextIndex,
    }));
  };

  const syncLightboxIndex = () => {
    const track = lightboxTrackRef.current;

    if (!track || activeLightboxImages.length === 0) {
      return;
    }

    if (lightboxScrollFrameRef.current) {
      window.cancelAnimationFrame(lightboxScrollFrameRef.current);
    }

    lightboxScrollFrameRef.current = window.requestAnimationFrame(() => {
      const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
      const safeIndex = Math.min(
        Math.max(nextIndex, 0),
        activeLightboxImages.length - 1,
      );

      setActiveImageIndex((currentIndex) =>
        safeIndex === currentIndex ? currentIndex : safeIndex,
      );
    });
  };

  const scrollLightboxToIndex = (nextIndex) => {
    const track = lightboxTrackRef.current;

    if (!track) {
      return;
    }

    track.scrollTo({
      left: track.clientWidth * nextIndex,
      behavior: "smooth",
    });
  };

  const goToPreviousImage = () => {
    const nextIndex =
      activeImageIndex === 0
        ? activeLightboxImages.length - 1
        : activeImageIndex - 1;

    scrollLightboxToIndex(nextIndex);
  };

  const goToNextImage = () => {
    const nextIndex =
      activeImageIndex === activeLightboxImages.length - 1
        ? 0
        : activeImageIndex + 1;

    scrollLightboxToIndex(nextIndex);
  };

  return (
    <section className="py-5" ref={portfolioSectionRef}>
      <PageHeader title="作品集" lead="Portfolio" />
      <div className="container">
        {isLoading ? (
          <LoadingState label="作品載入中" />
        ) : visiblePortfolioGroups.length > 0 ? (
          visiblePortfolioGroups.map((group) => (
            <div className="portfolio-category-section mb-5" key={group.category}>
              <div className="portfolio-category-heading">
                <h4 className="portfolio-category-title mb-0">
                  <span>{group.category}</span>
                </h4>
              </div>
              <div className="portfolio-carousel-shell">
                <div
                  className="portfolio-carousel-track"
                  ref={(node) => {
                    if (node) {
                      portfolioTrackRefs.current[group.category] = node;
                    } else {
                      delete portfolioTrackRefs.current[group.category];
                    }
                  }}
                  onScroll={() => syncPortfolioGroupIndex(group.category)}
                >
                {group.items.map((item) => {
                  const imagePath = getImagePath(item.image);
                  const imageAlt = getPortfolioImageAlt(item, group.category);

                  return (
                    <div
                      className="portfolio-carousel-item"
                      key={item.id || `${group.category}-${item.title}`}
                    >
                      <div className="portfolio-photo-card h-100">
                        {item.image ? (
                          <button
                            type="button"
                            className="portfolio-image-button"
                            onClick={() => {
                              setActiveImageIndex(0);
                              setActiveItem({
                                ...item,
                                category: group.category,
                                imagePath: item.lightboxImage || imagePath,
                              });
                            }}
                            aria-label={`放大查看 ${item.title}`}
                          >
                            <img
                              src={imagePath}
                              srcSet={item.imageSrcSet}
                              sizes="(max-width: 767px) 100vw, 50vw"
                              alt={imageAlt}
                              className="card-img-top portfolio-card-image"
                              width="900"
                              height="380"
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="portfolio-image-hint">查看詳情</span>
                          </button>
                        ) : (
                          <div
                            className="card-img-top portfolio-card-image bg-soft d-flex align-items-end"
                            style={{
                              backgroundImage:
                                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 100%)",
                            }}
                          >
                            <div className="p-4 text-white">目前尚無作品圖片</div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                </div>
                {group.items.length > 1 ? (
                  <>
                    <div className="home-carousel-count portfolio-carousel-count">
                      {(activeGroupIndexes[group.category] || 0) + 1} /{" "}
                      {group.items.length}
                    </div>
                    <div
                      className="home-carousel-progress portfolio-carousel-progress"
                      aria-hidden="true"
                    >
                      <span
                        style={{
                          width: `${
                            (((activeGroupIndexes[group.category] || 0) + 1) /
                              group.items.length) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <div className="card border-0 shadow-soft">
            <div className="card-body text-center">
              <p className="mb-0 text-muted">目前尚無作品。</p>
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
            <div
              className="portfolio-lightbox-track"
              ref={lightboxTrackRef}
              onScroll={syncLightboxIndex}
              aria-label="作品圖片滑動列表"
            >
              {activeLightboxImages.map((item, index) => (
                <div className="portfolio-lightbox-slide" key={item.id}>
                  <div className="portfolio-polaroid-frame">
                    <span className="portfolio-tape tape-top" aria-hidden="true" />
                    <span className="portfolio-tape tape-bottom" aria-hidden="true" />
                  <img
                    src={item.imagePath}
                    alt={item.imageAlt || getPortfolioImageAlt(activeItem, activeItem.category)}
                    className={`portfolio-lightbox-image${
                      loadedLightboxImages[item.id] ? " is-loaded" : ""
                    }`}
                    loading={index === activeImageIndex ? "eager" : "lazy"}
                    fetchPriority={index === activeImageIndex ? "high" : "auto"}
                    decoding="async"
                    onLoad={() =>
                      setLoadedLightboxImages((currentImages) => ({
                        ...currentImages,
                        [item.id]: true,
                      }))
                    }
                  />
                  </div>
                  {!loadedLightboxImages[item.id] ? (
                    <div className="portfolio-lightbox-loading" aria-hidden="true">
                      <div className="loading-scissor-line">
                        <span />
                        <img src="/assets/scissors.png" alt="" />
                      </div>
                      <p>照片載入中</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            {hasMultipleImages ? (
              <div
                className="portfolio-lightbox-progress"
                aria-label={`第 ${activeImageIndex + 1} 張，共 ${activeLightboxImages.length} 張`}
              >
                <span
                  style={{
                    width: `${
                      ((activeImageIndex + 1) / activeLightboxImages.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            ) : null}
            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  className="portfolio-lightbox-arrow previous"
                  onClick={goToPreviousImage}
                  aria-label="上一張圖片"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="portfolio-lightbox-arrow next"
                  onClick={goToNextImage}
                  aria-label="下一張圖片"
                >
                  ›
                </button>
              </>
            ) : null}
            <div className="portfolio-lightbox-caption">
              <p className="portfolio-lightbox-category mb-2">
                {activeItem.category}
              </p>
              <h5>{activeItem.title}</h5>
              {activeItem.subtitle ? (
                <p className="mb-1">{activeItem.subtitle}</p>
              ) : null}
              {activeItem.stylist ? (
                <p className="portfolio-lightbox-meta mb-1">
                  設計師：{activeItem.stylist}
                </p>
              ) : null}
              {activeItem.note ? (
                <p className="mb-0 text-muted">{activeItem.note}</p>
              ) : null}
              <Link
                to="/booking"
                className="news-read-more portfolio-booking-link"
                onClick={() => setActiveItem(null)}
              >
                預約這個髮型
                <Icon name="arrow-right-to-bracket" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
      <ScrollTopButton />
    </section>
  );
};

export default Portfolio;

