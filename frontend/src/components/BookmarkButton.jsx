import PropTypes from "prop-types";

// MATERIAL
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";

function BookmarkButton({ isSaved, handleBookmarkToggle }) {
  return isSaved ? (
    <BookmarkAddedIcon
      sx={{ color: "#242d54", marginLeft: "0.5rem" }}
      onClick={handleBookmarkToggle}
    />
  ) : (
    <BookmarkBorderIcon
      onClick={handleBookmarkToggle}
      sx={{ color: "#242d54", marginLeft: "0.5rem" }}
    />
  );
}

BookmarkButton.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  handleBookmarkToggle: PropTypes.func.isRequired,
};

export default BookmarkButton;
