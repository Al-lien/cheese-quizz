// proptypes
import PropTypes from "prop-types";

// react
import { createContext, useMemo, useReducer } from "react";

export const QuestionsContext = createContext();

// manage request
export const questionReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        questions: action.payload,
      };
    case "CREATE_QUESTION":
      return {
        questions: [action.payload, ...state.questions],
      };
    case "UPDATE_QUESTION":
      return {
        questions: [
          action.payload,
          ...state.questions.filter(
            (question) => question.id !== action.payload.id
          ),
        ],
      };
    case "DELETE_QUESTION":
      return {
        questions: state.questions.filter(
          (question) => question.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export function QuestionsContextProvider({ children }) {
  const [state, dispatch] = useReducer(questionReducer, {
    questions: null,
  });

  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <QuestionsContext.Provider value={contextValue}>
      {children}
    </QuestionsContext.Provider>
  );
}

QuestionsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
