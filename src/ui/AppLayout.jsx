import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

function AppLayout() {
    return (
        <div className="tasty-near-layout">
            <Header/>
            <main className="main">
                <aside className="current-order">My Orders</aside>
                <div className="main-content">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default AppLayout
