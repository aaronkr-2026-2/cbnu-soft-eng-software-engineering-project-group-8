import { Link } from "react-router-dom";
import "./homepage.css";

export default function Homepage() {
  return (
    <div className="homepage">
      <header className="home-header">
        <Link to="/" className="home-logo">
          Student<span>AI</span>
        </Link>

        <nav className="home-nav" aria-label="Điều hướng chính">
          <Link to="/" className="active" aria-current="page">Trang chủ</Link>
          <a href="#about">Giới thiệu</a>
          <Link to="/detect">
            Phân tích
          </Link>
        </nav>
      </header>

      <main>
        <section className="home-hero">
          <div className="hero-content">
            <span className="home-badge">
              AI-Based Student Performance Prediction
            </span>

            <h1>
              Hiểu kết quả học tập.
              <span> Định hướng tốt hơn.</span>
            </h1>

            <p>
              Khám phá ứng dụng trí tuệ nhân tạo trong dự đoán điểm
              sinh viên và tìm hiểu các yếu tố ảnh hưởng đến kết quả
              dự đoán.
            </p>

            <div className="hero-actions">
              <Link to="/detect" className="home-button primary">
                Bắt đầu phân tích →
              </Link>

              <a href="#about" className="home-button secondary">
                Tìm hiểu dự án
              </a>
            </div>

            <p className="hero-note">
              Dự án nghiên cứu ứng dụng Machine Learning trong giáo dục.
            </p>
          </div>

          <div className="hero-card">
            <div className="card-icon" aria-hidden="true">✦</div>
            <h2>Từ dữ liệu đến thông tin hữu ích</h2>
            <p>
              Hỗ trợ khám phá kết quả học tập thông qua một quy trình
              đơn giản.
            </p>

            <ol className="home-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Nhập thông tin</strong>
                  <p>Cung cấp dữ liệu học tập của sinh viên.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Nhận dự đoán</strong>
                  <p>Ước tính điểm bằng mô hình Random Forest.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Tìm hiểu kết quả</strong>
                  <p>Xem đóng góp của các đặc trưng với SHAP.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section id="about" className="home-about">
          <div className="section-intro">
            <span className="section-label">VỀ DỰ ÁN</span>
            <h2>Ứng dụng AI để hiểu dữ liệu học tập</h2>
            <p>
              Kết hợp dự đoán và giải thích mô hình trong một giao diện
              dễ sử dụng.
            </p>
          </div>

          <div className="home-features">
            <article className="feature-card">
              <span className="feature-number">01 / PREDICTION</span>
              <h3>Dự đoán điểm số</h3>
              <p>
                Sử dụng Random Forest để ước tính điểm cuối kỳ từ
                thông tin học tập.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-number">02 / EXPLAINABILITY</span>
              <h3>Giải thích với SHAP</h3>
              <p>
                Tìm hiểu những đặc trưng đóng góp làm tăng hoặc giảm
                kết quả dự đoán.
              </p>
            </article>

            <article className="feature-card">
              <span className="feature-number">03 / RESEARCH</span>
              <h3>Hướng phát triển</h3>
              <p>
                Nghiên cứu mở rộng với Federated Learning để huấn luyện
                trên dữ liệu phân tán.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <span className="footer-brand">StudentAI</span>
        <p>Student Performance Prediction · Dự án học tập và nghiên cứu</p>
      </footer>
    </div>
  );
}