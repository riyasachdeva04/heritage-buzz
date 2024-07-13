import React, {useState} from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {app} from '../firebase';

const auth = getAuth(app);

const SigninPage = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const signinUser = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((value) => {console.log("Success!")})
        .catch((err) => console.log(err));
    };

    return (
        <div className="signin-page">
            <h1>Sign In</h1>
            <label>Email</label>
            <input onChange={e => setEmail(e.target.value)}
            value = {email} 
            type="email" placeholder="Enter email" />
            <label>Password</label>
            <input 
            onChange = {e => setPassword(e.target.value)}
            value={password}
            type="password" placeholder="Enter password"/>
            <button onClick={signinUser}>Sign in</button>
        </div>
    );
};

export default SigninPage;