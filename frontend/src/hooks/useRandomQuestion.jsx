import { useState } from "react";

function useRandomQuestion() {
  const [randomQuestions, setRandomQuestions] = useState([]);

  const generateRandomNumber = (nbr) => {
    if (randomQuestions.length === nbr) {
      console.info("All questions have been asked !");
    }

    const randomNumber = Math.floor(Math.random() * nbr);

    if (randomQuestions.includes(randomNumber)) {
      return generateRandomNumber(nbr);
    }

    return setRandomQuestions((previous) => [...previous, randomNumber]);
  };

  return {
    generateRandomNumber,
    setRandomQuestions,
    randomQuestions,
  };
}

export default useRandomQuestion;
