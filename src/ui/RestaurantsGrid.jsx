import { useRestaurant } from "../context/RestaurantContext"

function RestaurantsGrid({restaurants}) {
    
        const {getRestaurantDishes,getAllDishes}  = useRestaurant()
    

    return (
        <div className="restaurants-grid">
            <button className="restaurant-btn" onClick={()=>getAllDishes()}>All</button>
            {restaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant">
                    <button className="restaurant-btn" id={restaurant.id} onClick={()=>getRestaurantDishes(restaurant.id)}>{restaurant.title}</button>
                </div>
            ))}
        </div>
    )
}

export default RestaurantsGrid
