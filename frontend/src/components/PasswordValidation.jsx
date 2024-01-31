// proptypes
import PropTypes from "prop-types";

// styles
import "./styles/PasswordValidation.scss";

function PasswordValidation({ firstPassword }) {
  return (
    <div className="passwordValidation">
      <ul>
        <small className={firstPassword.length >= 8 ? "regexValid" : undefined}>
          Veuillez écrire au minimun 8 caractères.
        </small>
        <small
          className={/[A-Z]/.test(firstPassword) ? "regexValid" : undefined}
        >
          Veuillez écrire au minimun une majuscule.
        </small>

        <small
          className={/[0-9]/.test(firstPassword) ? "regexValid" : undefined}
        >
          Veuillez écrire au minimun un chiffre.
        </small>
        <small
          className={
            /[!@#$%^&*(),.?":{}|<>]/.test(firstPassword)
              ? "regexValid"
              : undefined
          }
        >
          Veuillez écrire au minimun un caractère spécial.
        </small>
      </ul>
    </div>
  );
}

PasswordValidation.propTypes = {
  firstPassword: PropTypes.string.isRequired,
};

export default PasswordValidation;
