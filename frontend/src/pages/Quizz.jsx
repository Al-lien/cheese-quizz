// react
import { useEffect, useState } from "react";

// react-router
import { Link, useLoaderData } from "react-router-dom";

// library
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

// pages && components
import Options from "../components/Options";

// functions
import { addLeadingZero } from "../utilities";

// hooks
import useRandomQuestion from "../hooks/useRandomQuestion";

export async function loader() {
  const response = await fetch("http://localhost:3001/api/questions");
  const data = await response.json();
  return data;
}

function Quizz() {
  // fetch data from loader
  const questions = useLoaderData();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { generateRandomNumber, randomQuestions } = useRandomQuestion();

  useEffect(() => {
    const fetchRandomNumber = () => {
      generateRandomNumber(questions.length);
    };
    fetchRandomNumber();
  }, []);

  const temp = randomQuestions[randomQuestions.length - 1];
  const { question, choice1, choice2, choice3, choice4, details } =
    temp !== undefined && questions[temp];
  const options = [choice1, choice2, choice3, choice4];

  function handleClickNext() {
    setIsLoading(true);
    if (details) {
      toast(details, {
        duration: 5000,
      });
    }

    if (selectedAnswer === questions[temp].answer) {
      toast.success("Bien joué !", {
        icon: "🔥",
      });
    } else {
      toast.error("Honte sur toi !", {
        icon: "👎",
      });
    }

    setResult((previous) =>
      selectedAnswer === questions[temp].answer
        ? {
            ...previous,
            score: previous.score + 5,
            correctAnswers: previous.correctAnswers + 1,
          }
        : { ...previous, wrongAnswers: previous.wrongAnswers + 1 }
    );
    setIsCorrectAnswer(questions[temp].answer);

    setTimeout(
      () => {
        if (activeQuestion + 1 < questions.length) {
          setActiveQuestion(activeQuestion + 1);
        }
        generateRandomNumber(questions.length);
        setSelectedAnswer(null);
        setIsCorrectAnswer(null);
        setIsLoading(false);
      },
      details ? "5000" : "3000"
    );
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <main className="quizzContainer">
        <div>
          <Link to="/home" aria-label="go back">
            <ChevronLeftIcon width={30} />
          </Link>
          <span className="questionNumber">
            {addLeadingZero(activeQuestion + 1)} / {questions.length}
          </span>
        </div>
        <div>
          <i>Score : {result.score}</i>
        </div>
        {question && <h2>{question}</h2>}
        <ul>
          {options &&
            options.map((option) => {
              return (
                option !== null && (
                  <Options
                    key={option}
                    option={option}
                    selectedAnswer={selectedAnswer}
                    setSelectedAnswer={setSelectedAnswer}
                    isCorrectAnswer={isCorrectAnswer}
                  />
                )
              );
            })}
        </ul>
        <button
          id="answerButton"
          disabled={!selectedAnswer || isLoading}
          type="button"
          onClick={() => handleClickNext()}
          className={!selectedAnswer || isLoading ? "disable" : null}
        >
          Envoyer
        </button>
      </main>
    </>
  );
}

export default Quizz;
