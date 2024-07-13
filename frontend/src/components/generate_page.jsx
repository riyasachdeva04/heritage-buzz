import React from 'react';
import artImg from "../images/art.jpg";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";

const GeneratePage = () => {
    // Your code for fetching and storing catalog data goes here

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Choose an artform</h1>
            <div className="dropdown" style={{ display: 'inline-block' }}>
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Dropdown link
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                        <a className="dropdown-item" href="/">
                            Madhubani
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">
                            Gond
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">
                            Kalighat
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">
                            Kangra
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">
                            Mural
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">
                            Mandana
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">
                            Warli
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="/">
                            Pichwai
                        </a>
                    </li>
                </ul>
            </div>
            <br/>
            <br/>
            <img src={artImg} alt="Art" style={{ maxWidth: '100%', height: 'auto' }} />
            <br/>
            <h2>OR</h2>
            <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Upload custom design</button>
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '10rem', height: 'auto', borderRadius: '50%', overflow: 'hidden', margin: '0 1rem', border: '2px solid black' }}>
                    <img src={img1} alt="Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width: '10rem', height: 'auto', borderRadius: '50%', overflow: 'hidden', margin: '0 1rem', border: '2px solid black' }}>
                    <img src={img2} alt="Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width: '10rem', height: 'auto', borderRadius: '50%', overflow: 'hidden', margin: '0 1rem', border: '2px solid black' }}>
                    <img src={img3} alt="Art" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>
            <br />
        </div>
    );
};

export default GeneratePage;