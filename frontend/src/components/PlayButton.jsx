// assets
import { Link } from "react-router-dom";
import RedCheese from "../assets/RedCheese.svg";

// styles
import "./styles/PlayButton.scss";

function PlayButton() {
  return (
    <Link to="quizz">
      <div id="botbtn" className="playbtn">
        <h2>Let's play !</h2>
        <img src={RedCheese} alt="RedCheese-play-button" />
      </div>
    </Link>
  );
}

export default PlayButton;
