import {
  getSanityImageSrcSet,
  getSanityImageUrl,
} from "./sanity";

export const formatNewsDate = (date) => {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(date))
    .replaceAll("/", ".");
};

export const getNewsPath = (item) => `/news/${item.slug || item.id || item._id}`;

export const getNewsImageAlt = (item) =>
  item.imageAlt ||
  `VOV Hair Salon 嘉義市美髮最新消息 - ${item.title}，${item.summary}`;

const mapNewsGalleryImage = (image, fallbackAlt) => ({
  image: getSanityImageUrl(image.imageRef, {
    width: 1100,
    quality: 82,
    fit: "max",
  }),
  imageSrcSet: getSanityImageSrcSet(
    image.imageRef,
    [480, 720, 900, 1100, 1400],
    {
      quality: 82,
      fit: "max",
    }
  ),
  imageAlt: image.imageAlt || fallbackAlt,
});

export const mapSanityNewsItem = (item) => ({
  id: item._id,
  slug: item.slug,
  date: formatNewsDate(item.publishedAt),
  title: item.title,
  summary: item.summary,
  content: item.content,
  image: getSanityImageUrl(item.imageRef, {
    width: 900,
    quality: 80,
    fit: "max",
  }),
  imageSrcSet: getSanityImageSrcSet(item.imageRef, [360, 540, 720, 900, 1200], {
    quality: 80,
    fit: "max",
  }),
  lightboxImage: getSanityImageUrl(item.imageRef, {
    width: 1600,
    quality: 88,
    fit: "max",
  }),
  imageAlt: item.imageAlt,
  gallery: (item.gallery || [])
    .filter((image) => image?.imageRef)
    .map((image) => mapNewsGalleryImage(image, getNewsImageAlt(item))),
});
