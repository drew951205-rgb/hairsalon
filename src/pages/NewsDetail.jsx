import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import LoadingState from "../components/LoadingState";
import ScrollTopButton from "../components/ScrollTopButton";
import Seo from "../components/Seo";
import { fetchSanityNewsItem } from "../lib/sanity";
import { getNewsImageAlt, mapSanityNewsItem } from "../lib/news";

const getNewsGalleryImages = (newsItem) => {
  if (!newsItem) {
    return [];
  }

  return [
    ...(newsItem.image
      ? [
          {
            image: newsItem.image,
            imageSrcSet: newsItem.imageSrcSet,
            imageAlt: getNewsImageAlt(newsItem),
          },
        ]
      : []),
    ...newsItem.gallery,
  ];
};

const preloadGalleryImage = (image) => {
  if (!image?.image) {
    return;
  }

  const preloadImage = new Image();

  if (image.imageSrcSet) {
    preloadImage.srcset = image.imageSrcSet;
    preloadImage.sizes = "(max-width: 767px) 100vw, 860px";
  }

  preloadImage.src = image.image;
};

const NewsDetail = () => {
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const galleryTrackRef = useRef(null);
  const galleryImages = useMemo(
    () => getNewsGalleryImages(newsItem),
    [newsItem],
  );
  const hasMultipleImages = galleryImages.length > 1;

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    fetchSanityNewsItem(slug)
      .then((item) => {
        if (!isMounted) {
          return;
        }

        setNewsItem(item ? mapSanityNewsItem(item) : null);
        setActiveImageIndex(0);
      })
      .catch(() => {
        if (isMounted) {
          setNewsItem(null);
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
  }, [slug]);

  useEffect(() => {
    const track = galleryTrackRef.current;

    if (!track) {
      return;
    }

    track.scrollTo({
      left: 0,
      behavior: "auto",
    });
  }, [slug]);

  useEffect(() => {
    if (!hasMultipleImages) {
      return;
    }

    const previousIndex =
      activeImageIndex === 0 ? galleryImages.length - 1 : activeImageIndex - 1;
    const nextIndex =
      activeImageIndex === galleryImages.length - 1 ? 0 : activeImageIndex + 1;

    preloadGalleryImage(galleryImages[previousIndex]);
    preloadGalleryImage(galleryImages[nextIndex]);
  }, [activeImageIndex, galleryImages, hasMultipleImages]);

  if (isLoading) {
    return (
      <section className="py-5">
        <div className="container">
          <LoadingState label="最新消息載入中" />
        </div>
      </section>
    );
  }

  if (!newsItem) {
    return (
      <section className="py-5">
        <Seo
          title="找不到最新消息 | VOV Hair Salon"
          description="找不到這則 VOV Hair Salon 最新消息，請回到最新消息列表查看其他內容。"
          path={`/news/${slug}`}
        />
        <div className="container">
          <div className="card border-0 shadow-soft">
            <div className="card-body text-center">
              <p className="eyebrow text-muted mb-2">News</p>
              <h1 className="h3 fw-bold">找不到這則最新消息</h1>
              <p className="text-muted">
                這則消息可能已下架，歡迎回到最新消息查看更多店內動態。
              </p>
              <Link to="/news" className="btn btn-primary">
                回最新消息
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const description = newsItem.summary || "VOV Hair Salon 最新消息";
  const content = newsItem.content || newsItem.summary || "";

  const syncGalleryIndex = () => {
    const track = galleryTrackRef.current;

    if (!track) {
      return;
    }

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    setActiveImageIndex(Math.min(Math.max(nextIndex, 0), galleryImages.length - 1));
  };

  const scrollToImage = (nextIndex) => {
    const track = galleryTrackRef.current;

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
      activeImageIndex === 0 ? galleryImages.length - 1 : activeImageIndex - 1;

    scrollToImage(nextIndex);
  };

  const goToNextImage = () => {
    const nextIndex =
      activeImageIndex === galleryImages.length - 1 ? 0 : activeImageIndex + 1;

    scrollToImage(nextIndex);
  };

  return (
    <article className="news-detail py-5">
      <Seo
        title={`${newsItem.title} | VOV Hair Salon 最新消息`}
        description={description}
        path={`/news/${newsItem.slug || newsItem.id}`}
        image={newsItem.image}
      />
      <div className="container">
        <Link to="/news" className="news-back-link">
          <Icon name="arrow-left" aria-hidden="true" />
          回最新消息
        </Link>

        <header className="news-detail-header">
          <p className="eyebrow text-muted mb-2">{newsItem.date}</p>
          <h1>{newsItem.title}</h1>
          <p>{newsItem.summary}</p>
        </header>

        {galleryImages.length > 0 ? (
          <div className="news-detail-media">
            <div
              className="news-detail-gallery-track"
              ref={galleryTrackRef}
              onScroll={syncGalleryIndex}
              aria-label="最新消息圖片滑動區"
            >
              {galleryImages.map((image, index) => (
                <div
                  className="news-detail-gallery-slide"
                  key={`${image.image}-${index}`}
                >
                  <img
                    src={image.image}
                    srcSet={image.imageSrcSet}
                    sizes="(max-width: 767px) 100vw, 860px"
                    alt={image.imageAlt}
                    className="news-detail-image"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  className="news-gallery-arrow previous"
                  onClick={goToPreviousImage}
                  aria-label="上一張照片"
                >
                  <Icon name="chevron-left" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="news-gallery-arrow next"
                  onClick={goToNextImage}
                  aria-label="下一張照片"
                >
                  <Icon name="chevron-right" aria-hidden="true" />
                </button>
              </>
            ) : null}
            {hasMultipleImages ? (
              <div className="news-gallery-count" aria-live="polite">
                {activeImageIndex + 1} / {galleryImages.length}
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="news-detail-body">
          {content.split("\n").map((paragraph, index) =>
            paragraph.trim() ? <p key={`${paragraph}-${index}`}>{paragraph}</p> : null,
          )}
        </div>

        <div className="news-detail-actions">
          <Link to="/booking" className="news-detail-action-link">
            立即線上預約
            <Icon name="arrow-right-to-bracket" aria-hidden="true" />
          </Link>
          <Link to="/news" className="news-detail-action-link">
            查看其他消息
            <Icon name="arrow-right-to-bracket" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <ScrollTopButton />
    </article>
  );
};

export default NewsDetail;
