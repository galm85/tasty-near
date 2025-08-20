import {createContext,useContext,useState} from 'react';
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

            const {data:authData,error} = await supabase.auth.signInWithPassword({
                email:email,
                password:password
            })
            if(error) throw error;

            if(authData.user){
                const {data:profile} = await supabase.from('teast_near_profiles')
                    .select('*')
                    .eq('user_id',authData.user.id)
                    .single();
                    console.log('profile ',profile)
                    setUser(profile);
                    sessionStorage.setItem(SESSION_ITEM,JSON.stringify(profile));
            }else{
                setUser(null);
                sessionStorage.removeItem(SESSION_ITEM);
            }

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

