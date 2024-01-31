// proptypes
import { PropTypes } from "prop-types";

// styles
import "./styles/Options.scss";

function Options({
  option,
  selectedAnswer,
  setSelectedAnswer,
  isCorrectAnswer,
}) {
  function handleClick(e) {
    setSelectedAnswer(e);
  }

  let activeStyle = {
    backgroundColor: null,
  };

  if (isCorrectAnswer !== null && isCorrectAnswer === option) {
    activeStyle = {
      backgroundColor: "#abd1c6",
    };
  } else if (isCorrectAnswer !== null && isCorrectAnswer !== option) {
    activeStyle = {
      backgroundColor: "#f15b5880",
    };
  }

  return (
    <button
      type="button"
      onClick={() => handleClick(option)}
      className={
        selectedAnswer === option ? "option btn selected" : "option btn"
      }
      style={activeStyle}
    >
      {option}
    </button>
  );
}

Options.propTypes = {
  option: PropTypes.string,
  selectedAnswer: PropTypes.string,
  setSelectedAnswer: PropTypes.func,
  isCorrectAnswer: PropTypes.string,
};

Options.defaultProps = {
  option: undefined,
  selectedAnswer: null,
  setSelectedAnswer: undefined,
  isCorrectAnswer: null,
};

export default Options;
