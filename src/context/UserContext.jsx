import React,{createContext,useContext,useState,useEffect, Children, use} from 'react';
import supabase from '../services/supabase';


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

  
    const loginUser = async (email,password)=>{
        try{
            setUserLoading(true);
            setUserError(null);

            const {data,error} = await supabase.auth.signInWithPassword({
                email:email,
                password:password
            })

            if(error) throw error;

            console.log(data);
            setUser(data);
            sessionStorage.setItem(SESSION_ITEM,JSON.stringify(data));

        }catch(err){
            console.log(err.message)
            setUserError(err.message)
        }finally{
            setUserLoading(false)
        }
    }

    const logout = ()=>{
        sessionStorage.removeItem(SESSION_ITEM);
        setUser(null);
    }


    const value = {user,userLoading,userError,loginUser,logout}

    return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

