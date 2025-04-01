import { Outlet } from "react-router-dom"

function AppLayout() {
    return (
        <div className="tasty-near-layout">
            <header>tasty-near</header>
            <aside>menu</aside>
            <main>
                <Outlet/>
            </main>
            <footer></footer>
        </div>
    )
}

export default AppLayout
