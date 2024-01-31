// pages && components
import PlayButton from "../components/PlayButton";

// assets
import CheeseQuizzLogo from "../assets/CheeseQuizzLogo.svg";

function Home() {
  return (
    <div className="home">
      <header>
        <h1>CheeseQuizz</h1>
        <img src={CheeseQuizzLogo} alt="Cheese Quizz Logo" width={150} />
      </header>
      <div className="home__description">
        <h2>Choose Your Challenge !</h2>
        <p>
          Test your cheese knowledge and learn more about the best food in the
          world !
        </p>
      </div>
      <PlayButton />
    </div>
  );
}

export default Home;
