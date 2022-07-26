import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, Typography, useTheme } from "@material-ui/core";

export function GameCard(game) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  const cardStyle = {
    width: 355,
    height: "100%",
    borderRadius: 16,
    background: theme.palette.myCard,
    overflow: "hidden",
    transition: "all .2s ease",
    transform: hover ? "scale(1.01) translate(0, -5px)" : "scale(1)",
    boxShadow:
      "4px " + (hover ? "12px 20px" : "4px 8px") + " 4px rgba(0,0,0,0.2)",
  };
  const imageBoxStyle = {
    height: "160px",
    overflow: "hidden",
    "-webkit-mask-image":
      "-webkit-gradient(linear, top, bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
    "mask-image":
      "linear-gradient(to bottom, black 52px,black calc(100% - 52px),transparent)",
  };
  const imageStyle = {
    height: "160%",
    width: "120%",
    transform: "rotate(-17deg) translate(-32px, -52px)",
    objectFit: "cover",
  };
  const linkStyle = {
    color: theme.palette.myText,
    textDecoration: "none",
  };
  const textBoxStyle = {
    padding: "0 20px 0px 20px",
    transform: "translate(0, -16px)",
  };
  const descriptionStyle = {
    paddingTop: "8px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={cardStyle}
    >
      <Link to={"/games/" + game.name} style={linkStyle}>
        <Box style={imageBoxStyle} component="div">
          <img src={game.image} alt={game.image} style={imageStyle} />
        </Box>
        <Box style={textBoxStyle}>
          <Typography variant="h5">{game.name}</Typography>
          <Typography variant="body1" style={descriptionStyle}>
            {game.description}
          </Typography>
        </Box>
      </Link>
    </div>
  );
}
