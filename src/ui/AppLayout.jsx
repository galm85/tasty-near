import { Outlet } from "react-router-dom"
import Header from "./Header"

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
            <footer>teasty</footer>
        </div>
    )
}

export default AppLayout
