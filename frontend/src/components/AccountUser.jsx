// styles
import "./styles/AccountUser.scss";

// assets
import UserFace from "../assets/userFace.svg";

function AccountUser() {
  return (
    <div className="userCard">
      <img src={UserFace} alt="user profil pic" />
      <div className="userCard__names">
        <h3>John Doe</h3> <br />
        <h4>the cheese monger</h4>
      </div>
    </div>
  );
}

export default AccountUser;
