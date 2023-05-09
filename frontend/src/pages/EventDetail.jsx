import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// MATERIAL
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

// CONTEXT
import { useAuthContext } from "../contexts/AuthContext";

// SERVICE
import profileAPI from "../services/profileAPI";

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

  const handleBookmarkToggle = () => {
    if (!user) {
      setOpenLogin(true);
      return;
    }

    if (isSaved) {
      // L'événement est déjà enregistré, procédez à la suppression
      profileAPI
        .delete(`/api/users/${id}/favorites`)
        .then(() => {
          setIsSaved(false); // Met à jour l'état pour indiquer que l'événement n'est plus enregistré
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de l'événement :",
            error
          );
        });
    } else {
      // L'événement n'est pas enregistré, procédez à l'enregistrement
      profileAPI
        .post(`/api/users/${id}/favorites`)

        .then(() => {
          setOpen(true); // Ouvre la boîte de dialogue de sauvegarde
          setIsSaved(true); // Met à jour l'état pour indiquer que l'événement est sauvegardé
        })
        .catch((error) => {
          console.error("Erreur lors de la sauvegarde de l'événement :", error);
        });
    }
  };

  return (
    <div className="detailsEvent--global">
      <div key={eventId.id}>
        <img src={eventId.image} alt={eventId.title} />
        <h1>{eventId.title}</h1>
        {isSaved ? (
          <BookmarkIcon onClick={handleBookmarkToggle} />
        ) : (
          <BookmarkBorderIcon onClick={handleBookmarkToggle} />
        )}
        <h2>{eventId.category}</h2>
        <p>{eventId.description}</p>
        <p>{eventId.address}</p>
        <p>{eventId.date}</p>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "Sauvegarde d'événement"
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            L'événement a été ajouté à vos favoris.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        aria-labelledby="login-dialog-title"
        aria-describedby="login-dialog-description"
      >
        <DialogTitle id="login-dialog-title">"Connexion requise"</DialogTitle>
        <DialogContent>
          <DialogContentText id="login-dialog-description">
            Vous devez être connecté pour ajouter un événement.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogin(false)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventDetail;
