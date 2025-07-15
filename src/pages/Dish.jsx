import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useUsers } from "../context/UserContext";
import { useOrders } from "../context/OrderContext";

function Dish() {

    const {user} = useUsers();
    const {updateCart} = useOrders();

    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const dish = location.state?.dish;


    const handleAddToCart = (dish)=>{
        updateCart(dish,'add');
    }


    if(!dish){
        return (<div>No Dish Found</div>)
    }

    return (
        <div className="dish-page">
            <h1 className="dish-page__title">{dish.title}</h1>
            <div className="dish-page__content">
                <img className="dish-page__image" src={dish.image} alt={dish.title} />
                <p className="dish-page__description">{dish.description}</p>
            </div>
            <div className="dish-page__price">${dish.price}</div>
            <div className="dish-page__actions">
                <button className="btn order-btn" onClick={()=>handleAddToCart(dish)}>Order</button>
                <button className="btn return-btn" onClick={()=>navigate(-1)}>Return</button>
            </div>
        </div>
    )
}

export default Dish
