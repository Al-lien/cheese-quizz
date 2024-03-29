// proptypes
import PropTypes from "prop-types";

// styles
import "./styles/SearchList.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchList({ cheeseList, searchTerms }) {
  const [selectCheese, setSelectCheese] = useState({});
  const filteredData = cheeseList.filter((cheese) => {
    if (searchTerms === "") {
      return cheese;
    }
    return cheese.name.toLowerCase().includes(searchTerms.toLowerCase());
  });

  function handleClick(e) {
    setSelectCheese(e);
    console.info(selectCheese);
  }

  return (
    searchTerms.length > 0 && (
      <ul className="searchlist">
        {filteredData.slice(0, 5).map((cheese) => {
          return (
            <Link to={`${cheese.id}`}>
              <button
                type="button"
                key={cheese.id}
                // eslint-disable-next-line no-shadow
                onClick={() => handleClick(cheese)}
              >
                {cheese.name}
              </button>
            </Link>
          );
        })}
      </ul>
    )
  );
}

SearchList.propTypes = {
  cheeseList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      wikiUrl: PropTypes.string.isRequired,
      milk: PropTypes.string.isRequired,
    })
  ).isRequired,
  searchTerms: PropTypes.string.isRequired,
};

export default SearchList;
