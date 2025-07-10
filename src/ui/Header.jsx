import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

function Header() {
    return (
        <div className='header'>
            <div className='header__brand'>
                <Link to='/'>
                    <img src={Logo} alt="tasty near logo" />
                </Link>
            </div>
            <div className='header__navigation'>
                <NavLink to='/about' className={(isActive) => isActive ? 'active-link' : ''} >About</NavLink>
                <NavLink to='/walla' className={(isActive) => isActive ? 'active-link' : ''} >Profile</NavLink>
            </div>
        </div>
    )
}

export default Header
