// react
import { useState } from "react";

// hooks
import useQuestionsContext from "./useQuestionsContext";

function useUpdateQuestion() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useQuestionsContext();

  const updateQuestion = async (questionToUpdate, id) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`http://localhost:3001/api/questions/${id}`, {
      method: "PATCH",
      body: JSON.stringify(questionToUpdate),
      headers: {
        "Content-Type": "application/json" /* ,
        Authorization: `Bearer ${parentContext.token}`, */,
      },
    });
    const question = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(question.error);
    }

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      dispatch({ type: "UPDATE_QUESTION", payload: question[0] });
    }
  };
  return { updateQuestion, isLoading, error };
}

export default useUpdateQuestion;
