import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState} from "react";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import Navbar from "./components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Footer from "./components/footer";
import GeneratePage from "./components/generate_page";
import './App.css';
import { app } from "./firebase";
import Home from "./components/home";
import Catalog from "./components/catalog";

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
        <SignupPage/>
        {/* <SigninPage/> */}
      </div>
    )
  }

  return (
    <>
    <Router>
    <div className="container">
    <Routes>
    <Route path="/" element={
      <>
      <h1>Hi {user.email}</h1>
      <Navbar/>
      <Home/>
      </>
    } />
    <Route path="/generate" element={
      <>
      <Navbar/>
      <GeneratePage/>
      </>
    } />
    <Route path="/catalogue" element={
      <>
      <Navbar/>
      <Catalog/>
      </>
    } />
    </Routes>
    </div>
    </Router>
    <Footer />
    </> 
  );
}

export default App;
