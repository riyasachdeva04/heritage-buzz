import { createContext } from "react";

const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
    return (
        <FirebaseContext.Provider>
            {props.children}
        </FirebaseContext.Provider>
    )
};