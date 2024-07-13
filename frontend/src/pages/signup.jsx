import React, {useState} from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../firebase";

const auth = getAuth(app);

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = () => {
        createUserWithEmailAndPassword(auth, email, password).then(value =>
             alert('Success'));
    };

    return (
        <div className="signup-page">
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
        </div>
    );
};

export default SignupPage;