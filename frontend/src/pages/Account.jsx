// pages && components
import AccountNavbar from "../components/AccountNavbar";
import AccountUser from "../components/AccountUser";

function Account() {
  return (
    <main className="account-container">
      <AccountUser />
      <AccountNavbar />
    </main>
  );
}

export default Account;
