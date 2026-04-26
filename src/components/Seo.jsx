import { useEffect } from "react";

const siteUrl = "https://www.vovhairsalon.com";
const defaultImage = `${siteUrl}/assets/logo.jpg`;

const setMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const setCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const Seo = ({ title, description, path = "/", image = defaultImage }) => {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path}`;

    document.title = title;
    setCanonical(canonicalUrl);
    setMetaTag('meta[name="description"]', {
      name: "description",
      content: description,
    });
    setMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    setMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    setMetaTag('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    setMetaTag('meta[property="og:image"]', {
      property: "og:image",
      content: image,
    });
    setMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
  }, [description, image, path, title]);

  return null;
};

export default Seo;
