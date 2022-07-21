import React, { useState, useEffect } from 'react';
import { auth } from "../services/firebase";


const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        })
    }, []);

    if (pending) {
        return <>Loading ...</>
    }
    return ( 
       <AuthContext.Provider value={{currentUser}} > {children} </AuthContext.Provider>
    )
}

export  {AuthProvider, AuthContext}