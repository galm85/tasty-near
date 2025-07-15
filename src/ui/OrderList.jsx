import { useEffect, useState } from "react";
import { useOrders } from "../context/OrderContext"
import { useUsers } from "../context/UserContext";

function OrderList() {

    const {cart,clearCart,updateCart,removeItem,createOrder,orderLoading} = useOrders()
    const {user} = useUsers();
    
    return (
        
         <aside className={  'cart-list show-cart'}>
            
            {orderLoading && <div className="order-loading">Loading</div>}
            
            <h3 className="cart-list__title">{user.user.email}</h3>
         
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

            {cart.length > 0 && <button onClick={()=>createOrder(user.user.id)}>Order Now</button>}
            {cart.length > 0 && <button onClick={()=>clearCart()}>Clear Cart</button>}
            
         
         </aside>
         
    )
}

export default OrderList
