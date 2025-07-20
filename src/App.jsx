import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom"
import './styles/main.scss';

import Dashboard from './pages/Dashboard';
import Restaurant from './pages/Restaurant';
import Dish from './pages/Dish';
import Login from './pages/Login';
import About from './pages/About';
import AppLayout from "./ui/AppLayout";

import { RestaurantProvider } from "./context/RestaurantContext";
import { useUsers } from "./context/UserContext";
import { OrdersProvider } from "./context/OrderContext";
import Profile from "./pages/Profile";

function App() {

  const {user} = useUsers();



  return (
      <BrowserRouter>
        <Routes>
          {!user ? 
          <>
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<Navigate to='/login' replace/>}/>
          </>
            :
          <>
            <Route element={
                <RestaurantProvider>
                  <OrdersProvider>
                    <AppLayout/>
                  </OrdersProvider>
                </RestaurantProvider>
            }>
                <Route index element={<Dashboard/>}/>
                <Route path="about" element={<About/>}/>
                <Route path="profile" element={<Profile />}/>
                <Route path="restaurant/:id" element={<Restaurant/>}/>
                <Route path="dish/:id" element={<Dish/>}/>
              </Route>
            <Route path="/login" element={<Navigate to='/' replace/>}/>
          </>

        }
          
        </Routes>
      </BrowserRouter>
  )
}

export default App
