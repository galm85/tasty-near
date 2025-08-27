import { Link } from "react-router-dom"
import Logo from '../assets/images/logo.png';

function DishesGrid({dishes}) {
    return (
        <div className="dishes-grid">
            {dishes.map(dish => (
                <Link key={dish.id} to={`/dish/${dish.id}`} className="dish" state={{dish}}>
                    <img className="dish-image" src={dish.image ? dish.image :Logo} alt={dish.title} />
                    <div className="dish-content">
                         <p className="dish-title">{dish.title}</p>
                        <p className="dish-price">${dish.price.toFixed(2)}</p>
                    </div>
                  
                </Link>
            ))}
        </div>
    )
}

export default DishesGrid
