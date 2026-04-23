import Icon from "./Icon";

const ScrollTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className="news-scroll-top"
      onClick={scrollToTop}
      aria-label="回到最上面"
    >
      <Icon name="arrow-up" aria-hidden="true" />
    </button>
  );
};

export default ScrollTopButton;
