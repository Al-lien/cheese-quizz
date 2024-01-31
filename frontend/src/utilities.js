export async function signup(email, password) {
  const response = await fetch("http://localhost:3001/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (response.ok) {
    console.info(json);
  }
}

// check if input email match pattern
export function checkEmailFormat(email) {
  const validEmailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
  if (validEmailRegex.test(email)) {
    return true;
  }
  return false;
}

// check if input passwords are the same && match pattern
export function checkPasswordMatch(firstPassword, secondPassword) {
  if (
    firstPassword.length >= 8 &&
    /[A-Z]/.test(firstPassword) &&
    /[0-9]/.test(firstPassword) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(firstPassword) &&
    (firstPassword !== "" || secondPassword !== "") &&
    firstPassword === secondPassword
  ) {
    return true;
  }

  return false;
}

// add leading zero if number < 10
export function addLeadingZero(number) {
  return number > 9 ? number : `0${number}`;
}

// Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
export function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, 0);
  const seconds = (timeInSeconds % 60).toString().padStart(2, 0);
  return `${minutes}:${seconds}`;
}

// Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
export function formatQuestionLength(question) {
  if (question.length < 40) {
    return question;
  }
  const splittedQuestion = `${question.substring(0, 40)}. . .`;
  return splittedQuestion;
}

// manage request
export const questionReducer = (state, action) => {
  switch (action.type) {
    case "GET_QUESTIONS":
      return {
        questions: action.payload,
      };
    case "CREATE_QUESTION":
      return {
        questions: [action.payload, ...state.questions],
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
