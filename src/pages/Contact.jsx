import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Icon from "../components/Icon";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const contentType = response.headers.get("content-type") || "";
      const raw = await response.text();
      const result = contentType.includes("application/json")
        ? JSON.parse(raw)
        : null;

      if (!contentType.includes("application/json")) {
        throw new Error(
          "The contact API returned a non-JSON response. Please check the Vercel deployment configuration."
        );
      }

      if (!response.ok) {
        throw new Error(result?.error || "送出失敗，請稍後再試。");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <section className="py-5">
      <PageHeader
        title="聯絡我們"
        lead="提供店家資訊、交通指引與聯絡表單，快速找到我們的位置。"
      />
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">店家資訊</h5>
                <p>
                  <strong>地址：</strong>
                  <a
                    href="https://maps.app.goo.gl/ypkRCadnrvm7Yyq77"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    嘉義市東區民權路264號
                  </a>
                </p>
                <p>
                  <strong>電話：</strong>05-2779658
                </p>
                <p>
                  <strong>社群：</strong>
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <a
                      href="https://www.instagram.com/vov_hair_style_salon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link d-inline-flex align-items-center"
                    >
                      <span className="social-icon instagram me-2">
                        <Icon name="instagram" aria-hidden="true" />
                      </span>
                      Instagram：@vov_hair_style_salon
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100064128156251&ref=NONE_xav_ig_profile_page_web#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link d-inline-flex align-items-center"
                    >
                      <span className="social-icon facebook me-2">
                        <Icon name="facebook" aria-hidden="true" />
                      </span>
                      Facebook：VOV Hair Salon
                    </a>
                  </li>
                </ul>
                <p>
                  <strong>營業時間：</strong>
                </p>
                <ul>
                  <li>星期一至星期五：10:00 - 20:00</li>
                  <li>星期六：09:00 - 19:00</li>
                  <li>星期日：11:00 - 18:00</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">聯絡表單</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">姓名</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">電子郵件</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">訊息</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                    />
                  </div>
                  {status === "success" && (
                    <div className="alert alert-success" role="alert">
                      已送出，謝謝您！我們會盡快回覆。
                    </div>
                  )}
                  {status === "error" && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "送出中..." : "送出"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
