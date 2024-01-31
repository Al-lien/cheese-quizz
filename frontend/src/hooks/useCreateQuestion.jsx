// react
import { useState } from "react";

function useCreateQuestion() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const createQuestion = async (newQuestion) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3001/api/questions", {
      method: "POST",
      body: JSON.stringify(newQuestion),
      headers: {
        "Content-Type": "application/json",
        /* Authorization: `Bearer ${user.token}`, */
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
      /* dispatch({ type: "CREATE_CHILDREN", payload: child }); */
    }
  };
  return { createQuestion, isLoading, error };
}

export default useCreateQuestion;
