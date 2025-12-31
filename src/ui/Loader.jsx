import Lottie from 'react-lottie-player';
import loadingAnimation from '../assets//lottie/loading.json';


function Loader({size=100,message="Loading...",showMessage=true,overlay=false,className=""}) {

    const loaderContent = (
        <div className={`loader ${className}`}>
            <Lottie loop animationData={loadingAnimation} play style={{width:size,height:size}}/>
            {showMessage && <p className='loader-message'>{message}</p>}
        </div>
    )

    if(overlay){
        return (
            <div className="loader-overlay">{loaderContent}</div>
        )
    }

    return loaderContent
}

export default Loader
