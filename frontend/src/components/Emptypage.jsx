// proptypes
import PropTypes from "prop-types";

function Emptypage({ background }) {
  return <img src={background} alt="hudge cheese" />;
}

Emptypage.propTypes = {
  background: PropTypes.string.isRequired,
};
export default Emptypage;
