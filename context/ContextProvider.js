import React, { createContext, useState } from 'react'


const Context = createContext();


const ContextProvider = ({children}) => {
    
    const [bandera, setBandera] = useState(false) 

    const handleBandera = () => {
        setBandera(!bandera)
    }
    
    const data = {
        handleBandera,
        bandera,
        setBandera
    }


    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export { ContextProvider, Context };