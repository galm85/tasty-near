import { Link } from "react-router-dom"
import Logo from '../assets/images/logo.png';

function DishesGrid({dishes}) {
    return (
        <div className="dishes-grid">
            {dishes.map(dish => (
                <Link key={dish.id} to={`/dish/${dish.id}`} className="dish" state={{dish}}>

                    <img className="dish-image" src={dish.image ? dish.image :Logo} alt={dish.title} />
                    <p className="dish-title">{dish.title}<span>{dish.price}</span></p>
                    </Link>
            ))}
        </div>
    )
}

export default DishesGrid
