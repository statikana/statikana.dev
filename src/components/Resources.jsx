import { Link } from 'react-router-dom';
import '../CSS/Resources.css';

function Resources() {
    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Resources</title>
            {/* Standard Meta Tags */}
            <meta name="description" content="Welcome to my website." />
            <meta name="keywords" content="Statikana, Website" />
            <meta name="author" content="Statikana" />
            <link rel="shortcut icon" type="image/x-icon" href="%PUBLIC_URL%/icon128.ico" />
            <div className="container">
                <div className="card">
                <div className="title">
                    <h2>some cool things that i want to share</h2>
                </div>
                <div className="res-list-container">
                    <h3 className="res-list-title">general</h3>
                    <div className="res-list">
                    <ul>
                        <li>
                        <a href="https://www.wolframalpha.com/">WolframAlpha</a>
                        information engine
                        </li>
                        <li>
                        <a href="https://github.com/sindresorhus/awesome#readme">
                            awesome.re
                        </a>
                        everything awesome
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="res-list-container">
                    <h3 className="res-list-title">programming</h3>
                    <div className="res-list">
                    <ul>
                        <li>
                        <a href="https://github.com/codespaces">GitHub CodeSpaces</a>
                        web IDE
                        </li>
                        <li>
                        <a href="https://emojipedia.org/">Emojipedia</a>
                        emoji dictionary w/ unicode
                        </li>
                        <li>
                        <a href="https://education.github.com/discount_requests/application">
                            GitHub Education
                        </a>
                        many free resources for students and teachers
                        </li>
                        <li>
                        <a href="digitalocean.com">DigitalOcean</a>
                        easy-to-use cloud service (free static sites)
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="res-list-container">
                    <h3 className="res-list-title">windows</h3>
                    <div className="res-list">
                    <ul>
                        <li>
                        <a href="https://antibody-software.com/">AntiBody Software</a>
                        useful Windows utilities
                        </li>
                        <li>
                        <a href="https://nilesoft.org/">Nilesoft Shell</a>
                        better Windows right-click menu
                        </li>
                        <li>
                        <a href="https://github.com/massgravel/Microsoft-Activation-Scripts">
                            MAS-Gravel
                        </a>
                        free Windows / Office activator
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="hallow-buttons">
                    <Link to="/">go back</Link>
                </div>
                </div>
            </div>
        </>
    );
}

export default Resources;