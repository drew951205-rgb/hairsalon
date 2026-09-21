import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CONVERSIONS = {
  bookingPage: "AW-10787558077/Gu-ECJPs7f8cEL2l9Jco",
  lineClick: "AW-10787558077/YTnGCJbs7f8cEL2l9Jco",
  mapClick: "AW-10787558077/tGmnCJns7f8cEL2l9Jco",
};

const normalizeText = (value) =>
  String(value || "").replace(/\s+/g, " ").trim().slice(0, 120);

const getTrackingState = () => {
  window.dataLayer = window.dataLayer || [];
  window.__vovGoogleAdsConversions = window.__vovGoogleAdsConversions || {
    sent: {},
  };

  return window.__vovGoogleAdsConversions;
};

const sendConversion = (key, sendTo, extraParams = {}) => {
  const state = getTrackingState();

  if (state.sent[key]) {
    return;
  }

  state.sent[key] = true;

  window.dataLayer.push({
    event: "vov_google_ads_conversion",
    conversion_key: key,
    send_to: sendTo,
    page_location: window.location.href,
    ...extraParams,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: sendTo,
      value: 1.0,
      currency: "TWD",
    });
  }
};

const closestLink = (element) => {
  let current = element;

  while (current && current !== document) {
    if (current.tagName && current.tagName.toLowerCase() === "a") {
      return current;
    }

    current = current.parentNode;
  }

  return null;
};

const classifyHref = (href) => {
  const normalized = String(href || "").toLowerCase();

  if (normalized.includes("line.me") || normalized.includes("page.line.me")) {
    return {
      key: "line_click",
      sendTo: CONVERSIONS.lineClick,
    };
  }

  if (
    normalized.includes("maps.app.goo.gl") ||
    normalized.includes("google.com/maps") ||
    normalized.includes("goo.gl/maps")
  ) {
    return {
      key: "map_click",
      sendTo: CONVERSIONS.mapClick,
    };
  }

  return null;
};

const GoogleAdsConversionTracking = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.replace(/\/$/, "") === "/booking") {
      sendConversion("booking_page_view", CONVERSIONS.bookingPage);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event) => {
      const link = closestLink(event.target);

      if (!link) {
        return;
      }

      const href = link.getAttribute("href") || link.href || "";
      const conversion = classifyHref(href);

      if (!conversion) {
        return;
      }

      sendConversion(conversion.key, conversion.sendTo, {
        link_url: link.href || href,
        link_text: normalizeText(link.textContent),
      });
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
};

export default GoogleAdsConversionTracking;
