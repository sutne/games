import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";

export function GameCard(game) {
  const theme = useTheme();

  const [hover, setHover] = useState(false);

  const cardStyle = {
    width: 355,
    borderRadius: 16,
    overflow: "hidden",
    transform: hover ? "scale(1.01) translate(0, -5px)" : "scale(1)",
    boxShadow:
      "4px " + (hover ? "12px 20px" : "4px 8px") + " 4px rgba(0,0,0,0.2)",
    transition: "all .2s ease",
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
  const contentStyle = {
    padding: 0,
    background: theme.palette.myCard,
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
    height: 42,
    textAlign: "bottom",
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={cardStyle}
    >
      <Box style={contentStyle}>
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
      </Box>
    </div>
  );
}
