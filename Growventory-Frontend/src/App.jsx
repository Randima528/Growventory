import "./App.css";
import {Routes,Route, Navigate} from "react-router-dom"
import Home from "./pages/Home"
import AddProduct from "./pages/AddProduct"
import Products from "./pages/Products"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";


const App = () => {
  return (
    
      
      <Routes>
        <Route path="/products" element={<Products />} />
         <Route path="/add-product" element={<AddProduct />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/" element={<Home />} />

<Route path="/" element={<Navigate to="/products" />} />


         
      </Routes>
    
  )
}

    
export default App
