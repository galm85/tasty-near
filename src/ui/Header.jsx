import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import { useUsers } from '../context/UserContext';

function Header() {


    const {logout} = useUsers();

    return (
        <div className='header'>
            <div className='header__brand'>
                <Link to='/'>
                    <img src={Logo} alt="tasty near logo" />
                </Link>
            </div>
            <div className='header__navigation'>
                <NavLink to='/about' className={(isActive) => isActive ? 'nav-link active-link' : 'nav-link'} >About</NavLink>
                <NavLink to='/profile' className={(isActive) => isActive ? 'nav-link active-link' : 'nav-link'} >Profile</NavLink>
            </div>
            <div className='header__user'>
                <button className='btn logout-btn' onClick={()=>logout()}>Logout</button>

            </div>
        </div>
    )
}

export default Header
