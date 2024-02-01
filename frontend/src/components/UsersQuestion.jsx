// proptypes
import PropTypes from "prop-types";

// library
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// function
import { formatQuestionLength } from "../utilities";

// styles
import "./styles/UsersQuestion.scss";

// hooks
import useQuestionsContext from "../hooks/useQuestionsContext";

function UsersQuestions({ question, setQuestionToUpdate, setIsHidden }) {
  const { dispatch } = useQuestionsContext();

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:3001/api/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_QUESTION", payload: json });
    }
  }

  async function handleUpdate(childToUpdateId) {
    setQuestionToUpdate(childToUpdateId);
    setIsHidden(false);
  }

  return (
    <div className="usersQuestion-container">
      {formatQuestionLength(question.question)}
      <span className="usersQuestion-button">
        <button
          type="button"
          aria-label="edit question"
          onClick={() => handleUpdate(question)}
        >
          <PencilIcon width={25} id="edit" />
        </button>
        <button
          type="button"
          aria-label="delete question"
          onClick={() => handleDelete(question.id)}
        >
          <TrashIcon width={25} id="delete" />
        </button>
      </span>
    </div>
  );
}

UsersQuestions.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
    details: PropTypes.string,
    choice1: PropTypes.string.isRequired,
    choice2: PropTypes.string.isRequired,
    choice3: PropTypes.string.isRequired,
    choice4: PropTypes.string.isRequired,
  }).isRequired,
  setQuestionToUpdate: PropTypes.func.isRequired,
  setIsHidden: PropTypes.func.isRequired,
};
export default UsersQuestions;
