// pages && components
import Emptypage from "../components/Emptypage";
import Searchbar from "../components/Searchbar";

// assets
import SearchPageCheese from "../assets/searchPageCheese.svg";

function Search() {
  const textStyle = {
    fontSize: "clamp(2.9rem, 10vw, 5rem)",
    textAlign: "center",
  };

  return (
    <>
      <Searchbar />
      <div>
        <Emptypage background={SearchPageCheese} />
      </div>
      <h2 style={textStyle}>
        What is Cheese ? <br /> Baby don't hurt me ...
      </h2>
    </>
  );
}

export default Search;
