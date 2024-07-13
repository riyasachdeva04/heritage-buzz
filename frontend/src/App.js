import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState} from "react";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";

import './App.css';
import { app } from "./firebase";

const auth = getAuth(app);

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [])

  if (user === null){
    return (
      <div classname="App">
        <SigninPage/>
        <SignupPage/>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Hi {user.email}</h1>
      <button onClick={() => {signOut(auth)}}>Logout</button>
    </div>
  );
}

export default App;
