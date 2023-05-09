import React from "react";

function Contact() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lastname">
          Nom:
          <input type="text" name="lastname" id="lastname" />
        </label>
        <label htmlFor="firstname">
          Prenom:
          <input type="text" name="firstname" id="firstname" />
        </label>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="message">
          Message:
          <input type="text" name="message" id="message" />
        </label>
      </form>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Contact;
