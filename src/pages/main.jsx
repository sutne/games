import logo from "../assets/logo.svg";

function Main() {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Im just setting things up to make sure my stack works as intended.
        </p>
        <p>Stay Tuned for actual games here.</p>
        <a
          className="App-link"
          href="/minesweeper"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Minesweeper
        </a>
      </header>
    </div>
  );
}

export default Main;
