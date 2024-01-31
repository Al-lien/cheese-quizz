// react
import { useState } from "react";

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

export async function loader() {
  const response = await fetch("http://localhost:3001/api/questions");
  const data = await response.json();
  const { id } = JSON.parse(window.localStorage.getItem("user"));
  const filteredData = data.filter((question) => question.userId === id);
  return filteredData;
}

function Questions() {
  const usersQuestion = useLoaderData();
  const [isHidden, setIsHidden] = useState(true);

  const textStyle = {
    fontSize: "clamp(2.9rem, 10vw, 5rem)",
    textAlign: "center",
  };

  return (
    <>
      <Description />

      <div className="usersQuestions">
        {usersQuestion.length > 0 ? (
          usersQuestion.map((question) => {
            return <UsersQuestion key={question.id} question={question} />;
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
      <AddQuestion isHidden={isHidden} setIsHidden={setIsHidden} />
    </>
  );
}

export default Questions;
