import PropTypes from "prop-types";

// MATERIAL
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

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

export default BookmarkButton;
