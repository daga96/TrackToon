import React, {useContext, useState, useEffect} from 'react'
import {auth,db} from "../firebaseConfig";


const AuthContext =  React.createContext()

export function useAuth() {
    
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const[currentUser, setCurrentUser] = useState()  
    const[loading, setLoading] = useState(true) 

    function signup(email,password,ID){
        return auth.createUserWithEmailAndPassword(email,password)
        .then((newUser) => {

            db.ref('users/'+newUser.user.uid).set({
                ID: ID, 
            })

        })
    }
        




    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }


    function logout(){
        return auth.signOut()
    }

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(currentUser=> {
            setCurrentUser(currentUser)
            setLoading(false)
         })

         return unsubscribe
    }, [])
    
    const value ={
        currentUser, 
        login,
        signup,
        logout
    }

return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
)
}