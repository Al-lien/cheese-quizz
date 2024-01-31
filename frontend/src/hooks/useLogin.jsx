// react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  /* const { setItem } = useLocalStorage("user"); */
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message);
      }
      if (response.ok) {
        const userCredentials = {
          email,
          token: json.token,
          id: json.id,
        };
        window.localStorage.setItem("user", JSON.stringify(userCredentials));
        navigate("/home");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { login, isLoading, error };
}
