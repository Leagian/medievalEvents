import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function SocialShareButtons() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(
    "Super site qui recense tous les évènements médievaux de France! Ajoutez le vôtre!"
  );

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;

  return (
    <div>
      <IconButton
        component="a"
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </IconButton>

      <IconButton
        component="a"
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        component="a"
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkedInIcon />
      </IconButton>
    </div>
  );
}

export default SocialShareButtons;
