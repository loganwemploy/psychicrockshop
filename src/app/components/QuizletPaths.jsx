"use client";
import { useState } from "react";
// import "./QuizletPaths.module.css";

export default function QuizletPaths() {
  const [step, setStep] = useState("main");
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", location: "" });
  const [status, setStatus] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  const mainOptions = [
    { label: "Looking for guidance", next: "guidance" },
    { label: "Looking for resources (backpack, supplies)", next: "resources" },
    { label: "Looking for job training or career coaching advice", next: "jobcoach" },
    { label: "Looking for something else", next: "contact" },
  ];

  const questionSets = {
    guidance: {
      question: "What type of guidance are you looking for?",
      options: [
        "One-on-one mentorship or goal-setting session",
        "Financial literacy and budgeting guidance",
        "Mental health or emotional support resources",
        "Family or youth counseling services",
      ],
    },
    resources: {
      question: "What kind of resources are you looking for?",
      options: [
        "Free school supplies or backpacks for students",
        "Clothing, hygiene items, or household essentials",
        "Food pantry access or meal programs",
        "Transportation or utility assistance",
      ],
    },
    jobcoach: {
      question: "What kind of job training or career help do you need?",
      options: [
        "Resume building and job application help",
        "Interview preparation and mock interviews",
        "Career coaching and mentorship programs",
        "Workforce training or certification opportunities",
      ],
    },
  };

  const handleMainSelect = (nextStep) => {
    setAnswers((prev) => ({ ...prev, main: nextStep }));
    setStep(nextStep);
  };

  const handleOptionSelect = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep("form");
  };

  const handleGoBack = () => {
    if (step === "form") return setStep(answers.main);
    if (questionSets[step]) return setStep("main");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const payload = {
      answers,
      formData,
      submittedAt: new Date().toISOString(),
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate API call
      console.log("✅ Submitted Data:", payload);
      setSubmittedData(payload);
      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {/* --- MAIN QUESTION SET --- */}
        {step === "main" && (
          <>
            <h2 className="title">What are you looking for today?</h2>
            <ul className="option-list">
              {mainOptions.map((opt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleMainSelect(opt.next)}
                    className="option-button"
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* --- BRANCH QUESTIONS --- */}
        {questionSets[step] && (
          <>
            <h2 className="title">{questionSets[step].question}</h2>
            <ul className="option-list">
              {questionSets[step].options.map((opt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleOptionSelect(step, opt)}
                    className="option-button"
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleGoBack} className="back-button">
              ← Go Back
            </button>
          </>
        )}

        {/* --- CONTACT OPTION --- */}
        {step === "contact" && (
          <div className="contact-block">
            <h2 className="title">Contact Us</h2>
            <p>We’d love to help you!</p>
            <p>
              📞 (555) 123-4567
              <br />
              ✉️ help@example.com
            </p>
            <div className="socials">
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
            </div>
            <button onClick={handleGoBack} className="back-button">
              ← Go Back
            </button>
          </div>
        )}

        {/* --- FORM STEP --- */}
        {step === "form" && !status && (
          <form onSubmit={handleSubmit} className="form">
            <h2 className="title">Almost done! Please enter your info:</h2>

            {/* Floating Labels */}
            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="input-field"
              />
              <label className={`input-label ${formData.name ? "filled" : ""}`}>Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="input-field"
              />
              <label className={`input-label ${formData.email ? "filled" : ""}`}>Email</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                required
                className="input-field"
              />
              <label className={`input-label ${formData.location ? "filled" : ""}`}>
                ZIP code or Town
              </label>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleGoBack} className="back-button">
                ← Go Back
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        )}

        {/* --- SUCCESS / ERROR STATES --- */}
        {status === "success" && (
          <div className="message success">
            <h2>🎉 Hooray!</h2>
            <p>Thank you — your form was submitted successfully.</p>
          </div>
        )}

        {status === "error" && (
          <div className="message error">
            <h2>😞 Oh no!</h2>
            <p>Something went wrong. Please try again.</p>
          </div>
        )}
      </div>
    </div>
  );
}
