import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './store/index'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Error from './pages/Error.jsx'
import Register from './pages/Register.jsx'
import Users from './pages/Users';

import { PersistGate } from 'redux-persist/integration/react';
import Transactions from './pages/Transactions';
import CreateTransaction from './pages/CreateTransaction';
import App from './App';

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
    path: '/transactions',
    element: <Transactions />
  },
  {
    path: '/createTransaction',
    element: <CreateTransaction />
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <div className='container'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <RootRouter /> */}
          <App />
        </PersistGate>
      </Provider>
    </div>
  </React.StrictMode>,
)
