import { useUsers } from "../context/UserContext"
import { useOrders } from "../context/OrderContext"
import { useEffect } from "react";
import { format, parseISO } from 'date-fns'
import Loader from '../ui/Loader';

function Profile() {

    const {user} = useUsers();
    const {ordersHistory,getHistoryOrders,orderLoading} = useOrders()


    useEffect(()=>{
        getHistoryOrders(user.id);
    },[])

    return (
        <div className="profile-page">
            {orderLoading && <Loader overlay={true}/> }
           <div className="user-data">
                <p><b>Name:</b> {user.first_name} {user.last_name} </p>
                <p><b>Email:</b> {user.email} </p>
                <p><b>Phone:</b> {user.phone} </p>

           </div>

           <div className="order-history">
                {ordersHistory.map(order => (
                    <div key={order.id} className="order">
                        <div className="order-data">
                            {/* <p>Date: {format(parseISO(order.created_at), 'PPpp')}</p> */}
                            <p>Order ID: {order.id}</p>
                            <p>Client Name: {order.name}</p>
                            <p>phone: {order.phone}</p>
                        </div>

                        <div className="order-items">
                            {order.cart && JSON.parse(order.cart).map(item=>(
                                <div className="order-item" key={item.id}>
                                    <img src={item.image} alt={item.title} />
                                    <p className="item-title">{item.title}</p>
                                    <p className="item-price">${item.price} x {item.qty}   =  <b>${(item.qty * item.price).toFixed(2)}</b></p>
                                </div>
                            ))}
                        </div>

                        <div className="order-sum">
                            <p>Total: <b>${Number(order.totalPrice).toFixed(2)}</b></p>
                        </div>
                    </div>
                ))}
           </div>
        </div>
    )
}

export default Profile
