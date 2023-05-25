import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";

// MATERIAL
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

// COMPONENT
import EventImage from "../components/EventImage";

// CONTEXT
import { useAuthContext } from "../contexts/AuthContext";

// SERVICE
import profileAPI from "../services/profileAPI";

// Dialog Component
function AlertDialog({ open, setOpen, title, description }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// Bookmark Button
function BookmarkButton({ isSaved, handleBookmarkToggle }) {
  return isSaved ? (
    <BookmarkIcon onClick={handleBookmarkToggle} />
  ) : (
    <BookmarkBorderIcon onClick={handleBookmarkToggle} />
  );
}

BookmarkButton.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  handleBookmarkToggle: PropTypes.func.isRequired,
};

function EventDetail() {
  const [eventId, setEventId] = useState({});
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    profileAPI
      .get(`/api/events/${id}`)
      .then((res) => {
        setEventId(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });

    if (user) {
      profileAPI
        .get(`/api/users/${user.id}/favorites`)
        .then((res) => {
          const userFavorites = res.data;
          const isEventInFavorites = userFavorites.some(
            (favoriteEvent) => favoriteEvent.id === parseInt(id, 10)
          );
          setIsSaved(isEventInFavorites);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des favoris de l'utilisateur :",
            error
          );
        });
    }
  }, [id, user]);

  const handleFavoriteEvent = (apiMethod, url, successOpen, failOpen) => {
    apiMethod(url)
      .then(() => {
        setIsSaved(!isSaved);
        setOpen(successOpen);
      })
      .catch((error) => {
        console.error("Erreur lors de la manipulation de l'événement :", error);
        setOpen(failOpen);
      });
  };

  const ensureUserLoggedIn = () => {
    if (!user) {
      setOpenLogin(true);
      return false;
    }
    return true;
  };

  const handleBookmarkToggle = () => {
    if (!ensureUserLoggedIn()) {
      return;
    }

    if (isSaved) {
      // L'événement est déjà enregistré, procédez à la suppression
      handleFavoriteEvent(
        profileAPI.delete,
        `/api/users/${id}/favorites`,
        false,
        true
      );
    } else {
      // L'événement n'est pas enregistré, procédez à l'enregistrement
      handleFavoriteEvent(
        profileAPI.post,
        `/api/users/${id}/favorites`,
        true,
        true
      );
    }
  };

  return (
    <div className="detailsEvent--global">
      <div key={eventId.id}>
        <EventImage image={eventId.image} alt={eventId.title} />
        <h1>{eventId.title}</h1>
        <BookmarkButton
          isSaved={isSaved}
          handleBookmarkToggle={handleBookmarkToggle}
        />
        <Link to={`/categories/${eventId.category}`}>
          <h5>{eventId.category}</h5>
        </Link>
        <p>{eventId.description}</p>
        <p>{eventId.address}</p>
        <p>{eventId.date}</p>
      </div>

      <AlertDialog
        open={open}
        setOpen={setOpen}
        title="Sauvegarde d'événement"
        description="L'événement a été ajouté à vos favoris."
      />

      <AlertDialog
        open={openLogin}
        setOpen={setOpenLogin}
        title="Connexion requise"
        description="Vous devez être connecté pour ajouter un événement."
      />
    </div>
  );
}

export default EventDetail;
