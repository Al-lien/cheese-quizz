// react
import { useEffect, useState } from "react";

// react-router
import { useLoaderData } from "react-router-dom";

// pages && components
import Emptypage from "../components/Emptypage";
import Description from "../components/Description";
import AddQuestion from "../components/AddQuestion";
import UsersQuestion from "../components/UsersQuestion";

// assets
import QuestionsPageCheese from "../assets/questionsPageCheese.svg";
import AddQuestionBtn from "../assets/addQuestion.svg";
import useQuestionsContext from "../hooks/useQuestionsContext";

export async function loader() {
  const response = await fetch("http://localhost:3001/api/questions");
  const data = await response.json();
  const { id } = JSON.parse(window.localStorage.getItem("user"));
  const filteredData = data.filter((question) => question.userId === id);
  return filteredData;
}

function Questions() {
  const filteredData = useLoaderData();
  const { questions, dispatch } = useQuestionsContext();
  const [isHidden, setIsHidden] = useState(true);
  const [questionToUpdate, setQuestionToUpdate] = useState({});

  const textStyle = {
    fontSize: "clamp(2.9rem, 10vw, 5rem)",
    textAlign: "center",
  };

  useEffect(() => {
    async function fetchQuestions() {
      dispatch({ type: "SET_QUESTIONS", payload: filteredData });
    }
    fetchQuestions();
  }, [dispatch]);

  return (
    <>
      <Description />

      <div className="usersQuestions">
        {questions && questions.length > 0 ? (
          questions.map((question) => {
            return (
              <UsersQuestion
                key={question.id}
                question={question}
                setQuestionToUpdate={setQuestionToUpdate}
                setIsHidden={setIsHidden}
              />
            );
          })
        ) : (
          <>
            <Emptypage background={QuestionsPageCheese} />
            <h2 style={textStyle}>Don't you love cheese ?!</h2>
          </>
        )}
      </div>
      <button
        type="button"
        aria-label="add question button"
        className="addQuestion"
        onClick={() => setIsHidden(false)}
      >
        <img src={AddQuestionBtn} alt="add question icon" />
      </button>
      <AddQuestion
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        setQuestionToUpdate={setQuestionToUpdate}
        questionToUpdate={questionToUpdate}
      />
    </>
  );
}

export default Questions;
