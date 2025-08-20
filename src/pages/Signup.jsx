import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../services/authService';
import { useUsers } from '../context/UserContext';

function Signup() {

    const {user, loading} = useUsers();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [errors, setErrors] = useState({name:'', email:'', password:''});
    const [signupLoading, setSignupLoading] = useState(false);
    const [signupError, setSignupError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let tempErrors = {name:'', email:'', password:''};
        let valid = true;

        if(!formData.name){
            valid = false;
            tempErrors.name = 'Please provide your name';
        }

        if(!formData.email){
            valid = false;
            tempErrors.email = 'Please provide email';
        }

        if(!formData.password || formData.password.length < 6){
            valid = false;
            tempErrors.password = 'Password must be at least 6 characters';
        }
        
        if(!valid){
            setErrors(tempErrors);
            return;
        }

        // Firebase signup logic
        setSignupLoading(true);
        setSignupError('');
        
        try {
            await signUpUser(formData.email, formData.password, {
                name: formData.name,
                phone: formData.phone
            });
            // User will be automatically logged in and redirected
        } catch (error) {
            setSignupError(error.message);
        } finally {
            setSignupLoading(false);
        }
    }

    useEffect(() => {
        if(user){
            navigate('/');
        }
    }, [user, navigate])

    return (
        <div className="login-page"> {/* Reuse same CSS classes */}
            <h1 className="login-page__title">Sign Up</h1>

            <form className="login-page__form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        disabled={signupLoading || loading}
                    />
                    <span className="input-error">{errors.name}</span>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        disabled={signupLoading || loading}
                    />
                    <span className="input-error">{errors.email}</span>
                </div>

                <div className="input-group">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        id="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        disabled={signupLoading || loading}
                    />
                </div>
                
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={formData.password} 
                        onChange={handleChange}
                        disabled={signupLoading || loading}
                    />
                    <span className="input-error">{errors.password}</span>
                </div>
                
                {/* Display signup error */}
                {signupError && (
                    <div className="login-error">
                        <span style={{color: 'red'}}>{signupError}</span>
                    </div>
                )}
                
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="btn submit-btn"
                        disabled={signupLoading || loading}
                    >
                        {signupLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </div>
            </form>

            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <p>Already have an account? 
                    <button 
                        type="button" 
                        onClick={() => navigate('/login')} 
                        style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}}
                    >
                        Login here
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Signup