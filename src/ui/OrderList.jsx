import { useState } from "react";
import { useOrders } from "../context/OrderContext"
import { useUsers } from "../context/UserContext";

function OrderList() {

    const {cart,clearCart,updateCart,removeItem,createOrder,orderLoading, totalPrice} = useOrders()
    const {user} = useUsers();
    const [cartDisplay,setCartDisplay] = useState(true)
    
    return (
        <>
        
        <button className="hide-cart" onClick={()=>setCartDisplay(!cartDisplay)}>{cartDisplay ? "Hide":"Show"}</button>
       
         <aside className={cartDisplay ?  'cart-list show-cart' : 'cart-list'}>
            
         
           {orderLoading && <div className="order-loading">Loading</div>}

            <h3 className="cart-list__title">{user.email}</h3>
         
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
                Total Price: ${totalPrice.toFixed(2)}
            </div>

            <div className="cart-list__actions">
                {cart.length > 0 && <button onClick={()=>createOrder(user.user_id)}>Order Now</button>}
                {cart.length > 0 && <button onClick={()=>clearCart()}>Clear Cart</button>}
            </div>
            
         
         </aside>
          </>
         
    )
}

export default OrderList
