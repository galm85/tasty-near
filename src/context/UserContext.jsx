import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../firebase/config';
import { signInUser,signUpUser,signOutUser,getUserData } from '../services/authService';


const SESSION_ITEM = 'teast-near';
const UsersContext = createContext();


export const useUsers = ()=>{
    const context = useContext(UsersContext);
    if(!context){
        throw new Error('useUsers must be used within a Users Provider')
    }
    return context
}


export const UsersProvider = ({children}) =>{
    const [user,setUser] = useState(sessionStorage.getItem(SESSION_ITEM) ? JSON.parse(sessionStorage.getItem(SESSION_ITEM)) : null);
    const [userLoading,setUserLoading] = useState(false); 
    const [userError,setUserError] = useState(null); 

    // Listen to Firebase auth state changes
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser)=>{
            setUserLoading(true);
            try{
                if(firebaseUser){
                    // User is signed in, get their profile data from Firestore
                    const profile = await getUserData(firebaseUser.uid);
                    const userData = {
                        id:firebaseUser.uid,
                        email:firebaseUser.email,
                        ...profile
                    }

                    setUser(userData);
                    sessionStorage.setItem(SESSION_ITEM, JSON.stringify(userData));
                }else{
                    setUser(null);
                    sessionStorage.removeItem(SESSION_ITEM);
                }
            }catch(error){
                console.error('user Error: ',error);
                setUserError(error.message);
            }finally{
                setUserLoading(false)
            }
        });

        return unsubscribe;
    },[])
  
    const loginUser = async (email,password)=>{
        try{
            setUserLoading(true);
            setUserError(null);
            await signInUser(email,password);

        }catch(err){
            console.log('login: ', err.message);
            setUserError(err.message)
        }finally{
            setUserLoading(false)
        }
    }

 

    const signupUser = async (email,password,userData)=>{
        try{
            setUserLoading(true);
            setUserError(null);
            // Firebase will handle the auth state change automatically
            await signUpUser(email, password, userData);
        }catch(error){
            console.log('Signup Error: ',error.message);
            setUserError(error.message);
        }finally{
            setUserLoading(false);
        }
    }


    const logout = async ()=>{
      try {
        await signOutUser();
      } catch (error) {
        console.error('Error signing out:', error);
      }
    }


    const value = {user,userLoading,userError,loginUser,signupUser,logout}

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

