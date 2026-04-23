import { useEffect, useState } from "react";

const bookingUrl =
  "https://beautinq.me/zhTW/fashion-hairsalon/appointment?openExternalBrowser=1";

const Booking = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLineBrowser = /Line/i.test(navigator.userAgent);

    if (isLineBrowser) {
      window.location.replace(bookingUrl);
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <section className="booking-system-page" aria-label="VOV Hair Salon 線上預約">
      {isLoading ? (
        <div className="booking-loading" role="status" aria-live="polite">
          <p>預約系統載入中</p>
          <div className="loading-scissor-line" aria-hidden="true">
            <span />
            <img src="/assets/scissors.png" alt="" />
          </div>
        </div>
      ) : null}
      <iframe
        src={bookingUrl}
        title="VOV Hair Salon 線上預約"
        allow="payment"
        onLoad={() => setIsLoading(false)}
      />
    </section>
  );
};

export default Booking;
