import { useRestaurant } from "../context/RestaurantContext"

function RestaurantsGrid({restaurants}) {
    
        const {getRestaurantDishes,getAllDishes}  = useRestaurant()
    

    return (
        <div className="restaurants-grid">
            <div className="restaurant">
                <button className="restaurant-btn" onClick={()=>getAllDishes()}>All</button>
            </div>
            {restaurants.map(restaurant => (
                <div key={restaurant.id} className="restaurant">
                    <button className="restaurant-btn" id={restaurant.id} onClick={()=>getRestaurantDishes(restaurant.id)}>{restaurant.title}</button>
                </div>
            ))}
        </div>
    )
}

export default RestaurantsGrid
