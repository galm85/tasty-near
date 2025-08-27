import { useState } from "react";
import { useOrders } from "../context/OrderContext"
import { useUsers } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

function OrderList() {

    const {cart,clearCart,updateCart,removeItem,createOrder,orderLoading, totalPrice} = useOrders()
    const {user} = useUsers();
    const [cartDisplay,setCartDisplay] = useState(true)
    
    return (
        
        <aside className={cartDisplay ?  'cart-list show-cart' : 'cart-list'}>
            <button className="hide-cart toggle-cart" onClick={()=>setCartDisplay(!cartDisplay)}>{cartDisplay ? <FaArrowLeft /> :<BsCart3 />}</button>
            
           {orderLoading && <div className="order-loading">Loading</div>}

            {cartDisplay && <>
                <h3 className="cart-list__title">{user.name}'s Cart</h3>
            
                <div className="cart-list__items">
                    {cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img className="item-image" src={item.image} alt={item.title}/>
                            <p className="item-title">{item.title}</p>
                            <div className="item-qty">
                                <button onClick={()=>updateCart(item,'add')}>+</button>
                                <span>{item.qty}</span>
                                <button onClick={()=>updateCart(item,'less')}>-</button>
                            </div>
                            <button className="item-remove" onClick={()=>removeItem(item.id)}>remove</button>
                        </div>
                    ))}
                </div>

                <div className="cart-list__total-price">
                    <p>Total Price: <span> ${totalPrice.toFixed(2)}</span></p>
                </div>

                <div className="cart-list__actions">
                    {cart.length > 0 && <button onClick={()=>createOrder(user.user_id)}>Order Now</button>}
                    {cart.length > 0 && <button onClick={()=>clearCart()}>Clear Cart</button>}
                </div>
            </>}
         
         </aside>
        
         
    )
}

export default OrderList
