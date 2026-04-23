import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { stylists } from "../data";

const Stylists = () => (
  <section className="py-5">
    <PageHeader
      title="設計師介紹"
      lead="依專長展示技術與信任，讓顧客更容易決定預約對象。"
    />
    <div className="container">
      <div className="row gy-4">
        {stylists.map((stylist) => (
          <div className="col-md-4" key={stylist.name}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{stylist.name}</h5>
                <p className="mb-1">
                  <strong>專長：</strong>
                  {stylist.specialty}
                </p>
                <p className="mb-1">
                  <strong>年資：</strong>
                  {stylist.experience}
                </p>
                <p className="mb-1">
                  <strong>服務語言：</strong>
                  {stylist.languages}
                </p>
                <p className="mb-2">
                  <strong>評價：</strong>
                  {stylist.rating}
                </p>
                <Link to="/booking" className="btn btn-primary btn-sm">
                  預約{stylist.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stylists;
