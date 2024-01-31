// react-router
import { NavLink } from "react-router-dom";

// styles
import "./styles/Navbar.scss";

// library
import { UserIcon } from "@heroicons/react/24/solid";
import {
  Squares2X2Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// assets
import navbarCheeseLogo from "../assets/navbarCheeseLogo.svg";

function Navbar() {
  return (
    <footer className="navbarFooter">
      <NavLink
        to="."
        end
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <Squares2X2Icon width={30} stroke="#ABD1C6" />
      </NavLink>

      <NavLink
        to="search"
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <MagnifyingGlassIcon width={30} stroke="#ABD1C6" />
      </NavLink>

      <NavLink
        to="questions"
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <img
          id="navbarCheeseIcon"
          src={navbarCheeseLogo}
          alt="cheese-logo-to-Questions-page"
          width={30}
        />
      </NavLink>

      <NavLink
        to="account"
        className={({ isActive }) => (isActive ? "active" : null)}
      >
        <UserIcon width={30} fill="#ABD1C6" />
      </NavLink>

      <div className="underline" />
    </footer>
  );
}

export default Navbar;
