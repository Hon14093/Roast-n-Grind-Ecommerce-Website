import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AboutUsPage from './pages/AboutUsPage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "Login",
    element: <LoginPage />
  },
  {
    path: "Signup",
    element: <SignupPage />
  },
  {
    path: "AboutUs",
    element: <AboutUsPage />
  },
  {
    path: "Shop",
    element: <ShopPage />
  },
  {
    path: "Admin",
    element: <AdminPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
