import { Link } from "react-router-dom"

function DishesGrid({dishes}) {
    return (
        <div className="dishes-grid">
            {dishes.map(dish => (
                <Link key={dish.id} to={`/dish/${dish.id}`} className="dish" state={{dish}}>
                    <img className="dish-image" src={dish.image} alt={dish.title} />
                    <p className="dish-title">{dish.title}</p>
                    </Link>
            ))}
        </div>
    )
}

export default DishesGrid
