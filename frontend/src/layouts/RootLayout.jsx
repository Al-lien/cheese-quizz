// react-router
import { Navigate, Outlet } from "react-router-dom";

// logo
import CheeseQuizzLogo from "../assets/CheeseQuizzLogo.svg";

function RootLayout() {
  const user = window.localStorage.getItem("user");
  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <header>
        <h1>CheeseQuizz</h1>
        <img src={CheeseQuizzLogo} alt="Cheese Quizz Logo" width={150} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
