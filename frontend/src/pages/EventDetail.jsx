import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// MATERIAL
import { IconButton, Typography, Link as MuiLink, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// DIALOG
import AlertFavDialog from "../dialogs/AlertFavDialog";

// COMPONENT
import EventImage from "../components/EventImage";
import BookmarkButton from "../components/BookmarkButton";

// CONTEXT
import { useAuthContext } from "../contexts/AuthContext";
import { useDataContext } from "../contexts/DataContext";

// HELPER
import formatDate from "../helpers/DateHelper";

// SERVICE
import profileAPI from "../services/profileAPI";

function EventDetail() {
  const [eventId, setEventId] = useState({});
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate(); // HandlePrevious retour à la page précédente

  const { id } = useParams();
  const { user } = useAuthContext();
  const { filterApprovedEvents } = useDataContext();

  useEffect(() => {
    profileAPI
      .get(`/api/events/${id}`)
      .then((res) => {
        const event = { ...res.data, date: formatDate(res.data.date) };
        setEventId(event);
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
  }, [id, user, filterApprovedEvents]);

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

  const handlePrevious = () => {
    navigate(-1);
  };

  let siteUrl = "";
  if (eventId.site) {
    siteUrl =
      eventId.site.startsWith("http://") || eventId.site.startsWith("https://")
        ? eventId.site
        : `http://${eventId.site}`;
  }

  return (
    <div>
      {eventId && eventId.isApproved === 1 && (
        <div className="detailsEvent">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            key={eventId.id}
          >
            <Box
              mt={6}
              mb={6}
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              width="100%"
            >
              <IconButton onClick={handlePrevious}>
                <ArrowBackIcon />
                <Typography variant="body1">RETOUR</Typography>
              </IconButton>

              <Typography variant="h5" fontWeight="bold">
                {eventId.title}
                <BookmarkButton
                  isSaved={isSaved}
                  handleBookmarkToggle={handleBookmarkToggle}
                />
              </Typography>

              <MuiLink
                component={Link}
                to={`/categories/${eventId.category}`}
                underline="hover"
                color="inherit"
                sx={{ "&:hover": { color: "#888" } }}
              >
                <Typography variant="h5">{eventId.category}</Typography>
              </MuiLink>
            </Box>

            <Box display="inline-block">
              <EventImage image={eventId.image} alt={eventId.title} />
            </Box>

            <Typography variant="body1" width="60%" mt={4} mb={2}>
              {eventId.description}
            </Typography>
            <Typography variant="body1" mt={2} mb={1}>
              {eventId.address}
            </Typography>
            <MuiLink href={siteUrl} target="_blank" color="inherit">
              {eventId.site}
            </MuiLink>
            <Typography variant="body1" mt={1}>
              {eventId.date}
            </Typography>
          </Box>

          <AlertFavDialog
            open={open}
            setOpen={setOpen}
            title="Sauvegarde d'événement"
            description="L'événement a été ajouté à vos favoris."
          />

          <AlertFavDialog
            open={openLogin}
            setOpen={setOpenLogin}
            title="Connexion requise"
            description="Vous devez être connecté pour ajouter un événement."
          />
        </div>
      )}
    </div>
  );
}

export default EventDetail;
