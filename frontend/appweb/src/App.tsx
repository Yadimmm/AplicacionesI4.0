import { useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import UserForm from './modules/user/UserForm'
import ProductoData from './modules/products/ProductoData'
import OrderData from './modules/orders/OrderData'

function App() {

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/orders">Ordenes</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<UserForm />} />
        <Route path="/products" element={<ProductoData />} /> 
        <Route path="/orders" element={< OrderData />} />
      </Routes>
    </Router>
  )
}

export default App
