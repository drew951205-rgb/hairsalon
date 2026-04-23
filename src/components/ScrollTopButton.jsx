import Icon from "./Icon";

const ScrollTopButton = ({ className = "" }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`news-scroll-top ${className}`.trim()}
      onClick={scrollToTop}
      aria-label="回到頁面頂端"
    >
      <Icon name="arrow-up" aria-hidden="true" />
    </button>
  );
};

export default ScrollTopButton;
