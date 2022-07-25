import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Im just setting things up to make sure my stack works as intended.
        </p>
        <p>Stay Tuned for actual games here.</p>
        <Link to="/games/minesweeper" className="App-link">
          Go to Minesweeper
        </Link>
      </header>
    </div>
  );
}

export default Main;
