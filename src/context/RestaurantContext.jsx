import React,{createContext,useContext,useState} from 'react';
import supabase from '../services/supabase';

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
        console.log('www')
        try {
            setLoading(true);
            setError(null);

            const {data,error} = await supabase.from('tasty_near_restaurants').select('*');
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

            const {data,error} = await supabase.from('tasty_near_dishes').select('*');
          
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

            const {data,error} = await supabase.from('tasty_near_dishes').select('*').eq('restaurant_id',restaurantId);
            if(error) throw error;
            console.log(data);
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

