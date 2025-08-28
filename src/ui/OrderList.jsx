import { useState } from "react";
import { useOrders } from "../context/OrderContext"
import { useUsers } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoTrashBin } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function OrderList() {

    const navigate = useNavigate();
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
                                <button className="btn btn-add" onClick={()=>updateCart(item,'add')}><IoMdAdd /></button>
                                <span>{item.qty}</span>
                                <button className="btn btn-less" onClick={()=>updateCart(item,'less')}><FiMinus /></button>
                                <button className="btn item-remove" onClick={()=>removeItem(item.id)}><IoTrashBin /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-list__total-price">
                    <p>Total Price: <span> ${totalPrice.toFixed(2)}</span></p>
                </div>

                <div className="cart-list__actions">
                    {/* {cart.length > 0 && <button className="btn btn-order-now" onClick={()=>createOrder(user.user_id)}>Order Now</button>} */}
                    {cart.length > 0 && <button className="btn btn-order-now" onClick={()=>navigate('create-order')}>Order Now</button>}
                    {cart.length > 0 && <button className="btn btn-clear-order" onClick={()=>clearCart()}>Clear Cart</button>}
                </div>
            </>}
         
         </aside>
        
         
    )
}

export default OrderList
