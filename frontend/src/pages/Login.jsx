import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function Login() {
  return (
    <div className="auth">
      <h2>Se Connecter</h2>
      <div className="forms">
        <LoginForm />
      </div>
      <Link to="/signup">
        Vous n'avez pas de compte ? <span>S&apos;inscrire</span>
      </Link>
    </div>
  );
}

export default Login;
