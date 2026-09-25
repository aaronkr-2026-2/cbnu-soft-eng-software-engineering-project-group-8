import { useState } from "react";
import { Link } from "react-router-dom";
import "./detect.css";

// Values from the supplied CSV row; asterisks are annotations, not data.
// G3 = 11 is the reference target and is never included in prediction inputs.
const initialForm = {
  school: "GP",
  sex: "F",
  age: 18,
  address: "U",
  famsize: "GT3",
  Pstatus: "A",
  Medu: 4,
  Fedu: 4,
  Mjob: "at_home",
  Fjob: "teacher",
  reason: "course",
  guardian: "mother",
  traveltime: 2,
  studytime: 2,
  failures: 0,
  schoolsup: "yes",
  famsup: "no",
  paid: "no",
  activities: "no",
  nursery: "yes",
  higher: "yes",
  internet: "no",
  romantic: "no",
  famrel: 4,
  freetime: 3,
  goout: 4,
  Dalc: 1,
  Walc: 1,
  health: 3,
  absences: 4,
  G1: 0,
  G2: 11,
};

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label} <code className="field-code">{name}</code></label>
    <select id={name} name={name} value={value} onChange={onChange} required>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.value} — {option.label}
        </option>
      ))}
    </select>
  </div>
);

const NumberField = ({
  label,
  name,
  value,
  min,
  max,
  onChange,
}) => (
  <div className="form-group">
    <label htmlFor={name}>{label} <code className="field-code">{name}</code></label>
    <input
      id={name}
      name={name}
      required
      step="1"
      type="number"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  </div>
);

const yesNo = [
  { value: "yes", label: "Có" },
  { value: "no", label: "Không" },
];

const optionsFrom = (labels) => labels.map((label, index) => ({ value: index + 1, label }));
const oneToFive = optionsFrom(["Rất thấp", "Thấp", "Trung bình", "Cao", "Rất cao"]);
const familyScale = optionsFrom(["Rất kém", "Kém", "Trung bình", "Tốt", "Rất tốt"]);
const healthScale = optionsFrom(["Rất kém", "Kém", "Trung bình", "Tốt", "Rất tốt"]);
const educationOptions = ["Không đi học", "Tiểu học (đến lớp 4)", "Lớp 5–9", "Trung học", "Giáo dục bậc cao"].map((label, value) => ({ value, label }));
const travelOptions = optionsFrom(["Dưới 15 phút", "15–30 phút", "30 phút–1 giờ", "Trên 1 giờ"]);
const studyOptions = optionsFrom(["Dưới 2 giờ/tuần", "2–5 giờ/tuần", "5–10 giờ/tuần", "Trên 10 giờ/tuần"]);

function Detect() {
  const [formData, setFormData] = useState(initialForm);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResult(null);
    setFormData((previous) => ({
      ...previous,
      [name]: typeof initialForm[name] === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sau này thay phần này bằng API gọi Random Forest

    setResult({
      status: "Dữ liệu đã sẵn sàng",
      message: "Đã chuẩn bị dữ liệu. Chưa có kết quả dự đoán vì giao diện chưa được kết nối với mô hình AI.",
    });
  };

  const handleReset = () => {
    setFormData(initialForm);
    setResult(null);
  };

  return (
    <div className="detect-page">
      {/* HEADER */}
      <header className="home-header">
        <Link to="/" className="home-logo">
          Student<span>AI</span>
        </Link>
        <nav className="home-nav" aria-label="Điều hướng chính">
          <Link to="/">Trang chủ</Link>
          <a href="/#about">Giới thiệu</a>
          <Link to="/detect" className="active" aria-current="page">Phân tích</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="detect-hero">
        <span className="home-badge">AI STUDENT ANALYSIS</span>

        <h1>Phân tích dữ liệu học sinh</h1>

        <p>
          Nhập 32 đặc trưng để chuẩn bị dự đoán điểm cuối kỳ G3.
          Các trường đang được điền theo dòng dữ liệu mẫu bạn cung cấp.
        </p>
      </section>

      <main className="detect-content">
        <p className="demo-notice">Bản demo giao diện · Chưa kết nối mô hình dự đoán.</p>
        <form className="analysis-card" onSubmit={handleSubmit}>
          {/* BASIC INFORMATION */}
          <section className="form-section">
            <div className="section-title">
              <span>01</span>
              <div>
                <h2>Thông tin cơ bản</h2>
                <p>Thông tin chung của học sinh</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="Trường"
                name="school"
                value={formData.school}
                onChange={handleChange}
                options={[
                  { value: "GP", label: "Gabriel Pereira" },
                  { value: "MS", label: "Mousinho da Silveira" },
                ]}
              />

              <SelectField
                label="Giới tính"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                options={[
                  { value: "F", label: "Nữ" },
                  { value: "M", label: "Nam" },
                ]}
              />

              <NumberField
                label="Tuổi"
                name="age"
                value={formData.age}
                min={15}
                max={22}
                onChange={handleChange}
              />

              <SelectField
                label="Khu vực sống"
                name="address"
                value={formData.address}
                onChange={handleChange}
                options={[
                  { value: "U", label: "Thành thị" },
                  { value: "R", label: "Nông thôn" },
                ]}
              />

              <SelectField
                label="Quy mô gia đình"
                name="famsize"
                value={formData.famsize}
                onChange={handleChange}
                options={[
                  { value: "LE3", label: "≤ 3 người" },
                  { value: "GT3", label: "> 3 người" },
                ]}
              />

              <SelectField
                label="Tình trạng cha mẹ"
                name="Pstatus"
                value={formData.Pstatus}
                onChange={handleChange}
                options={[
                  { value: "T", label: "Sống cùng nhau" },
                  { value: "A", label: "Sống riêng" },
                ]}
              />
            </div>
          </section>

          {/* FAMILY */}
          <section className="form-section">
            <div className="section-title">
              <span>02</span>
              <div>
                <h2>Gia đình</h2>
                <p>Thông tin cha mẹ và môi trường gia đình</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="Học vấn mẹ"
                name="Medu"
                value={formData.Medu}
                options={educationOptions}
                onChange={handleChange}
              />

              <SelectField
                label="Học vấn cha"
                name="Fedu"
                value={formData.Fedu}
                options={educationOptions}
                onChange={handleChange}
              />

              <SelectField
                label="Nghề nghiệp mẹ"
                name="Mjob"
                value={formData.Mjob}
                onChange={handleChange}
                options={[
                  { value: "teacher", label: "Giáo viên" },
                  { value: "health", label: "Y tế" },
                  { value: "services", label: "Dịch vụ" },
                  { value: "at_home", label: "Ở nhà" },
                  { value: "other", label: "Khác" },
                ]}
              />

              <SelectField
                label="Nghề nghiệp cha"
                name="Fjob"
                value={formData.Fjob}
                onChange={handleChange}
                options={[
                  { value: "teacher", label: "Giáo viên" },
                  { value: "health", label: "Y tế" },
                  { value: "services", label: "Dịch vụ" },
                  { value: "at_home", label: "Ở nhà" },
                  { value: "other", label: "Khác" },
                ]}
              />

              <SelectField
                label="Người giám hộ"
                name="guardian"
                value={formData.guardian}
                onChange={handleChange}
                options={[
                  { value: "mother", label: "Mẹ" },
                  { value: "father", label: "Cha" },
                  { value: "other", label: "Khác" },
                ]}
              />

              <SelectField
                label="Quan hệ gia đình"
                name="famrel"
                value={formData.famrel}
                options={familyScale}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* STUDY */}
          <section className="form-section">
            <div className="section-title">
              <span>03</span>
              <div>
                <h2>Học tập</h2>
                <p>Thời gian học và hỗ trợ học tập</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="Lý do chọn trường"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                options={[
                  { value: "home", label: "Gần nhà" },
                  { value: "reputation", label: "Uy tín của trường" },
                  { value: "course", label: "Chương trình học phù hợp" },
                  { value: "other", label: "Khác" },
                ]}
              />

              <SelectField
                label="Thời gian đến trường"
                name="traveltime"
                value={formData.traveltime}
                options={travelOptions}
                onChange={handleChange}
              />

              <SelectField
                label="Thời gian học mỗi tuần"
                name="studytime"
                value={formData.studytime}
                options={studyOptions}
                onChange={handleChange}
              />

              <NumberField
                label="Số lần trượt"
                name="failures"
                value={formData.failures}
                min={0}
                max={4}
                onChange={handleChange}
              />

              <SelectField
                label="Hỗ trợ từ trường"
                name="schoolsup"
                value={formData.schoolsup}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Hỗ trợ từ gia đình"
                name="famsup"
                value={formData.famsup}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Học thêm có phí"
                name="paid"
                value={formData.paid}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Dự định học cao hơn"
                name="higher"
                value={formData.higher}
                onChange={handleChange}
                options={yesNo}
              />
            </div>
          </section>

          {/* LIFESTYLE */}
          <section className="form-section">
            <div className="section-title">
              <span>04</span>

              <div>
                <h2>Đời sống & hoạt động</h2>
                <p>Hoạt động và thói quen của học sinh</p>
              </div>
            </div>

            <div className="form-grid">
              <SelectField
                label="Hoạt động ngoại khóa"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Từng học mẫu giáo"
                name="nursery"
                value={formData.nursery}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Internet tại nhà"
                name="internet"
                value={formData.internet}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Quan hệ tình cảm"
                name="romantic"
                value={formData.romantic}
                onChange={handleChange}
                options={yesNo}
              />

              <SelectField
                label="Thời gian rảnh (1–5)"
                name="freetime"
                value={formData.freetime}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Đi chơi (1–5)"
                name="goout"
                value={formData.goout}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Uống rượu ngày thường (1–5)"
                name="Dalc"
                value={formData.Dalc}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Uống rượu cuối tuần (1–5)"
                name="Walc"
                value={formData.Walc}
                onChange={handleChange}
                options={oneToFive}
              />

              <SelectField
                label="Sức khỏe (1–5)"
                name="health"
                value={formData.health}
                onChange={handleChange}
                options={healthScale}
              />

              <NumberField
                label="Số buổi nghỉ"
                name="absences"
                value={formData.absences}
                min={0}
                max={93}
                onChange={handleChange}
              />
            </div>
          </section>

          {/* GRADES */}
          <section className="form-section grade-section">
            <div className="section-title">
              <span>05</span>

              <div>
                <h2>Điểm số</h2>
                <p>Điểm học tập hiện tại</p>
              </div>
            </div>

            <div className="form-grid grade-grid">
              <NumberField
                label="Điểm kỳ 1 — G1 (0–20)"
                name="G1"
                value={formData.G1}
                min={0}
                max={20}
                onChange={handleChange}
              />

              <NumberField
                label="Điểm kỳ 2 — G2 (0–20)"
                name="G2"
                value={formData.G2}
                min={0}
                max={20}
                onChange={handleChange}
              />
            </div>

            <div className="target-note">
              <strong>G3</strong>
              <span>
                G3 là điểm cuối kỳ cần dự đoán (0–20), không nhập vào mô hình.
                Dòng dữ liệu mẫu có G3 thực tế = 11; đây không phải kết quả dự đoán.
              </span>
            </div>
          </section>

          <div className="form-actions">
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Khôi phục dữ liệu mẫu
            </button>

            <button type="submit" className="analyse-btn">
              Phân tích dữ liệu →
            </button>
          </div>
        </form>

        {result && (
          <div className="result-card" role="status" aria-live="polite">
            <span>TRẠNG THÁI DỮ LIỆU</span>
            <h2>{result.status}</h2>
            <p>{result.message}</p>
          </div>
        )}
      </main>
      <footer className="home-footer">
        <span className="footer-brand">StudentAI</span>
        <p>Student Performance Prediction · Dự án học tập và nghiên cứu</p>
      </footer>
    </div>
  );
}

export default Detect;