import React, { useState } from "react";
import axios from "axios";

// FORMIK
import { useFormik } from "formik";
import * as yup from "yup";

// MATERIAL
import { Box, Button, TextField, Typography, Container } from "@mui/material";

// DIALOG
import SuccessDialog from "../dialogs/SuccessDialog";
import ErrorDialog from "../dialogs/ErrorDialog";

const validationSchema = yup.object({
  lastname: yup.string().required("Veuillez remplir ce champ"),
  firstname: yup.string().required("Veuillez remplir ce champ"),
  email: yup
    .string()
    .email("Format d'email invalide")
    .required("Veuillez remplir ce champ"),
  message: yup.string().required("Veuillez remplir ce champ"),
});

function Contact() {
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const formik = useFormik({
    initialValues: {
      lastname: "",
      firstname: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          `https://formspree.io/f/${
            import.meta.env.VITE_APP_FORMSPREE_FORM_ID
          }`,
          values
        )
        .then((response) => {
          if (response.status === 200) {
            setOpenSuccessDialog(true);
          } else {
            setOpenErrorDialog(true);
          }
        });
    },
  });
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={6}
        mb={4}
      >
        <Typography variant="h5" gutterBottom>
          Contactez-nous
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        <TextField
          id="lastname"
          name="lastname"
          label="Nom"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          sx={{
            width: "40%",
          }}
        />
        <TextField
          id="firstname"
          name="firstname"
          label="Prénom"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
          sx={{
            width: "40%",
          }}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            width: "40%",
          }}
        />
        <TextField
          id="message"
          name="message"
          label="Message"
          variant="outlined"
          multiline
          rows={8}
          onChange={formik.handleChange}
          value={formik.values.message}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          sx={{
            width: "40%",
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Envoyer
        </Button>
      </Box>
      <SuccessDialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
      />
      <ErrorDialog
        open={openErrorDialog}
        onClose={() => setOpenErrorDialog(false)}
      />
    </Container>
  );
}

export default Contact;
