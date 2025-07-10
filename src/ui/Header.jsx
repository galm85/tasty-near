import Logo from '../assets/images/logo.png';

function Header() {
    return (
        <div className='header'>
            <div className='header__brand'>
                <img src={Logo} alt="tasty near logo" />
            </div>
            <div className='header__navigation'>
                navigation
            </div>
        </div>
    )
}

export default Header
