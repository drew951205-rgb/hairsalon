const LoadingState = ({ label = "資料載入中" }) => (
  <div className="loading-state" role="status" aria-live="polite">
    <p>{label}</p>
    <div className="loading-scissor-line" aria-hidden="true">
      <span />
      <img src="/assets/scissors.png" alt="" />
    </div>
  </div>
);

export default LoadingState;
