import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, Typography, useTheme } from "@material-ui/core";

export function GameCard(props) {
  const [hover, setHover] = useState(false);
  const theme = useTheme();

  const style = {
    card: {
      width: 355,
      height: "100%",
      borderRadius: 16,
      background: theme.palette.myCard,
      overflow: "hidden",
      transition: "all .2s ease",
      transform: hover ? "scale(1.01) translate(0, -5px)" : "scale(1)",
      boxShadow: `0 0 ${hover ? "12px 20px" : "4px 8px"} rgba(0,0,0,0.2)`,
    },
    imageBox: {
      height: "160px",
      overflow: "hidden",
      ...{
        // Gradient to transparent on bottom of image
        WebkitMaskImage:
          "-webkit-linear-gradient(-90deg, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(180deg, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)",
        filter:
          "progid:DXImageTransform.Microsoft.gradient(startColorstr='#000000',endColorstr='#00d4ff',GradientType=1)",
      },
    },
    image: {
      height: "160%",
      width: "120%",
      transform: "rotate(-17deg) translate(-32px, -52px)",
      objectFit: "cover",
    },
    link: {
      color: theme.palette.myText,
      textDecoration: "none",
    },
    textBox: {
      padding: "0 20px 0px 20px",
      transform: "translate(0, -16px)",
    },
    description: {
      paddingTop: "8px",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={style.card}
    >
      <Link to={"/games/" + props.name} style={style.link}>
        <Box style={style.imageBox} component="div">
          <img src={props.image} alt={props.image} style={style.image} />
        </Box>
        <Box style={style.textBox}>
          <Typography variant="h5" fontWeight="bold">
            {props.name}
          </Typography>
          <Typography variant="body1" style={style.description}>
            {props.description}
          </Typography>
        </Box>
      </Link>
    </div>
  );
}
