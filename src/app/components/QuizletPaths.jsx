"use client";
import { useState } from "react";
import "./QuizletPaths.module.css";

/* 618ms = 1000/φ — golden-ratio-derived duration for satisfying completion feedback */
const CHECK_ANIMATION_MS = 750;

export default function QuizletPaths() {
  const [step, setStep] = useState("main");
  const [answers, setAnswers] = useState({});
  const [formData, setFormData] = useState({ name: "", email: "", location: "" });
  const [status, setStatus] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [animatingKey, setAnimatingKey] = useState(null);

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

  const handleMainSelectWithFeedback = (nextStep, optionIndex) => {
    setAnimatingKey(`main-${optionIndex}`);
    setTimeout(() => {
      handleMainSelect(nextStep);
      setAnimatingKey(null);
    }, CHECK_ANIMATION_MS);
  };

  const handleOptionSelectWithFeedback = (key, value, optionIndex) => {
    setAnimatingKey(`${key}-${optionIndex}`);
    setTimeout(() => {
      handleOptionSelect(key, value);
      setAnimatingKey(null);
    }, CHECK_ANIMATION_MS);
  };

  const getStepperState = () => {
    const isContactPath = answers.main === "contact";
    if (isContactPath) {
      const stepIndex = step === "main" ? 0 : 1;
      const totalSteps = 2;
      const messages = ["Keep going", "Just about done"];
      return { stepIndex, totalSteps, message: messages[stepIndex] };
    }
    const stepIndex =
      step === "main" ? 0
      : questionSets[step] ? 1
      : step === "form" && status === "success" ? 3
      : step === "form" ? 2
      : 0;
    const totalSteps = 4;
    const messages = ["Keep going", "Almost there", "Just about done", "Finished! Good job!"];
    return { stepIndex, totalSteps, message: messages[stepIndex] };
  };

  const { stepIndex, totalSteps, message } = getStepperState();

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
      await new Promise((resolve) => setTimeout(resolve, 800)); // brief delay
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
      <div className="quiz-card-rainbow-wrap">
      <div className="quiz-card">
        {/* --- PROGRESS STEPPER --- */}
        <div className="quiz-stepper" role="progressbar" aria-valuenow={stepIndex + 1} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${stepIndex + 1} of ${totalSteps}`}>
          <div className="quiz-stepper-track">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="quiz-stepper-step">
                <span
                  className={`quiz-stepper-dot ${i <= stepIndex ? "completed" : ""} ${i === stepIndex ? "current" : ""}`}
                  aria-hidden
                />
                {i < totalSteps - 1 && (
                  <span
                    className={`quiz-stepper-line ${i < stepIndex ? "completed" : ""}`}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
          <p className="quiz-stepper-message">{message}</p>
        </div>

        {/* --- MAIN QUESTION SET --- */}
        {step === "main" && (
          <>
            <h2 className="title">What are you looking for today?</h2>
            <ul className="option-list">
              {mainOptions.map((opt, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleMainSelectWithFeedback(opt.next, i)}
                    className="option-button"
                    data-animating={animatingKey === `main-${i}`}
                    disabled={!!animatingKey}
                  >
                    <span className="quiz-option-check-wrap">
                      <span className="quiz-option-check-container">
                        <span className="quiz-option-check-background">
                          <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="quiz-option-check-shadow" />
                      </span>
                    </span>
                    <span className="option-button-label">{opt.label}</span>
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
                    onClick={() => handleOptionSelectWithFeedback(step, opt, i)}
                    className="option-button"
                    data-animating={animatingKey === `${step}-${i}`}
                    disabled={!!animatingKey}
                  >
                    <span className="quiz-option-check-wrap">
                      <span className="quiz-option-check-container">
                        <span className="quiz-option-check-background">
                          <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="quiz-option-check-shadow" />
                      </span>
                    </span>
                    <span className="option-button-label">{opt}</span>
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
            <br />
            <p>Expect our staff to reach out within 1-3 business days</p>
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
    </div>
  );
}
