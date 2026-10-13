const CONVERSIONS = {
  bookingPage: "AW-10787558077/Gu-ECJPs7f8cEL2l9Jco",
  lineClick: "AW-10787558077/YTnGCJbs7f8cEL2l9Jco",
  mapClick: "AW-10787558077/tGmnCJns7f8cEL2l9Jco",
};

const contactConversions = new Map([
  ["https://line.me/R/ti/p/@ane1336b", CONVERSIONS.lineClick],
  ["https://maps.app.goo.gl/ypkRCadnrvm7Yyq77", CONVERSIONS.mapClick],
]);
const activeRoots = new WeakMap();
const handledClicks = new WeakSet();

const queueConversion = (trackingWindow, sendTo) => {
  try {
    if (typeof trackingWindow?.gtag !== "function") {
      return false;
    }
    trackingWindow.gtag("event", "conversion", {
      send_to: sendTo,
      value: 1.0,
      currency: "TWD",
    });
    return true;
  } catch {
    // Tracking failure must not interrupt navigation or mark an event as sent.
    return false;
  }
};

export const sendBookingPageConversion = (trackingWindow) => {
  if (trackingWindow?.__vovGoogleAdsConversions?.sent?.booking_page_view) {
    return false;
  }
  if (!queueConversion(trackingWindow, CONVERSIONS.bookingPage)) {
    return false;
  }

  const state = trackingWindow.__vovGoogleAdsConversions || { sent: {} };
  state.sent = state.sent || {};
  state.sent.booking_page_view = true;
  trackingWindow.__vovGoogleAdsConversions = state;
  return true;
};

export const installAdsClickTracking = (rootElement) => {
  if (!rootElement) {
    return () => {};
  }
  const existingCleanup = activeRoots.get(rootElement);
  if (existingCleanup) {
    return existingCleanup;
  }

  const handleClick = (event) => {
    if (event.defaultPrevented || event.button > 0 || handledClicks.has(event)) {
      return;
    }

    try {
      const target = event.target;
      const element = target?.closest ? target : target?.parentElement;
      const anchor = element?.closest("a[href]");
      if (!anchor || !rootElement.contains(anchor)) {
        return;
      }

      const url = new URL(anchor.href, rootElement.ownerDocument.baseURI);
      if (url.username || url.password) {
        return;
      }
      const path = url.pathname.replace(/\/+$/, "");
      const sendTo = contactConversions.get(`${url.origin}${path}`);
      if (!sendTo) {
        return;
      }

      if (queueConversion(rootElement.ownerDocument.defaultView, sendTo)) {
        handledClicks.add(event);
      }
    } catch {
      // Keep the anchor's original navigation, including malformed link URLs.
    }
  };

  const listenerOptions = { capture: true };
  rootElement.addEventListener("click", handleClick, listenerOptions);
  const cleanup = () => {
    if (activeRoots.get(rootElement) !== cleanup) {
      return;
    }
    rootElement.removeEventListener("click", handleClick, listenerOptions);
    activeRoots.delete(rootElement);
  };
  activeRoots.set(rootElement, cleanup);
  return cleanup;
};
