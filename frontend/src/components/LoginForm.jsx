// react
import { useState } from "react";

// hooks
import useLogin from "../hooks/useLogin";

// utilities
import { checkEmailFormat } from "../utilities";

// styles
import "./styles/Form.scss";

function LoginForm() {
  const { login, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <form method="POST" className="auth-form" onSubmit={handleSubmit}>
      {error && <i>{error}</i>}
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button
        disabled={isLoading}
        type="submit"
        className={
          checkEmailFormat(email) && password ? "btn" : "btn deadButton"
        }
      >
        Se connecter
      </button>
    </form>
  );
}

export default LoginForm;
