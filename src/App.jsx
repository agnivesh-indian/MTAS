import { useState } from "react";
import { questions } from "./questions";
import "./App.css";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(Array(questions.length).fill(0));
  const [showScore, setShowScore] = useState(false);
  const [selectedAge, setSelectedAge] = useState(11);

  const subscaleItems = {
    worry: [0, 4, 8, 12], // Questions 1, 5, 9, 13 (0-indexed)
    cognitiveInterference: [1, 5, 9, 13], // Questions 2, 6, 10, 14 (0-indexed)
    tension: [2, 6, 10, 14], // Questions 3, 7, 11, 15 (0-indexed)
    physiologicalIndicators: [3, 7, 11, 15], // Questions 4, 8, 12, 16 (0-indexed)
  };

  const handleScoreChange = (score) => {
    const newScores = [...scores];
    newScores[currentQuestion] = score;
    setScores(newScores);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetTest = () => {
    setScores(Array(questions.length).fill(0));
    setCurrentQuestion(0);
    setShowScore(false);
    setSelectedAge(11);
  };

    const calculateSubscaleScores = () => {

      const subscaleScores = {

        worry: 0,

        cognitiveInterference: 0,

        tension: 0,

        physiologicalIndicators: 0,

      };

  

      subscaleItems.worry.forEach((index) => {

        subscaleScores.worry += scores[index];

      });

      subscaleItems.cognitiveInterference.forEach((index) => {

        subscaleScores.cognitiveInterference += scores[index];

      });

      subscaleItems.tension.forEach((index) => {

        subscaleScores.tension += scores[index];

      });

      subscaleItems.physiologicalIndicators.forEach((index) => {

        subscaleScores.physiologicalIndicators += scores[index];

      });

  

      return subscaleScores;

    };

  

    const subscaleScores = calculateSubscaleScores();

  

    return (

      <div className="app-container">

        <div className="app">

          {showScore ? (

            <div className="results-section">

              <h2>Your Results</h2>

              <p>

                Worry: <strong>{subscaleScores.worry}</strong>

              </p>

              <p>

                Cognitive Interference: <strong>{subscaleScores.cognitiveInterference}</strong>

              </p>

              <p>

                Tension: <strong>{subscaleScores.tension}</strong>

              </p>

              <p>

                Physiological Indicators: <strong>{subscaleScores.physiologicalIndicators}</strong>

              </p>

              <button onClick={resetTest}>Take Again</button>
          </div>
        ) : (
          <div className="question-section">
            <h1>Multidimensional Test Anxiety Scale (MTAS)</h1>
            <p>Please think about how you USUALLY think and feel when taking a test or exam. Try not to think for too long about each question.Read each statement and select the option that best indicates how you think or feel.</p>
            <div className="age-selection">
              <label htmlFor="age-select">Age:</label>
              <select
                id="age-select"
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
              >
                {Array.from({ length: 8 }, (_, i) => 11 + i).map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
            <h2>
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <p>{questions[currentQuestion].text}</p>
            <div className="options">
              {[
                { score: 1, label: "Strongly Disagree" },
                { score: 2, label: "Disagree" },
                { score: 3, label: "Neither agree nor disagree" },
                { score: 4, label: "Agree" },
                { score: 5, label: "Strongly Agree" },
              ].map(({ score, label }) => (
                <label key={score}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={score}
                    checked={scores[currentQuestion] === score}
                    onChange={() => handleScoreChange(score)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="navigation">
              <button onClick={prevQuestion} disabled={currentQuestion === 0}>
                Previous
              </button>
              <button onClick={nextQuestion}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
