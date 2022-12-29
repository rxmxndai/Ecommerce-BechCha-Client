import Homepage from "./Pages/Homepage"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import {createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import ProductsPage from "./Pages/ProductsPage"



// COLORS
// #F5F7F8
// #0171B6
// #FFFFFF


const App = () => {

  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/products/:id",
          element: <ProductsPage />,
        },
        // {
        //   path: "/product/:id",
        //   element: <Product />,
        // },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    }
    
  ])




  return (
    <RouterProvider router={router} />
  )
}

export default App
