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
import Avatar from "./components/avatar";

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
      <div className="App">
        <SignupPage/>
        {/* <SigninPage/> */}
      </div>
    )
  }

  return (
    <>
    <Navbar/>
    <Router>
    <div className="container" style={{ margin: 0, minWidth: '100%' }}>
    <Routes>
    <Route path="/" element={
      <>
      <Home/>
      </>
    } />
    <Route path="/generate" element={
      <>
      <GeneratePage/>
      </>
    } />
    <Route path="/catalogue" element={
      <>
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
