import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderContext"
import { useUsers } from "../context/UserContext";
import { useState } from "react";


function CreateOrder() {

    const navigate = useNavigate();
    const {cart,sendNewOrder,orderLoading, totalPrice} = useOrders()
    const {user} = useUsers();
    const [orderForm,setOrderForm] = useState(user ? {...user} : {});
    const [errors,setErrors] = useState({});

    if(!user) navigate('/login');


    const handleChange = (e)=>{
        setOrderForm(prev => ({...prev,[e.target.name]:e.target.value}))
    }


    const validateForm = ()=>{
        const newErrors = {};
        let valid = true;

        // validate name
        if(!orderForm.name || orderForm.name.trim() === '' || orderForm.name.length < 2){
            newErrors.name = 'Please inset Your Name (must be at least 2 chars)';
            valid = false;
        }

        // validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!orderForm.email || orderForm.email.trim() === '' || !emailRegex.test(orderForm.email)) {
            newErrors.email = 'Please enter a valid email address'
            valid = false;
        }

        //validate phone
        const phoneRegex = /^(\+972|972|0)?(5[0-9]|[2-4]|[8-9])[0-9]{7}$/
        const cleanPhone = orderForm.phone.replace(/\D/g, '');
        if (!cleanPhone || cleanPhone === '' || !phoneRegex.test(cleanPhone)){
            newErrors.phone = 'Please enter a valid phone number';
            valid = false;
        }

          // validate name
        if(!orderForm.address || orderForm.address.trim() === ''){
            newErrors.address = 'Please inset Your Address';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
           
        
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) return;

        const result = await sendNewOrder(orderForm);
        if(result.success){
            navigate('/');
        }else{
            alert(result.message)
        }
        
    }


    return (
        <div className="new-order">
            <h1 className="new-order__title">Create New order</h1>
            
            <section className="new-order__order-details">
                <div className="cart-wrapper">
                    {cart && cart.map(item => (
                        <div className="cart-item" key={item.id}>
                            <img className="cart-item-image" src={item.image} alt={item.title} />
                            <div className="cart-item-description">
                                <p className="description-title">{item.title}</p>
                                <p>${item.price} x {item.qty} = <span> ${(item.price * item.qty).toFixed(2)}</span></p>
                            </div>
                        </div>
                    ))}
                 </div>

                <div className="total-price">
                    <p>Total Price: <span>${totalPrice.toFixed(2)}</span></p>
                </div>
            </section>

            <section className="new-order__form">
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <input className={errors.name ? "error-input" : ""} type="text" name="name" placeholder="name"  value={orderForm.name}  onChange={handleChange}/>
                        <span className="input-error">{errors.name}</span>
                    </div>
                    
                    <div className="form-group">
                        <input className={errors.email ? "error-input" : ""}  type="text" name="email" placeholder="email"  value={orderForm.email}  onChange={handleChange}/>
                        <span className="input-error">{errors.email}</span>
                    </div>

                    <div className="form-group">
                        <input className={errors.phone ? "error-input" : ""} type="text" name="phone" placeholder="phone" value={orderForm.phone} onChange={handleChange}/>
                        <span className="input-error">{errors.phone}</span>
                    </div>

                    <div className="form-group">
                        <input className={errors.address ? "error-input" : ""} type="text" name="address" placeholder="Address" value={orderForm.address} onChange={handleChange}/>
                        <span className="input-error">{errors.address}</span>
                    </div>

                    <div className="actions">
                        <button className="btn submit-btn">Order</button>
                    </div>

                </form>
            </section>
        </div>
    )
}

export default CreateOrder
