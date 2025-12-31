import {useEffect, useState} from 'react';
import {useUsers} from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import { signInUser } from '../services/authService';
import Loader from '../ui/Loader';

function Login() {

    const {user,loading} = useUsers();
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState({email:'',password:''})
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        let tempErrors = {email:'',password:''};
        let valid = true;

        if(!email){
            valid = false;
            tempErrors.email = 'Please Provide Email';
        }

        if(!password){
            valid = false;
            tempErrors.password = 'Please Insert your password'
        }
        if(!valid){
            setErrors(tempErrors);
            return;
        };

        setLoginLoading(true);
        setLoginError('');

        try{
            await signInUser(email,password);
        }catch(error){
            setLoginError(error.message);
        }finally{
            setLoginLoading(false);
        }
    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user,navigate])

    return (
        <div className="login-page">

            {loading && <Loader overlay={true}/>}
            <h1 className="login-page__title">Login</h1>

            <form className="login-page__form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={loginLoading || loading}/>
                    <span className="input-error">{errors.email}</span>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="input" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} disabled={loginLoading || loading}/>
                    <span className="input-error">{errors.password}</span>
                </div>

                {loginError && (
                    <div className='login-error'>
                        <span>{loginError}</span>
                    </div>
                )}
                <div className="form-actions">
                    <button type="submit" className="btn submit-btn" disabled={loginLoading || loading}>{loginLoading ? 'Connecting...' : 'Connect'}</button>
                </div>
            </form>

            <div className="signup-link">
                <p>Don't have an account? 
                    <button 
                        type="button" 
                        onClick={() => navigate('/signup')}
                    >
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login