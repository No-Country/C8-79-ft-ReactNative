import { getAuth } from 'firebase/auth/react-native';
import React, { createContext, useState } from 'react'


const Context = createContext();



const ContextProvider = ({children}) => {
    
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = auth.currentUser.uid;
    const [bandera, setBandera] = useState(false) 

    const handleBandera = () => {
        setBandera(!bandera)
    }
    
    const data = {
        handleBandera,
        bandera,
        setBandera,
        uid,
        user
    }


    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export { ContextProvider, Context };