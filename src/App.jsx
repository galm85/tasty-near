import { BrowserRouter,Route,Routes } from "react-router-dom"
import './styles/main.scss';

import Dashboard from './pages/Dashboard';
import Restaurant from './pages/Restaurant';
import Dish from './pages/Dish';
import Login from './pages/Login';
import About from './pages/About';
import AppLayout from "./ui/AppLayout";


function App() {
 

  return (
    <BrowserRouter>
   
      <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="restaurant/:id" element={<Restaurant/>}/>
            <Route path="dish/:id" element={<Dish/>}/>
          </Route>
          <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
