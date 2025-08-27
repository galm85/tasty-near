import { useEffect } from "react";
import { useRestaurant } from "../context/RestaurantContext"
import RestaurantsGrid from '../ui/RestaurantsGrid'
import DishesGrid from "../ui/DishesGrid";

function Dashboard() {

    const {restaurants,loading,error,dishes,getAllRestaurants,getAllDishes,getRestaurantDishes}  = useRestaurant()
   
    useEffect(()=>{      
        // getAllRestaurants();
        // getAllDishes();
    },[])
   
   
    return ( 
        <div className="dashboard">
            <h1>Dashboard</h1>
            {loading ? <p>Loading...</p> : 
                <div className="dashboard__content">
                    <RestaurantsGrid restaurants={restaurants}/>
                    <DishesGrid dishes={dishes}/>
                </div>
            }
            
        </div>
    )
}

export default Dashboard
