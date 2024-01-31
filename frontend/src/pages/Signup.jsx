// react-router
import { Link } from "react-router-dom";

// pages && components
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <div className="auth">
      <h2>S'inscrire</h2>
      <div className="forms">
        <SignupForm />
      </div>
      <Link to="/login">
        Vous avez déjà un compte ? <span>Se connecter</span>
      </Link>
    </div>
  );
}

export default Signup;
