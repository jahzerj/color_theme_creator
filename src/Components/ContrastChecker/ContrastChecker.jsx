import { useEffect, useState } from "react";
import "./ContrastChecker.css";

export default function ContrastChecker({ hex, contrastText }) {
  const [overallResult, setOverallResult] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function startFetching() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ colors: [hex, contrastText] }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contrast data");
        }

        const data = await response.json();
        setOverallResult(data.overall);
        setError(false);
      } catch (error) {
        console.error("Error fetching contrast:", error);
        setError(true);
      }
    }

    startFetching();
  }, [hex, contrastText]);

  const feedbackClass = error
    ? "contrast-feedback error"
    : `contrast-feedback ${overallResult?.toLowerCase()}`;

  return (
    <div className="contrast-feedback-container">
      <span className={feedbackClass}>
        {error
          ? "Failed to fetch contrast results"
          : overallResult === null
          ? "Checking contrast..."
          : `Overall Contrast Score: ${overallResult}`}
      </span>
    </div>
  );
}
