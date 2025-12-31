import { useEffect, useState } from "react";
import { useRestaurant } from "../context/RestaurantContext"
import RestaurantsGrid from '../ui/RestaurantsGrid'
import DishesGrid from "../ui/DishesGrid";
import Loader from '../ui/Loader';

function Dashboard() {

    const {restaurants,loading,error,dishes,getAllRestaurants,getAllDishes,getRestaurantDishes}  = useRestaurant()

    useEffect(()=>{      
        getAllRestaurants();
        getAllDishes();
    },[])
   
   
    return ( 
        <div className="dashboard">
            <h1 className="dashboard__title">What are you looking for today?</h1>
            {loading ? <Loader overlay={true}/> : 
                <div className="dashboard__content">
                    <RestaurantsGrid restaurants={restaurants}/>
                    <DishesGrid dishes={dishes}/>
                </div>
            }
            
        </div>
    )
}

export default Dashboard
