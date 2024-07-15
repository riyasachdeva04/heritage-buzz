import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBcQpXDW4EwCTbAQOHNiwGSMdoPZylhevo",
    authDomain: "heritage-buzz-46ca5.firebaseapp.com",
    projectId: "heritage-buzz-46ca5",
    storageBucket: "heritage-buzz-46ca5.appspot.com",
    messagingSenderId: "1031760683518",
    appId: "1:1031760683518:web:c162a37f296798b4c720af",
    measurementId: "G-1PNWGGGL9Y",
    databaseURL: "https://heritage-buzz-46ca5-default-rtdb.firebaseio.com/",
  };

export const app = initializeApp(firebaseConfig);