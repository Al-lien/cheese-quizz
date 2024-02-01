// react
import { useState } from "react";

// react-router
import { useLoaderData } from "react-router-dom";

// pages && components
import Emptypage from "../components/Emptypage";
import Searchbar from "../components/Searchbar";

// assets
import SearchPageCheese from "../assets/searchPageCheese.svg";
import SearchList from "../components/SearchList";

export async function loader() {
  const response = await fetch("http://localhost:3001/api/cheeses");
  const data = await response.json();
  return data;
}

function Search() {
  const cheeseList = useLoaderData();
  const [searchTerms, setSearchTerms] = useState("");

  const [isDarkBackground, setisDarkBackground] = useState(false);

  function handleBackground(e) {
    setisDarkBackground(e);
  }

  const textStyle = {
    fontSize: "clamp(2.9rem, 10vw, 5rem)",
    textAlign: "center",
  };

  return (
    <>
      <div
        className="search-container"
        onFocus={() => handleBackground(true)}
        onBlur={() => handleBackground(false)}
      >
        <Searchbar
          setSearchTerms={setSearchTerms}
          searchTerms={searchTerms}
          isDarkBackground={isDarkBackground}
        />
        {cheeseList && (
          <SearchList cheeseList={cheeseList} searchTerms={searchTerms} />
        )}
      </div>
      {searchTerms.length > 0 ? null : (
        <>
          <Emptypage background={SearchPageCheese} />
          <h2 style={textStyle}>
            What is Cheese ? <br /> Baby don't hurt me ...
          </h2>
        </>
      )}
    </>
  );
}

export default Search;
