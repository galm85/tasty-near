import { useEffect } from "react";
import { useRestaurant } from "../context/RestaurantContext"
import RestaurantsGrid from '../ui/RestaurantsGrid'
import DishesGrid from "../ui/DishesGrid";

const dishesDummy = [
    {
        "id": 5548758785,
        "created_at": "2025-07-13T08:59:11.859819+00:00",
        "title": "Family Pizza",
        "description": "family size pizza with extra cheese",
        "image": "https://jliutdfgvgbtecmowdsf.supabase.co/storage/v1/object/public/tasty-near//pizza.jpg",
        "rating": 4,
        "restaurant_id": 8895455875
    },
    {
        "id": 77845587855,
        "created_at": "2025-07-13T09:00:08.794793+00:00",
        "title": "Home Burger",
        "description": "Burger with meat ketchop and salat with fries",
        "image": "https://jliutdfgvgbtecmowdsf.supabase.co/storage/v1/object/public/tasty-near//hamburger.jpeg",
        "rating": 3,
        "restaurant_id": 55587485598
    }
]

const restaurantsDummy = [
    {
        "id": 55587485598,
        "created_at": "2025-07-13T07:31:57.537824+00:00",
        "title": "Meat Burger",
        "image": null,
        "address": "Tel Aviv"
    },
    {
        "id": 8895455875,
        "created_at": "2025-07-13T07:32:18.039009+00:00",
        "title": "Pizza Place",
        "image": null,
        "address": "Holon"
    },
    {
        "id": 11458785,
        "created_at": "2025-07-13T07:32:48.390116+00:00",
        "title": "Falafel Triangle",
        "image": null,
        "address": "Ramat Gan"
    }
]


function Dashboard() {

    const {restaurants,loading,error,dishes,getAllRestaurants,getAllDishes,getRestaurantDishes}  = useRestaurant()
   
    useEffect(()=>{
        if(!restaurants){
            // getAllRestaurants();
        }
        if(!dishes){
            // getAllDishes();
        }

    },[])
   
   
    return ( 
        <div className="dashboard">
            <h1>Dashboard</h1>
            {loading ? <p>Loading...</p> : 
                <div className="dashboard__content">
                <RestaurantsGrid restaurants={restaurantsDummy}/>
                <DishesGrid dishes={dishesDummy}/>
            </div>
            }
            
        </div>
    )
}

export default Dashboard
