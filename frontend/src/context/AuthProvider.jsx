import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import Cookies from "js-cookie";
export const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("Info");
    //parse the user data and storing in state
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined)
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);