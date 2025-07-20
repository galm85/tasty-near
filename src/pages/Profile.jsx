import { useUsers } from "../context/UserContext"
import { useOrders } from "../context/OrderContext"
import { useEffect } from "react";
import { format, parseISO } from 'date-fns'

function Profile() {

    const {user} = useUsers();
    const {ordersHistory,getHistoryOrders,orderLoading} = useOrders()


    useEffect(()=>{
        getHistoryOrders(user.user.id);
    },[])

    return (
        <div className="profile-page">
            {orderLoading && <div>Loading...</div>}
           <div className="user-data">
                {user.user.email}
           </div>

           <div className="order-history">
                {ordersHistory.map(order => (
                    <div key={order.id} className="order">
                        <div className="order-data">
                            <p>Date: {format(parseISO(order.created_at), 'PPpp')}</p>
                            <p>Order ID: {order.id}</p>
                        </div>

                        <div className="order-items">
                            {order.content.map(item=>(
                                <div className="order-item">
                                    <img src={item.image} alt={item.title} />
                                    <p className="item-title">{item.title}</p>
                                    <p className="item-price">${item.price} x {item.qty}   =  <b>${(item.qty * item.price).toFixed(2)}</b></p>
                                </div>
                            ))}
                        </div>

                        <div className="order-sum">
                            <p>Total: <b>39.99$</b></p>
                        </div>
                    </div>
                ))}
           </div>
        </div>
    )
}

export default Profile
