import {useEffect, useState} from 'react';
import {useUsers} from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {

    const {user,loginUser,userLoading,userError} = useUsers()
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState({email:'',password:''})



    const handleSubmit = (e)=>{
        e.preventDefault();
        
        let tempErrors = {email:'',password:''};
        let valid = true;

        if(!email){
            valid = false;
            tempErrors.username = 'Please Provide username';
        }

        if(!password){
            valid = false;
            tempErrors.password = 'Please Insert your password'
        }
        if(!valid){
            setErrors(tempErrors);
            return;
        };

        loginUser(email,password)

    }


    useEffect(()=>{
        if(user){
            console.log('user')
            navigate('/')
        }
    },[user,navigate])

    return (
        <div className="login-page">
            <h1 className="login-page__title">Login</h1>

            <form className="login-page__form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="input" id="username" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <span className="input-error">{errors.email}</span>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="input" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <span className="input-error">{errors.password}</span>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn submit-btn">Connect</button>
                </div>
            </form>

        </div>
    )
}

export default Login
