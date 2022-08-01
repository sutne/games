import { Typography, useTheme } from "@mui/material";

import "./GameCard.css";
import { Game } from "../../../games";
import { Link } from "../../../components/Link";

export function GameCard(game: Game) {
  if (game.disabled) return <GameCardDisabled {...game} />;
  return <GameCardEnabled {...game} />;
}

function GameCardEnabled({ name, image, description }: Game) {
  const theme = useTheme();

  return (
    <Link to={`/${name}`}>
      <div
        className="game-card-enabled"
        style={{ background: theme.palette.background.paper }}
      >
        <div className="image-box">
          <img src={image} alt={name} className="image" />
        </div>
        <div className="text-box">
          <Typography variant="h5">{name}</Typography>
          <Typography className="description" variant="body1">
            {description}
          </Typography>
        </div>
      </div>
    </Link>
  );
}

function GameCardDisabled({ name, image }: Game) {
  const theme = useTheme();

  return (
    <div
      className="game-card-disabled"
      style={{
        background: theme.palette.background.disabled,
        borderColor: theme.palette.grey[400],
      }}
    >
      <div className="image-box">
        <img src={image} alt={name} className="image" />
      </div>
      <div className="text-box">
        <Typography variant="h5">{name}</Typography>
      </div>
    </div>
  );
}
