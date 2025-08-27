import Logo from '../assets/images/logo.png';

function Footer() {
    return (
        <footer className="footer">
           <div className="logo-wrapper">
            <img src={Logo} alt="teasty near logo" />
           </div>
           <p className='copyrights'> Tasty Near &copy; {new Date().getFullYear()}  |  <a href="https:www.galwd.com" target='blank'> GWD</a> </p>
        </footer>
    )
}

export default Footer
