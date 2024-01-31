// react
import { useState } from "react";

// utilities
import { checkEmailFormat, checkPasswordMatch } from "../utilities";

// styles
import "./styles/Form.scss";
import PasswordValidation from "./PasswordValidation";
import useSignup from "../hooks/useSignup";

function SignupForm() {
  const { signup, isLoading, error } = useSignup();
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await signup(email, firstPassword);
    setEmail("");
    setFirstPassword("");
    setConfirmpassword("");
  }

  return (
    <form method="POST" className="auth-form" onSubmit={handleSubmit}>
      {error && <i>{error}</i>}
      <input
        type="email"
        name="email"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={firstPassword}
        onChange={(e) => setFirstPassword(e.target.value)}
        placeholder="mot de passe"
      />
      <input
        type="password"
        name="confirmpassword"
        value={confirmpassword}
        onChange={(e) => setConfirmpassword(e.target.value)}
        placeholder="confirmer le mot de passe"
      />
      {!checkPasswordMatch(firstPassword, confirmpassword) && (
        <i>Les mots de passes ne correspondent pas</i>
      )}
      <PasswordValidation firstPassword={firstPassword} />
      <button
        type="submit"
        disabled={isLoading}
        className={
          checkEmailFormat(email) &&
          checkPasswordMatch(firstPassword, confirmpassword)
            ? "btn"
            : "btn deadButton"
        }
      >
        S&apos;inscrire
      </button>
    </form>
  );
}

export default SignupForm;
