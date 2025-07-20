import { useUsers } from "../context/UserContext"
import { useOrders } from "../context/OrderContext"
import { useEffect } from "react";

function Profile() {

    const {user} = useUsers();
    const {ordersHistory,getHistoryOrders,orderLoading} = useOrders()


    useEffect(()=>{
        getHistoryOrders(user.user.id);
        // console.log(user.user);
        console.log('order',ordersHistory);
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
                        <p>Date: {order.created_at}</p>
                        <div className="order-items">
                            {order.content.map(item=>(
                                <div className="order-item">
                                    <p>{item.title}</p>
                                    <p>{item.qty}</p>
                                    <p>{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
           </div>
        </div>
    )
}

export default Profile
