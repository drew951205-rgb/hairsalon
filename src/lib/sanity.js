import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "../../sanity.shared.js";

const legacyEnvProjectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const legacyEnvDataset = import.meta.env.VITE_SANITY_DATASET;
const legacyEnvApiVersion = import.meta.env.VITE_SANITY_API_VERSION;

const assertLegacyEnvMatchesSharedConfig = (name, currentValue, expectedValue) => {
  if (currentValue && currentValue !== expectedValue) {
    throw new Error(
      `${name}="${currentValue}" does not match shared Sanity config "${expectedValue}". Remove the stale env value or update sanity.shared.js.`,
    );
  }
};

assertLegacyEnvMatchesSharedConfig(
  "VITE_SANITY_PROJECT_ID",
  legacyEnvProjectId,
  SANITY_PROJECT_ID,
);
assertLegacyEnvMatchesSharedConfig(
  "VITE_SANITY_DATASET",
  legacyEnvDataset,
  SANITY_DATASET,
);
assertLegacyEnvMatchesSharedConfig(
  "VITE_SANITY_API_VERSION",
  legacyEnvApiVersion,
  SANITY_API_VERSION,
);

const projectId = SANITY_PROJECT_ID;
const dataset = SANITY_DATASET;
const apiVersion = SANITY_API_VERSION;

const hasSanityConfig = Boolean(projectId && dataset);

const buildQueryUrl = (query) => {
  const encodedQuery = encodeURIComponent(query);

  return `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`;
};

const newsFilter = `_type == "news" && isPublished == true`;

const newsFields = `{
    _id,
    title,
    "slug": slug.current,
    summary,
    content,
    publishedAt,
    "imageRef": image.asset._ref,
    "imageAlt": image.alt,
    "gallery": gallery[]{
      "imageRef": asset._ref,
      "imageAlt": alt
    }
  }`;

export const getSanityImageUrl = (assetRef, options = {}) => {
  if (!assetRef || !projectId || !dataset) {
    return "";
  }

  const match = assetRef.match(/^image-(.+)-(\d+x\d+)-([a-z0-9]+)$/i);

  if (!match) {
    return "";
  }

  const [, id, dimensions, extension] = match;
  const params = new URLSearchParams();

  if (options.width) {
    params.set("w", String(options.width));
  }

  if (options.height) {
    params.set("h", String(options.height));
  }

  if (options.quality) {
    params.set("q", String(options.quality));
  }

  if (options.fit) {
    params.set("fit", options.fit);
  }

  if (options.autoFormat !== false) {
    params.set("auto", "format");
  }

  const queryString = params.toString();
  const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${extension}`;

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const getSanityImageSrcSet = (assetRef, widths, options = {}) =>
  widths
    .map(
      (width) =>
        `${getSanityImageUrl(assetRef, { ...options, width })} ${width}w`
    )
    .join(", ");

export const fetchSanityNews = async ({ limit, offset = 0 } = {}) => {
  if (!hasSanityConfig) {
    return [];
  }

  const safeOffset = Math.max(Number(offset) || 0, 0);
  const safeLimit = Number(limit);
  const slice =
    Number.isFinite(safeLimit) && safeLimit > 0
      ? `[${safeOffset}...${safeOffset + safeLimit}]`
      : "";
  const query = `*[${newsFilter}] | order(publishedAt desc) ${slice} ${newsFields}`;

  const response = await fetch(buildQueryUrl(query));

  if (!response.ok) {
    throw new Error("Failed to fetch Sanity news");
  }

  const data = await response.json();

  return Array.isArray(data.result) ? data.result : [];
};

export const fetchSanityNewsPage = async (page = 1, pageSize = 8) => {
  if (!hasSanityConfig) {
    return {
      items: [],
      total: 0,
    };
  }

  const safePage = Math.max(Number(page) || 1, 1);
  const safePageSize = Math.max(Number(pageSize) || 8, 1);
  const start = (safePage - 1) * safePageSize;
  const end = start + safePageSize;
  const query = `{
    "items": *[${newsFilter}] | order(publishedAt desc) [${start}...${end}] ${newsFields},
    "total": count(*[${newsFilter}])
  }`;

  const response = await fetch(buildQueryUrl(query));

  if (!response.ok) {
    throw new Error("Failed to fetch Sanity news page");
  }

  const data = await response.json();

  return {
    items: Array.isArray(data.result?.items) ? data.result.items : [],
    total: Number(data.result?.total) || 0,
  };
};

export const fetchSanityNewsItem = async (slugOrId) => {
  if (!hasSanityConfig || !slugOrId) {
    return null;
  }

  const safeSlugOrId = JSON.stringify(slugOrId);
  const query = `*[
    _type == "news" &&
    isPublished == true &&
    (slug.current == ${safeSlugOrId} || _id == ${safeSlugOrId})
  ][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    content,
    publishedAt,
    "imageRef": image.asset._ref,
    "imageAlt": image.alt,
    "gallery": gallery[]{
      "imageRef": asset._ref,
      "imageAlt": alt
    }
  }`;

  const response = await fetch(buildQueryUrl(query));

  if (!response.ok) {
    throw new Error("Failed to fetch Sanity news item");
  }

  const data = await response.json();

  return data.result || null;
};

export const fetchSanityPortfolio = async ({
  limit,
  latest = false,
  category,
} = {}) => {
  if (!hasSanityConfig) {
    return [];
  }

  const safeLimit = Number(limit);
  const slice =
    Number.isFinite(safeLimit) && safeLimit > 0 ? `[0...${safeLimit}]` : "";
  const order = latest ? "_createdAt desc" : "category asc, order asc, _createdAt desc";
  const categoryFilter = category
    ? ` && category == ${JSON.stringify(category)}`
    : "";
  const query = `*[_type == "portfolio" && isPublished == true${categoryFilter}] | order(${order}) ${slice} {
    _id,
    title,
    category,
    subtitle,
    stylist,
    note,
    order,
    "imageRef": image.asset._ref,
    "imageAlt": image.alt,
    "gallery": gallery[]{
      "imageRef": asset._ref,
      "imageAlt": alt
    }
  }`;

  const response = await fetch(buildQueryUrl(query));

  if (!response.ok) {
    throw new Error("Failed to fetch Sanity portfolio");
  }

  const data = await response.json();

  return Array.isArray(data.result) ? data.result : [];
};

export const fetchSanityTestimonials = async ({ limit } = {}) => {
  if (!hasSanityConfig) {
    return [];
  }

  const safeLimit = Number(limit);
  const slice =
    Number.isFinite(safeLimit) && safeLimit > 0 ? `[0...${safeLimit}]` : "";
  const query = `*[_type == "testimonial" && isPublished == true] | order(order asc, _createdAt desc) ${slice} {
    _id,
    name,
    comment,
    rating,
    source,
    order
  }`;

  const response = await fetch(buildQueryUrl(query));

  if (!response.ok) {
    throw new Error("Failed to fetch Sanity testimonials");
  }

  const data = await response.json();

  return Array.isArray(data.result) ? data.result : [];
};
