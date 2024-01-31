// react-router
import { NavLink } from "react-router-dom";

// library
import {
  ChevronRightIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

// styles
import "./styles/AccountNavbar.scss";

// assets
import CowIcon from "../assets/icons/cowIcon.svg";
import EweIcon from "../assets/icons/eweIcon.svg";
import GoatIcon from "../assets/icons/goatIcon.svg";
import useLocalStorage from "../hooks/useLocalStorage";

function AccountNavbar() {
  const { removeItem } = useLocalStorage("user");
  return (
    <nav className="accountNavbar">
      <NavLink to="trophees">
        <img src={CowIcon} alt="Cow icon" />
        <span>Mes trophées</span>
        <ChevronRightIcon width={30} />
      </NavLink>
      <NavLink to="friends">
        <img src={EweIcon} alt="Ewe icon" />
        <span>Mes amis</span>
        <ChevronRightIcon width={30} />
      </NavLink>
      <NavLink to="cheeses">
        <img src={GoatIcon} alt="Goat icon" />
        <span>Mes fromages</span>
        <ChevronRightIcon width={30} />
      </NavLink>
      <NavLink to="/login" onClick={() => removeItem()}>
        <ArrowRightEndOnRectangleIcon width={50} />
        <span>Me déconnecter</span>
      </NavLink>
    </nav>
  );
}

export default AccountNavbar;
