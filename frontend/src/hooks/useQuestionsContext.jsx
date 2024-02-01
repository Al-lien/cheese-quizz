// react
import { useContext } from "react";

// context
import { QuestionsContext } from "../context/QuestionsContext";

function useQuestionsContext() {
  const context = useContext(QuestionsContext);

  if (!context) {
    throw Error(
      "useQuestionsContext must be used inside an QuestionsContextProvider"
    );
  }

  return context;
}

export default useQuestionsContext;
