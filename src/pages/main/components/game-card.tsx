import { Typography, useTheme } from "@mui/material";

import "./game-card.css";
import { Game } from "../../../game-list";
import { Link } from "../../../utils/components/link";

export function GameCard(props: Game) {
  const { name, disabled, image, description } = props;
  const theme = useTheme();

  if (!disabled) {
    return (
      <Link to={`/${name}`}>
        <Card
          className="game-card"
          name={name}
          image={image}
          description={{
            value: description,
            color: theme.palette.text.primary,
          }}
          background={theme.palette.background.paper}
        />
      </Link>
    );
  } else {
    return (
      <Card
        className="game-card disabled"
        name={name}
        image={image}
        description={{ value: "Under Construction", color: theme.game.red }}
        background={theme.palette.background.disabled}
      />
    );
  }
}

type CardProps = {
  className: string;
  name: string;
  description: {
    value: string;
    color: string | undefined;
  };
  background: string | undefined;
  image: any;
};

function Card(props: CardProps) {
  return (
    <div className={props.className} style={{ background: props.background }}>
      <div className="image-box">
        <img src={props.image} alt={props.name} className="image" />
      </div>
      <div className="text-box">
        <Typography variant="h5">{props.name}</Typography>
        <Typography
          className="description"
          variant="body1"
          style={{ color: props.description.color }}
        >
          {props.description.value}
        </Typography>
      </div>
    </div>
  );
}
