import React from "react";
import { useFormik } from "formik";

function Contact() {
  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      email: "",
      message: "",
    },
    onSubmit: () => {
      // TODO post
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="lastname">
          Nom:
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
          />
        </label>
        <label htmlFor="firstname">
          Prenom:
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>
        <label htmlFor="message">
          Message:
          <input
            type="text"
            name="message"
            id="message"
            onChange={formik.handleChange}
            value={formik.values.message}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
