import React, {useState} from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../firebase";
import SigninPage from "./signin";

const auth = getAuth(app);

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password).then(value =>
             alert('Success'));
    };

    const [showSigninPage, setShowSigninPage] = useState(false);

    return (
        <div className="signup-page container">
            <h1>Sign Up</h1>
            <label>Email</label>
            <input 
            onChange={e => setEmail(e.target.value)}
            value = {email}
            type="email" required placeholder="Enter email"/>
            <label>Password</label>
            <input 
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password" required placeholder="Enter Password"/>
            <button onClick={createUser}>Sign Up</button>
            <button onClick={() => setShowSigninPage(true)}>Sign in instead?</button>
            {showSigninPage && <SigninPage />}
        </div>
    );
};

export default SignupPage;