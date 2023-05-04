// SignupForm.js
import React, { useCallback, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSignup = async () => {
    const { email, password } = formData;

    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
      });

      onSuccess(response.data.token);
    } catch (erreur) {
      setError("Une erreur s'est produite lors de l'inscription.");
    }
  };

  return (
    <>
      <h2>Inscription</h2>
      {error && <p className="error-message">{error}</p>}
      <form>
        <div>
          <label>
            Email :
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Mot de passe :
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="button" onClick={handleSignup}>
          Valider
        </button>
      </form>
    </>
  );
}

SignupForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SignupForm;
