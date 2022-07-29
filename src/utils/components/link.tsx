import { useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = {
  to: string;
  children: JSX.Element;
};

export function Link(props: LinkProps) {
  const theme = useTheme();
  const style = {
    textDecoration: "none",
    color: theme.palette.text.primary,
  };
  return (
    <RouterLink to={props.to} style={style}>
      {props.children}
    </RouterLink>
  );
}
