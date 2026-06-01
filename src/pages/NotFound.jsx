import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";

const NotFound = () => (
  <section className="py-5">
    <PageHeader
      title="找不到頁面"
      lead="這個網址可能已經移除，或目前沒有對應的頁面。"
    />
    <div className="container text-center">
      <div className="card border-0 shadow-soft">
        <div className="card-body py-5">
          <p className="text-muted mb-4">
            你可以回到首頁查看 VOV Hair Salon 的服務、作品集與預約資訊。
          </p>
          <Link to="/" className="home-more-link">
            回到首頁
            <Icon name="arrow-right-to-bracket" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default NotFound;
