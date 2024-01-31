// react
import { useState } from "react";

// styles
import "./styles/Searchbar.scss";

// library
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Searchbar() {
  const [isDarkBackground, setisDarkBackground] = useState(false);

  function handleBackground(e) {
    setisDarkBackground(e);
  }
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
          onFocus={() => handleBackground(true)}
          onBlur={() => handleBackground(false)}
        />
        <MagnifyingGlassIcon width={30} />
      </form>
    </>
  );
}

export default Searchbar;
