import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages & components
import RootLayout from "./layouts/RootLayout";
import AuthRequiredLayout from "./layouts/AuthRequiredLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Quizz, { loader as questionsLoader } from "./pages/Quizz";
import Search, { loader as cheesesLoader } from "./pages/Search";
import CheeseCard, { loader as searchCheeseLoader } from "./pages/CheeseCard";
import Questions, { loader as usersQuestionsLoader } from "./pages/Questions";
import Account from "./pages/Account";

// styles
import "./App.scss";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<AuthRequiredLayout />}>
          <Route index element={<Home />} />
          <Route path="quizz" element={<Quizz />} loader={questionsLoader} />
          <Route path="search" element={<Search />} loader={cheesesLoader} />
          <Route
            path="search/:id"
            element={<CheeseCard />}
            loader={searchCheeseLoader}
          />
          <Route
            path="questions"
            element={<Questions />}
            loader={usersQuestionsLoader}
          />
          <Route path="account" element={<Account />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
