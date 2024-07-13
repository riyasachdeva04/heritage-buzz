import React from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { app } from "../firebase";

const auth = getAuth(app);

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" style={{'margin': 0}}>
                <div className="container-fluid">
                <a className="navbar-brand" href="/">Heritage Buzz</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/generate">Generate</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/catalogue">Catalogue</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={() => {signOut(auth)}}>Logout</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;