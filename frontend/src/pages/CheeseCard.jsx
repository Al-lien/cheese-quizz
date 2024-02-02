// react-router
import { Link, useLoaderData, useLocation } from "react-router-dom";

// library
import { GlobeAltIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

// assets
import Vache from "../assets/icons/cowIcon.svg";
import Brebis from "../assets/icons/eweIcon.svg";
import Chèvre from "../assets/icons/goatIcon.svg";

export async function loader({ params }) {
  const { id } = params;
  const response = await fetch(`http://localhost:3001/api/search/${id}`);
  const data = await response.json();
  return data;
}

function CheeseCard() {
  const location = useLocation();
  const cheeseDetails = useLoaderData();
  console.info(cheeseDetails);

  function setMilk(milk) {
    if (milk === "Vache") {
      return Vache;
    }
    if (milk === "Chèvre") {
      return Chèvre;
    }
    if (milk === "Brebis") {
      return Brebis;
    }
    return null;
  }

  const search = location.state?.search || "";

  return (
    <>
      <div style={{ marginRight: "auto" }}>
        <Link to={`..${search}`} relative="path">
          <ChevronLeftIcon width={50} />
        </Link>
      </div>
      <div className="cheeseDetails">
        <div className="div1"> {cheeseDetails[0].name}</div>
        <div className="div2">
          <img
            src={setMilk(cheeseDetails[0].milk)}
            alt="icon animal lait"
            width={80}
          />
          {cheeseDetails[0].milk}
        </div>
        <div className="div3"> {cheeseDetails[0].region}</div>
        <div className="div4">
          <Link to={cheeseDetails[0].wikiUrl}>
            En savoir plus ... <GlobeAltIcon width={30} />
          </Link>
        </div>
      </div>
    </>
  );
}

export default CheeseCard;
