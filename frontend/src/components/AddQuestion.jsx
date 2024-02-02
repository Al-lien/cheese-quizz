// proptypes
import PropTypes from "prop-types";

// react
import { useEffect, useRef, useState } from "react";

// library
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

// hooks
import useCreateQuestion from "../hooks/useCreateQuestion";

// assets
import CheeseQuizzLogo from "../assets/CheeseQuizzLogo.svg";

// styles
import "./styles/AddQuestion.scss";
import useUpdateQuestion from "../hooks/useUpdateQuestion";

function AddQuestion({
  isHidden,
  setIsHidden,
  setQuestionToUpdate,
  questionToUpdate,
}) {
  const { id } = JSON.parse(window.localStorage.getItem("user"));
  const [userId] = useState(id);

  const [newQuestion, setNewQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");

  const [isSelectedAnswer, setIsSelectedAnswer] = useState("");

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const { createQuestion, isLoading, error } = useCreateQuestion();
  const { updateQuestion } = useUpdateQuestion();

  useEffect(() => {
    if (Object.values(questionToUpdate).length !== 0) {
      setNewQuestion(questionToUpdate.question);
      setAnswer(questionToUpdate.answer);
      setChoice1(questionToUpdate.choice1);
      setChoice2(questionToUpdate.choice2);
      setChoice3(questionToUpdate.choice3);
      setChoice4(questionToUpdate.choice4);
      setIsSelectedAnswer(questionToUpdate.answer);
      ref1.current.value = questionToUpdate.choice1;
      ref2.current.value = questionToUpdate.choice2;
      ref3.current.value = questionToUpdate.choice3;
      ref4.current.value = questionToUpdate.choice4;
    }
  }, [isHidden]);

  function handleRightAnswer(choice) {
    setIsSelectedAnswer(choice);
    setAnswer(choice.current.value);
  }

  function handleReset() {
    ref1.current.value = "";
    ref2.current.value = "";
    ref3.current.value = "";
    ref4.current.value = "";
    setIsSelectedAnswer("");
    setNewQuestion("");
    setAnswer("");
    setChoice1("");
    setChoice2("");
    setChoice3("");
    setChoice4("");
    setQuestionToUpdate({});
    setIsHidden(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const submittedQuestion = {
      userId,
      question: newQuestion,
      answer,
      details: null,
      choice1,
      choice2,
      choice3,
      choice4,
    };
    if (Object.values(questionToUpdate).length !== 0) {
      // eslint-disable-next-line no-underscore-dangle
      await updateQuestion(submittedQuestion, questionToUpdate.id);
    } else {
      await createQuestion(submittedQuestion);
    }

    handleReset();
  }

  return (
    <main
      className={
        isHidden ? "addQuestion-container" : " addQuestion-container visible"
      }
    >
      <header>
        <button
          type="button"
          aria-label="go back button"
          onClick={() => handleReset()}
        >
          <ChevronLeftIcon width={30} />
          <h2>Ajouter une question</h2>
        </button>
        <img src={CheeseQuizzLogo} alt="Cheese Quizz Logo" width={150} />
      </header>
      {error && <h6>{error}</h6>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="Écrivez une question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          required
          maxLength="255"
        />
        <input type="hidden" name="details" value="null" />
        <div className="inputAddQuestion">
          <input
            type="text"
            placeholder="Choix n°1"
            ref={ref1}
            value={choice1}
            onChange={(e) => setChoice1(e.target.value)}
            required
            maxLength="255"
          />
          <button
            type="button"
            aria-label="click to define correct answer"
            onClick={() => handleRightAnswer(ref1)}
          >
            <CheckCircleIcon
              width={30}
              fill={isSelectedAnswer === ref1 ? "#004643" : "#FEFEFE"}
            />
          </button>
        </div>
        <div className="inputAddQuestion">
          <input
            type="text"
            placeholder="Choix n°2"
            ref={ref2}
            value={choice2}
            onChange={(e) => setChoice2(e.target.value)}
            required
            maxLength="255"
          />
          <button
            type="button"
            aria-label="click to define correct answer"
            onClick={() => handleRightAnswer(ref2)}
          >
            <CheckCircleIcon
              width={30}
              fill={isSelectedAnswer === ref2 ? "#004643" : "#FEFEFE"}
            />
          </button>
        </div>
        <div className="inputAddQuestion">
          <input
            type="text"
            placeholder="Choix n°3"
            ref={ref3}
            value={choice3}
            onChange={(e) => setChoice3(e.target.value)}
            required
            maxLength="255"
          />
          <button
            type="button"
            aria-label="click to define correct answer"
            onClick={() => handleRightAnswer(ref3)}
          >
            <CheckCircleIcon
              width={30}
              fill={isSelectedAnswer === ref3 ? "#004643" : "#FEFEFE"}
            />
          </button>
        </div>
        <div className="inputAddQuestion">
          <input
            type="text"
            placeholder="Choix n°2"
            ref={ref4}
            value={choice4}
            onChange={(e) => setChoice4(e.target.value)}
            required
            maxLength="255"
          />
          <button
            type="button"
            aria-label="click to define correct answer"
            onClick={() => handleRightAnswer(ref4)}
          >
            <CheckCircleIcon
              width={30}
              fill={isSelectedAnswer === ref4 ? "#004643" : "#FEFEFE"}
            />
          </button>
        </div>
        <button
          disabled={isSelectedAnswer === "" || isLoading}
          className={
            isSelectedAnswer === "" || isLoading
              ? "submitbtn disable"
              : "submitbtn"
          }
          type="submit"
        >
          Enregistrer ma question
        </button>
      </form>
    </main>
  );
}

AddQuestion.propTypes = {
  isHidden: PropTypes.bool.isRequired,
  setIsHidden: PropTypes.func.isRequired,
  setQuestionToUpdate: PropTypes.func.isRequired,
  questionToUpdate: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    question: PropTypes.string,
    questionId: PropTypes.number,
    answer: PropTypes.string,
    details: PropTypes.string,
    choice1: PropTypes.string,
    choice2: PropTypes.string,
    choice3: PropTypes.string,
    choice4: PropTypes.string,
  }),
};

AddQuestion.defaultProps = {
  questionToUpdate: undefined,
};

export default AddQuestion;
