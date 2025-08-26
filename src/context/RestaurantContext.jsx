import {createContext,useContext,useState} from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

// create the context
const RestaurantContext = createContext();


// hook - call this funtion in other components
export const useRestaurant = ()=>{
    const context = useContext(RestaurantContext);
    if(!context){
        throw new Error('useRestaurant must be used within a Restaurant Provider');
    }
    return context;
}


//provider
export const RestaurantProvider = ({children}) => {
    const [restaurants,setRestaurants] = useState([]);
    const [dishes,setDishes] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);


    const getAllRestaurants = async ()=>{
        try {
            setLoading(true);
            setError(null);

          // get all restaurant from firebase
          const restaurantsRef = collection(db,'restaurants');
          const querySnapshot = await getDocs(restaurantsRef);
          const data = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));
            if(error) throw error;
            setRestaurants(data || []);
        } catch (err) {
            setError(err.message);
        }finally{
            setLoading(false)
        }
    }

    const getAllDishes = async ()=>{
        try {
            setLoading(true);
            setError(null);

            const dishesRef = collection(db,'dishes');
            const querySnapshot = await getDocs(dishesRef);
            const data = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));

            if(error) throw error;
            setDishes(data || []);

        } catch (err) {
            setError(err.message);
        }finally{
            setLoading(false)
        }
    }


    const getRestaurantDishes = async (restaurantId)=>{
        try {
            setLoading(true);
            setError(null);

            const dishesRef = collection(db,'dishes');
            const q = query(dishesRef, where('restaurant_id','==',restaurantId));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({id:doc.id,...doc.data()}));

            if(error) throw error;
            setDishes(data || []);

        } catch (err) {
            setError(err.message);
        }finally{
            setLoading(false)
        }
    }



    const value = {restaurants,dishes,loading,error,getAllRestaurants,getAllDishes,getRestaurantDishes}

    return <RestaurantContext.Provider value={value}>
        {children}
    </RestaurantContext.Provider>
}

