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
import Search from "./pages/Search";
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
          <Route path="search" element={<Search />} />
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
