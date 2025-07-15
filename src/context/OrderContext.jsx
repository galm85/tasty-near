import {createContext,useContext,useState} from 'react';
import supabase from '../services/supabase';

const OrdersContext = createContext();

export const useOrders = ()=>{
    const context = useContext(OrdersContext);

    if(!context) throw new Error('useOrder is out of Orders Provider');
    return context;
}

export const OrdersProvider = ({children})=>{
    const [cart,setCart] = useState([]);
    const [orderLoading,setOrderLoading] = useState(false);
    const [orderError,setOrderError] = useState(null);
    const [ordersHistory,setOrdersHistory] = useState([]);




    const clearCart = ()=>{
        setCart([]);
        console.log(cart);

    }
    
    const updateCart = (item,op)=>{

        let existItem = cart.find(i => i.id === item.id);

        if(existItem){

            const tempCart = cart.map(i => {
                if(i.id === existItem.id){

                    if(op === "add"){
                        i.qty += 1;
                    }else if(existItem.qty > 1){
                        i.qty -= 1;
                    }
                }
                
                return i;
            })

            setCart(tempCart);
            
        }else{
            const newItem = {...item,qty:1}
            setCart(prev => [...prev,newItem]);
        }

    }

    const removeItem = (itemId) =>{
        const filteredOrder = cart.filter(i => i.id !== itemId)
        setCart(filteredOrder);

    }

    const createOrder = async (user_id)=>{
    
        if(!user_id || !cart.length) return;

        setOrderLoading(true);
        
        const order = {content:cart,user_id:user_id}

        try{
            const {data,error} = await supabase.from('teast_near_orders')
            .insert(order)
            .select();
            if(error) throw error;
            clearCart();

        }catch(err){
            console.log(err.message);
        }finally{
            setOrderLoading(false);
        }
    }

    const getHistoryOrders = async (user_id)=>{
        if(!user_id) return;

        setOrderLoading(true);
        try {
            const {data,error} = await supabase.from('teast_near_orders')
            .select('*')
            .eq('user_id',user_id);
            if(error) throw error;
            setOrdersHistory(data);

        } catch (err) {
            console.log(err.message)
        }finally{
            setOrderLoading(false);
        }
    }

    const value = {
        cart,
        orderLoading,
        orderError,
        ordersHistory,
        clearCart,
        updateCart,
        removeItem,
        createOrder,
        getHistoryOrders
    }

    return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>

}