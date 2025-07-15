import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import OrderList from "./OrderList"

function AppLayout() {
    return (
        <div className="tasty-near-layout">
            <Header/>
            <main className="main">
                <OrderList/>
                <div className="main-content">
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default AppLayout
