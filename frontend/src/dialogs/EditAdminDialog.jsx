import React from "react";
import PropTypes from "prop-types";

// MATERIAL
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

function EditAdminDialog({
  open,
  handleClose,
  handleUpdate,
  handleImageChange,
  handleChange,
  editingEvent,
  categorieList,
  setEditingEvent,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          height: "80vh",
        },
      }}
    >
      <DialogTitle>Modifier l'événement</DialogTitle>
      <DialogContent>
        {editingEvent && (
          <>
            <TextField
              inputProps={{
                style: {
                  width: "400px",
                  height: "50px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                },
              }}
              label="Titre"
              value={editingEvent.title}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
            />
            <TextField
              inputProps={{
                style: {
                  width: "400px",
                  height: "200px",
                },
              }}
              multiline
              rows={4}
              label="Description"
              value={editingEvent.description}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  description: e.target.value,
                })
              }
            />
            <TextField
              type="file"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />

            <TextField
              inputProps={{
                style: {
                  width: "400px",
                  height: "50px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                },
              }}
              label="Adresse"
              value={editingEvent.address}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, address: e.target.value })
              }
            />
            <TextField
              inputProps={{
                style: {
                  width: "400px",
                  height: "50px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                },
              }}
              label="Site"
              value={editingEvent.site}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, site: e.target.value })
              }
            />
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={editingEvent.date}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, date: e.target.value })
              }
            />
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="categorie-label">Catégorie</InputLabel>
              <Select
                value={
                  editingEvent.categorie_id
                    ? String(editingEvent.categorie_id)
                    : ""
                }
                onChange={handleChange}
              >
                {categorieList.map((category) => (
                  <MenuItem key={category.id} value={String(category.id)}>
                    {category.cat_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ minWidth: 200 }}>
              <InputLabel id="isApproved-label">Pending</InputLabel>
              <Select
                value={editingEvent.isApproved}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    isApproved: Number(e.target.value),
                  })
                }
                style={{ width: 150 }} // Agrandissement du SELECT
              >
                <MenuItem value={0}>Non approuvé</MenuItem>
                <MenuItem value={1}>Approuvé</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button onClick={handleUpdate}>Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
}

EditAdminDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setEditingEvent: PropTypes.func.isRequired,
  editingEvent: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.string,
    site: PropTypes.string,
    date: PropTypes.string,
    categorie_id: PropTypes.string,
    isApproved: PropTypes.number,
  }).isRequired,
  categorieList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      cat_name: PropTypes.string,
    })
  ).isRequired,
};

export default EditAdminDialog;
