import assert from "node:assert/strict";
import { test } from "node:test";
import {
  installAdsClickTracking,
  sendBookingPageConversion,
} from "../src/lib/googleAdsConversions.js";

// Fixed expectations from the verified existing Ads actions, independent of the helper.
const verified = {
  actions: {
    bookingArrival: { sendTo: "AW-10787558077/Gu-ECJPs7f8cEL2l9Jco" },
    lineClick: { sendTo: "AW-10787558077/YTnGCJbs7f8cEL2l9Jco" },
    mapClick: { sendTo: "AW-10787558077/tGmnCJns7f8cEL2l9Jco" },
  },
};
const LINE = "https://line.me/R/ti/p/@ane1336b";
const MAP = "https://maps.app.goo.gl/ypkRCadnrvm7Yyq77";

const fixture = () => {
  const calls = [];
  const trackingWindow = { gtag: (...args) => calls.push(args) };
  const root = new globalThis.EventTarget();
  const members = new Set();
  root.ownerDocument = {
    baseURI: "https://www.vovhairsalon.com/contact",
    defaultView: trackingWindow,
  };
  root.contains = (element) => members.has(element);
  const anchor = (href) => {
    const element = { href, target: "_blank", rel: "noopener noreferrer" };
    element.closest = (selector) => selector === "a[href]" ? element : null;
    members.add(element);
    return element;
  };
  return { root, calls, trackingWindow, anchor, members };
};

const click = (target, button = 0) => {
  const event = new globalThis.Event("click", { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    target: { value: target },
    button: { value: button },
  });
  return event;
};

test("existing LINE and map labels are sent with the preserved value and currency", () => {
  const { root, calls, anchor } = fixture();
  installAdsClickTracking(root);
  for (const href of [LINE, MAP]) {
    assert.equal(root.dispatchEvent(click(anchor(href))), true);
  }
  assert.deepEqual(calls, [
    ["event", "conversion", { send_to: verified.actions.lineClick.sendTo, value: 1, currency: "TWD" }],
    ["event", "conversion", { send_to: verified.actions.mapClick.sendTo, value: 1, currency: "TWD" }],
  ]);
});

test("nested SVG and text-node targets resolve to the surrounding anchor", () => {
  const { root, calls, anchor } = fixture();
  installAdsClickTracking(root);
  const line = anchor(LINE);
  const svgPath = { closest: () => line };
  const textNode = { parentElement: line };
  root.dispatchEvent(click(svgPath));
  root.dispatchEvent(click(textNode));
  assert.equal(calls.length, 2);
});

test("repeated installation and redispatching one event cannot double-send", () => {
  const { root, calls, anchor } = fixture();
  const cleanup = installAdsClickTracking(root);
  assert.equal(installAdsClickTracking(root), cleanup);
  const event = click(anchor(LINE));
  root.dispatchEvent(event);
  root.dispatchEvent(event);
  assert.equal(calls.length, 1);
});

test("separate real gestures remain separate conversions within the same document", () => {
  const { root, calls, anchor } = fixture();
  installAdsClickTracking(root);
  const line = anchor(LINE);
  root.dispatchEvent(click(line));
  root.dispatchEvent(click(line));
  assert.equal(calls.length, 2);
});

test("exact HTTPS origin and salon path reject lookalikes and different destinations", () => {
  const { root, calls, anchor } = fixture();
  installAdsClickTracking(root);
  const rejected = [
    `https://evil.example/?next=${LINE}`,
    "https://line.me.evil.example/R/ti/p/@ane1336b",
    "https://line.me:9443/R/ti/p/@ane1336b",
    "https://user:password@line.me/R/ti/p/@ane1336b",
    "http://line.me/R/ti/p/@ane1336b",
    "https://line.me/R/ti/p/@different-salon",
    "https://maps.app.goo.gl/different-place",
    "https://maps.app.goo.gl:9443/ypkRCadnrvm7Yyq77",
    "https://user@maps.app.goo.gl/ypkRCadnrvm7Yyq77",
    "javascript:void(0)",
    "http://[invalid",
    "https://www.vovhairsalon.com/booking",
    "tel:052779658",
  ];
  for (const href of rejected) {
    assert.equal(root.dispatchEvent(click(anchor(href))), true);
  }
  assert.equal(calls.length, 0);
});

test("query/hash decoration and a trailing slash retain the same destination", () => {
  const { root, calls, anchor } = fixture();
  installAdsClickTracking(root);
  root.dispatchEvent(click(anchor(`${LINE}/?utm_source=website#contact`)));
  assert.equal(calls.length, 1);
  assert.deepEqual(Object.keys(calls[0][2]).sort(), ["currency", "send_to", "value"]);
});

test("unrelated, outside-root, cancelled and non-primary clicks are not tracked", () => {
  const { root, calls, anchor, members } = fixture();
  installAdsClickTracking(root);
  const outside = anchor(LINE);
  members.delete(outside);
  root.dispatchEvent(click(outside));
  root.dispatchEvent(click({ closest: () => null }));
  root.dispatchEvent(click(anchor(LINE), 2));
  const cancelled = click(anchor(MAP));
  cancelled.preventDefault();
  assert.equal(root.dispatchEvent(cancelled), false);
  assert.equal(calls.length, 0);
});

test("tracking never cancels navigation, changes href/target, or stops later listeners", () => {
  const { root, anchor } = fixture();
  installAdsClickTracking(root);
  let laterClicks = 0;
  root.addEventListener("click", () => { laterClicks += 1; });
  const line = anchor(LINE);
  const event = click(line);
  assert.equal(root.dispatchEvent(event), true);
  assert.equal(event.defaultPrevented, false);
  assert.equal(laterClicks, 1);
  assert.equal(line.href, LINE);
  assert.equal(line.target, "_blank");
  assert.equal(line.rel, "noopener noreferrer");
});

test("missing gtag keeps the click usable and does not consume its retry", () => {
  const { root, calls, trackingWindow, anchor } = fixture();
  installAdsClickTracking(root);
  delete trackingWindow.gtag;
  const event = click(anchor(MAP));
  assert.equal(root.dispatchEvent(event), true);
  assert.equal(calls.length, 0);
  assert.equal(trackingWindow.dataLayer, undefined);
  trackingWindow.gtag = (...args) => calls.push(args);
  assert.equal(root.dispatchEvent(event), true);
  assert.equal(calls.length, 1);
});

test("throwing gtag cannot cancel navigation or consume a failed event", () => {
  const { root, calls, trackingWindow, anchor } = fixture();
  installAdsClickTracking(root);
  trackingWindow.gtag = () => { throw new Error("blocked tag"); };
  const event = click(anchor(LINE));
  assert.equal(root.dispatchEvent(event), true);
  assert.equal(event.defaultPrevented, false);
  trackingWindow.gtag = (...args) => calls.push(args);
  root.dispatchEvent(event);
  assert.equal(calls.length, 1);
});

test("cleanup is idempotent and setup-cleanup-setup only installs one live listener", () => {
  const { root, calls, anchor } = fixture();
  const line = anchor(LINE);
  const cleanup = installAdsClickTracking(root);
  cleanup();
  cleanup();
  root.dispatchEvent(click(line));
  assert.equal(calls.length, 0);
  installAdsClickTracking(root);
  root.dispatchEvent(click(line));
  assert.equal(calls.length, 1);
  assert.doesNotThrow(() => installAdsClickTracking(null)());
});

test("two nested installed roots still send one conversion for one event", () => {
  const inner = fixture();
  const outer = fixture();
  outer.root.ownerDocument = inner.root.ownerDocument;
  const line = inner.anchor(LINE);
  outer.members.add(line);
  installAdsClickTracking(inner.root);
  installAdsClickTracking(outer.root);
  const event = click(line);
  outer.root.dispatchEvent(event);
  inner.root.dispatchEvent(event);
  assert.equal(inner.calls.length, 1);
});

test("booking keeps its existing label and once-per-document semantics", () => {
  const { trackingWindow, calls } = fixture();
  assert.equal(sendBookingPageConversion(trackingWindow), true);
  assert.equal(sendBookingPageConversion(trackingWindow), false);
  assert.deepEqual(calls, [["event", "conversion", {
    send_to: verified.actions.bookingArrival.sendTo, value: 1, currency: "TWD",
  }]]);
  assert.equal(trackingWindow.__vovGoogleAdsConversions.sent.booking_page_view, true);
});

test("booking missing/throwing gtag does not set sent and permits a later retry", () => {
  const { trackingWindow, calls } = fixture();
  delete trackingWindow.gtag;
  assert.equal(sendBookingPageConversion(trackingWindow), false);
  assert.equal(trackingWindow.__vovGoogleAdsConversions, undefined);
  trackingWindow.gtag = () => { throw new Error("blocked tag"); };
  assert.equal(sendBookingPageConversion(trackingWindow), false);
  assert.equal(trackingWindow.__vovGoogleAdsConversions, undefined);
  trackingWindow.gtag = (...args) => calls.push(args);
  assert.equal(sendBookingPageConversion(trackingWindow), true);
  assert.equal(sendBookingPageConversion(trackingWindow), false);
  assert.equal(calls.length, 1);
});

test("legacy booking sent state is respected, while legacy click locks are ignored", () => {
  const { root, calls, trackingWindow, anchor } = fixture();
  trackingWindow.__vovGoogleAdsConversions = {
    sent: { booking_page_view: true, line_click: true, map_click: true },
  };
  assert.equal(sendBookingPageConversion(trackingWindow), false);
  installAdsClickTracking(root);
  root.dispatchEvent(click(anchor(LINE)));
  root.dispatchEvent(click(anchor(MAP)));
  assert.equal(calls.length, 2);
});
