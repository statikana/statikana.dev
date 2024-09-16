import '../CSS/Card.css';
import { Link } from 'react-router-dom';

function Card() {
    return (<>
      <script src="https://kit.fontawesome.com/04c5cc98c2.js" crossorigin="anonymous"></script>
  
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Statikana's Place</title>
      {/* Standard Meta Tags */}
      <meta name="keywords" content="statikana, Website" />
      <meta name="author" content="statikana" />
      <link rel="shortcut icon" type="image/x-icon" href="../favicon-2.ico?" />
      <div className="container">
        <div className="card">
          <div className="profile-pic">
            <img src={require("../avatar-2.png")} />
            <h2>im statikana</h2>
          </div>
          <div className="profile-text">
            <p>
              hello! im a huge nerd
              <br />
              <br />
              <i>- made with &lt;3 by maxine, fretgfr, and me -</i>
            </p>
            <div className="hallow-buttons">
              <Link to="/Resources">resources</Link>
              <Link to="/Snake">snake</Link>
            </div>
            <div className="buttons">
              <a
                href="https://github.com/statikana"
                className="icon-circle"
                target="_blank"
              >
                <i className="fab fa-github fa-lg" /> GitHub
              </a>
              <a
                href="https://steamcommunity.com/id/statikana/"
                className="icon-circle"
                target="_blank"
              >
                <i className="fab fa-steam fa-lg" /> Steam
              </a>
              <a
                href="https://open.spotify.com/user/316zjyinwzuogs4p7ktjraudcm4u?si=196871c2c33c4a4a"
                className="icon-circle"
                target="_blank"
              >
                <i className="fab fa-spotify fa-lg" /> Spotify
              </a>
              <a
                href="https://discord.com/users/724811595976409119"
                className="icon-circle"
                target="_blank"
              >
                <i className="fab fa-discord fa-lg" /> Discord
              </a>
              <a
                href="mailto:contact@statikana.dev"
                className="icon-circle"
                target="_blank"
              >
                <i className="fa-solid fa-envelope" /> Mail
              </a>
            </div>
          </div>
        </div>
      </div>
    </>);
  }
  export default Card;