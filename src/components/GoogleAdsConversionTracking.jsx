import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { sendBookingPageConversion } from "../lib/googleAdsConversions";

const GoogleAdsConversionTracking = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.replace(/\/$/, "") === "/booking") {
      sendBookingPageConversion(window);
    }
  }, [pathname]);

  return null;
};

export default GoogleAdsConversionTracking;
