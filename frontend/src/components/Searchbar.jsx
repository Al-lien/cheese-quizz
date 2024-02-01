// proptypes
import PropTypes from "prop-types";

// styles
import "./styles/Searchbar.scss";

// library
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Searchbar({ searchTerms, setSearchTerms, isDarkBackground }) {
  function inputHandler(e) {
    setSearchTerms(e);
  }

  const activeStyle = {
    borderRadius: "30px 30px 0 0",
  };

  const inactiveStyle = {
    borderRadius: "30px 30px 30px 30px",
  };

  return (
    <>
      <div
        className="search-filter"
        style={{ opacity: isDarkBackground ? "0.75" : "0" }}
      />
      <form className="searchbar">
        <input
          type="search"
          placeholder="Où est mon fromage ?"
          value={searchTerms}
          onChange={(e) => inputHandler(e.target.value)}
          style={searchTerms.length > 0 ? activeStyle : inactiveStyle}
        />
        <MagnifyingGlassIcon width={30} />
      </form>
    </>
  );
}

Searchbar.propTypes = {
  searchTerms: PropTypes.string.isRequired,
  setSearchTerms: PropTypes.func.isRequired,
  isDarkBackground: PropTypes.bool.isRequired,
};

export default Searchbar;
