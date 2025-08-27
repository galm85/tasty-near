import { useLocation, useNavigate } from "react-router-dom"
import { useOrders } from "../context/OrderContext";

function Dish() {

    const {updateCart} = useOrders();
    const location = useLocation();
    const navigate = useNavigate();
    const dish = location.state?.dish;

    const handleAddToCart = (dish) => {
        updateCart(dish,'add');
    }

    if(!dish){
        return (<div>No Dish Found</div>)
    }

    return (
        <div className="dish-page">
           
            <nav className="dish-page__breadcrumb">
                <button onClick={() => navigate(-1)} className="breadcrumb-link">
                    ← Back to Menu
                </button>
            </nav>

            <div className="dish-page__header">
                <h1 className="dish-page__title">{dish.title}</h1>
            </div>

            <div className="dish-page__main">
                <div className="dish-page__media">
                    <img className="dish-page__image" src={dish.image} alt={dish.title} />
                </div>

                <div className="dish-page__info">
                    <div className="dish-page__details">
                        <p className="dish-page__description">{dish.description}</p>
                    </div>

                    <div className="dish-page__purchase">
                        <div className="dish-page__price">{dish.price}</div>
                        <button className="btn order-btn" onClick={() => handleAddToCart(dish)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dish
