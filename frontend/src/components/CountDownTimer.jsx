// proptypes
import PropTypes from "prop-types";

// react
import React, { useState, useEffect } from "react";

function CountdownTimer({ seconds }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) return {};

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  return <div>{timeLeft === 0 ? <p>🔥</p> : <h2>{timeLeft}</h2>}</div>;
}

CountdownTimer.propTypes = {
  seconds: PropTypes.number.isRequired,
};

export default CountdownTimer;
