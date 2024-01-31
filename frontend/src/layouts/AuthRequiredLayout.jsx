// react-router
import { Navigate, Outlet, useLocation } from "react-router-dom";

// pages & components
import Navbar from "../components/Navbar";

function AuthRequiredLayout() {
  const location = useLocation();

  const userToken = window.localStorage.getItem("user");

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  if (userToken) {
    const { token } = JSON.parse(userToken);
    console.info(token);
    // verify token validity && create .env frontend file to link with backend secret api key
    /* const decoded = jwt.verify(token, "shhhhh");  #EFF0F3 */
  }
  return (
    <>
      <div
        className="authrequirelayout-container"
        style={{
          backgroundColor:
            (location.pathname === "/home/account" && "#ABD1C6") ||
            (location.pathname === "/home/quizz" && "#EFF0F3"),
        }}
      >
        <Outlet />
      </div>
      {location.pathname === "/home/quizz" ? null : <Navbar />}
    </>
  );
}

export default AuthRequiredLayout;
