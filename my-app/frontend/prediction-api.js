export async function predictGrade(student, signal) {
  const baseUrl = (import.meta.env?.VITE_API_BASE_URL || "/api/prediction").replace(/\/$/, "");
  let response;
  try {
    response = await fetch(`${baseUrl}/predict`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student), signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new Error("Could not connect to the Flask API. Start the prediction service and try again.", { cause: error });
  }
  let data;
  try { data = await response.json(); } catch {
    if (!response.ok) throw new Error(`Prediction service unavailable (HTTP ${response.status}). Please try again.`);
    throw new Error("The prediction service returned invalid JSON. Please try again.");
  }
  if (!response.ok) {
    const details = data?.errors ? Object.entries(data.errors).map(([field, message]) => `${field}: ${message}`).join(" ") : "";
    throw new Error(`${data?.message || "Prediction failed"} (HTTP ${response.status}). ${details}`.trim());
  }
  const grade = data?.predicted_grade;
  if (typeof grade !== "number" || !Number.isFinite(grade) || grade < 0 || grade > 20) {
    throw new Error("Invalid predicted grade: expected a number from 0–20.");
  }
  return grade;
}
