
// import { persistor } from './store/index'
import { createBrowserRouter, redirect, RouterProvider, useNavigate } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error.jsx'
import Register from './pages/Register.jsx'
import Users from './pages/Users';
import Transactions from './pages/Transactions';
import CreateTransaction from './pages/CreateTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from './features/userSlice.js';
import { useEffect } from 'react';
import User from './pages/User.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/users',
    element: <Users />
  },
  {
    path: '/users/:userId',
    element: <User />
  },
  {
    path: '/transactions',
    element: <Transactions />
  },
  {
    path: '/createTransaction',
    element: <CreateTransaction />
  },

])

const App = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()


  return (
    <RouterProvider router={router} />
  )
}

export default App